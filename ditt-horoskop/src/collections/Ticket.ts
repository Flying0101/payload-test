import type { CollectionConfig } from 'payload'

export const Ticket: CollectionConfig = {
  slug: 'Ticket',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'Main description',
      type: 'text',
    },
    {
      name: 'Estimate',
      type: 'text',
    },
    {
      name: 'State',
      type: 'text',
    },
    {
      name: 'Note',
      type: 'text',
    },
    {
      name: 'Done',
      type: 'checkbox',
      label: 'Click me to see fanciness',
      defaultValue: false,
    },
  ],
  upload: true,
}
