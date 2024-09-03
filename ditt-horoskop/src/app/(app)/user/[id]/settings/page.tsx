import { SettingsForm } from '@/components/ui/settings-form'
import { Settings } from '@/components/ui/settings/settings'
import { getMe } from '@/lib/getMe'
import { getPayload } from '@/lib/payload'
import { Fragment } from 'react'

export default async function Page({ params: { id } }: { params: { id: string } }) {
  const payload = await getPayload()
  const { docs: signsData } = await payload.find({ collection: 'signs', limit: 20 })

  const signs = signsData.map(({ id, Title, Description, 'Small Icon': SmallIcon }) => ({
    id,
    Title,
    Description,
    'Small Icon': SmallIcon,
  }))

  return (
    <Fragment>
      <Settings signs={signs} />
    </Fragment>
  )
}
