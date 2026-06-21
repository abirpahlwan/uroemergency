import type { CollectionConfig } from 'payload'

export const Emergencies: CollectionConfig = {
  slug: 'emergencies',
  orderable: true,
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'name',
    group: "App Content",
    defaultColumns: ['name', 'updatedAt'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Emergency Name',
      required: true,
    },
    {
      name: 'history',
      type: 'richText',
      label: 'History',
    },
    {
      name: 'examination',
      type: 'richText',
      label: 'Examination',
    },
    {
      name: 'investigation',
      type: 'richText',
      label: 'Investigation',
    },
    {
      name: 'management',
      type: 'richText',
      label: 'Management',
    },
  ],
}
