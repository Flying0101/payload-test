import type { CollectionConfig } from 'payload'

export const Sign: CollectionConfig = {
  slug: 'signs',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'Title',
  },
  fields: [
    {
      name: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'Description',
      type: 'text',
      required: true,
    },
    {
      name: 'Small Icon',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'Image',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
