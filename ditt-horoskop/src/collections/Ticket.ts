import TicketsView from '@/components/admin/TicketsView'
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
      name: 'Done',
      type: 'checkbox',
      label: 'Done',
      defaultValue: false,
      admin: { components: { Cell: 'src/components/admin/DoneCell' } },
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
  ],
}
