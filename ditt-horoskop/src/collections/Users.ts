import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  access: {
    create: () => true,
  },
  fields: [
    { name: 'name', type: 'text' },
    { name: 'description', type: 'text' },
    { name: 'sign', type: 'relationship', relationTo: 'signs' },
    { name: 'daily', type: 'relationship', relationTo: 'horoscopes' },
  ],
}
