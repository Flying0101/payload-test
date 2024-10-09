import type { CollectionConfig } from 'payload'

export const Admins: CollectionConfig = {
  slug: 'admins',
  auth: {
    tokenExpiration: 7200,
  },
  admin: {
    useAsTitle: 'email',
  },
  fields: [],
}
