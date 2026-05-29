import type { CollectionConfig } from 'payload'

export const Emergencies: CollectionConfig = {
  slug: 'emergencies',
  admin: {
    useAsTitle: 'name',
    group: "App Content",
    defaultColumns: ['name', 'category', 'difficulty', 'updatedAt'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Emergency Name',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      label: 'Category',
      options: [
        { label: 'Diagnostic', value: 'diagnostic' },
        { label: 'Therapeutic', value: 'therapeutic' },
        { label: 'Surgical', value: 'surgical' },
        { label: 'Emergency', value: 'emergency' },
      ],
      required: true,
    },
    {
      name: 'difficulty',
      type: 'select',
      label: 'Difficulty Level',
      options: [
        { label: 'Basic', value: 'basic' },
        { label: 'Intermediate', value: 'intermediate' },
        { label: 'Advanced', value: 'advanced' },
      ],
    },
    {
      name: 'duration',
      type: 'text',
      label: 'Estimated Duration',
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Description',
    },
    {
      name: 'indications',
      type: 'richText',
      label: 'Indications',
    },
    {
      name: 'contraindications',
      type: 'richText',
      label: 'Contraindications',
    },
    {
      name: 'steps',
      type: 'richText',
      label: 'Step-by-Step Instructions',
    },
    {
      name: 'tools',
      type: 'relationship',
      relationTo: 'tools',
      hasMany: true,
      label: 'Required Tools',
    },
    {
      name: 'drugs',
      type: 'relationship',
      relationTo: 'drugs',
      hasMany: true,
      label: 'Associated Drugs',
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      label: 'Image / Diagram',
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
  ],
}
