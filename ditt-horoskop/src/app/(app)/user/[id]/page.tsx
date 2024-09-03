import { buttonVariants } from '@/components/ui/button'
import { getPayload } from '@/lib/payload'
import Link from 'next/link'
import { Fragment } from 'react'

export async function generateStaticParams() {
  const payload = await getPayload()
  const users = await payload.find({ collection: 'users' })

  return users.docs.map((user) => ({ id: String(user.id) }))
}

export default async function Page({ params }: { params: { id: string } }) {
  const payload = await getPayload()
  const { sign } = await payload.findByID({ id: params.id, collection: 'users' })

  if (!sign) {
    return (
      <Link href="/settings" className={buttonVariants({ variant: 'outline' })}>
        Start jour yourney
      </Link>
    )
  }

  return <Fragment>{sign.Title}</Fragment>
}
