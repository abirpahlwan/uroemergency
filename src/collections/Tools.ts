import type { CollectionConfig } from 'payload'

export const Tools: CollectionConfig = {
  slug: 'tools',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'updatedAt'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Tool Name',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      label: 'Category',
      options: [
        { label: 'Diagnostic', value: 'diagnostic' },
        { label: 'Surgical', value: 'surgical' },
        { label: 'Monitoring', value: 'monitoring' },
        { label: 'Catheterisation', value: 'catheterisation' },
        { label: 'Endoscopy', value: 'endoscopy' },
        { label: 'Other', value: 'other' },
      ],
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Description',
    },
    {
      name: 'usageNotes',
      type: 'richText',
      label: 'Usage Notes',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Image',
    },
    {
      name: 'manufacturer',
      type: 'text',
      label: 'Manufacturer',
    },
    {
      name: 'catalogueNumber',
      type: 'text',
      label: 'Catalogue Number',
    },
    {
      name: 'isDisposable',
      type: 'checkbox',
      label: 'Disposable',
      defaultValue: false,
    },
  ],
}
