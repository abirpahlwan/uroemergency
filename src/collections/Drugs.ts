import type { CollectionConfig } from 'payload'

export const Drugs: CollectionConfig = {
  slug: 'drugs',
  admin: {
    useAsTitle: 'name',
    group: "App Content",
    defaultColumns: ['name', 'genericName', 'category', 'updatedAt'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Brand / Common Name',
      required: true,
    },
    {
      name: 'genericName',
      type: 'text',
      label: 'Generic Name',
    },
    {
      name: 'category',
      type: 'select',
      label: 'Category',
      options: [
        { label: 'Analgesic', value: 'analgesic' },
        { label: 'Antibiotic', value: 'antibiotic' },
        { label: 'Antispasmodic', value: 'antispasmodic' },
        { label: 'Diuretic', value: 'diuretic' },
        { label: 'Anaesthetic', value: 'anaesthetic' },
        { label: 'Anticoagulant', value: 'anticoagulant' },
        { label: 'Other', value: 'other' },
      ],
      required: true,
    },
    {
      name: 'dosage',
      type: 'richText',
      label: 'Dosage & Administration',
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
      name: 'sideEffects',
      type: 'richText',
      label: 'Side Effects',
    },
    {
      name: 'interactions',
      type: 'richText',
      label: 'Drug Interactions',
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Additional Notes',
    },
  ],
}
