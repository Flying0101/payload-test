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
      required: true,
    },
    {
      name: 'Estimate',
      type: 'text',
      required: true,
    },
    {
      name: 'State',
      type: 'text',
      required: true,
    },
    {
      name: 'Note',
      type: 'text',
      required: true,
    },
    {
      name: 'Done',
      type: 'checkbox',
      label: 'Click me to see fanciness',
      defaultValue: false,
      required: true,
    },
  ],
  upload: true,
}
