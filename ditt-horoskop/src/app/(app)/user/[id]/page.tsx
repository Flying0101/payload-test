import { getPayload } from '@/lib/payload'
import { Fragment } from 'react'

export async function generateStaticParams() {
  const payload = await getPayload()
  const users = await payload.find({ collection: 'users' })

  return users.docs.map((user) => ({ id: String(user.id) }))
}

export default function Page({ params }: { params: { id: string } }) {
  return <Fragment>{JSON.stringify(params)}</Fragment>
}
