import type { CollectionConfig } from 'payload'

export const Guidances: CollectionConfig = {
  slug: 'guidances',
  admin: {
    useAsTitle: 'name',
    group: 'App Content',
    defaultColumns: ['name', 'updatedAt'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Name',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Description',
    },
    {
      name: 'references',
      type: 'array',
      label: 'References',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
        },
      ],
    },
    {
      name: 'images',
      type: 'array',
      label: 'Images',
      maxRows: 10,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}
