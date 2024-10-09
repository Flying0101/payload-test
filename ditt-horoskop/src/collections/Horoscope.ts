import { lexicalEditor } from '@payloadcms/richtext-lexical'
import type { CollectionConfig } from 'payload'

export const Horoscope: CollectionConfig = {
  slug: 'horoscopes',
  access: {
    // create: () => false, // No one can create new horoscopes
    // read: () => false, // Everyone can read horoscopes
    // update: () => false, // No one can update horoscopes
    // delete: () => false, // No one can delete horoscopes
    // admin: ({ req: { user } }) => {
    //   return Boolean(user?.role === 'admin');
    // },
  },
  fields: [
    { name: 'user', type: 'relationship', relationTo: 'users' },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      type: 'text',
      // type: 'richText',
      // editor: lexicalEditor(),
    },
    {
      name: 'date',
      type: 'date',
      required: true,
    },
  ],
}
