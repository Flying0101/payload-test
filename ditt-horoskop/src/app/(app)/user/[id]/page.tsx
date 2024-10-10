import { buttonVariants } from '@/components/ui/button'
import { getPayload } from '@/lib/payload'
import Link from 'next/link'
import { generateHoroscope } from '@/lib/chatGPT'
import { evaluate } from '@mdx-js/mdx'
import * as runtime from 'react/jsx-runtime'

export const revalidate = 86400 // revalidate once a day

export async function generateStaticParams() {
  const payload = await getPayload()
  const users = await payload.find({ collection: 'users' })
  return users.docs.map((user) => ({ id: String(user.id) }))
}

export default async function Page({ params }: { params: { id: string } }) {
  const payload = await getPayload()
  const user = await payload.findByID({
    collection: 'users',
    id: params.id,
  })

  if (!user || !user.sign || typeof user.sign === 'number') {
    return (
      <Link href="/profile" className={buttonVariants({ variant: 'outline' })}>
        Start your journey
      </Link>
    )
  }

  const currentDate = new Date().toISOString().split('T')[0]

  const horoscope = await generateHoroscope(currentDate, user.sign.Title, user.description || '')

  if (!horoscope) {
    return <div>Something failed. Try again in a minute</div>
  }

  const {
    default: MDXContent,
    MDXDefinedComponent,
    ...rest
  } = await evaluate(horoscope.content, runtime as any)

  return (
    <div className="w-full">
      <article className="prose text-foreground lg:prose-xl prose-headings:mt-4 lg:prose-headings:mt-8 prose-headings:font-semibold prose-headings:text-foreground prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg">
        <MDXContent />
      </article>
    </div>
  )
}
