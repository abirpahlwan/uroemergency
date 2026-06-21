import type { CollectionConfig } from 'payload'

export const Indications: CollectionConfig = {
  slug: 'indications',
  orderable: true,
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'indication',
    group: "App Content",
    defaultColumns: ['indication', 'name', 'updatedAt'],
  },
  fields: [
    {
      name: 'indication',
      type: 'text',
      label: 'Indication',
      required: true,
    },
    {
      name: 'drugs',
      type: 'array',
      label: 'Primary Drugs',
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Drug Name',
          required: true,
        },
        {
          name: 'instruction',
          type: 'richText',
          label: 'Instruction (Dosage & Administration)',
        },
        {
          name: 'sideEffects',
          type: 'richText',
          label: 'Side Effects',
        },
      ],
    },
    {
      name: 'alternativeDrugs',
      type: 'array',
      label: 'Alternative Drugs',
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Drug Name',
          required: true,
        },
        {
          name: 'instruction',
          type: 'richText',
          label: 'Instruction (Dosage & Administration)',
        },
        {
          name: 'sideEffects',
          type: 'richText',
          label: 'Side Effects',
        },
      ],
    },
    {
      name: 'references',
      type: 'array',
      label: 'References',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          required: true,
        },
        {
          name: 'link',
          type: 'text',
          label: 'Link',
          required: true,
        },
      ],
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Notes',
    },
  ],
}
