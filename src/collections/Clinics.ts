import type { CollectionConfig } from 'payload'

export const Clinics: CollectionConfig = {
  slug: 'clinics',
  admin: {
    useAsTitle: 'name',
    group: "App Content",
    defaultColumns: ['name', 'type', 'city', 'updatedAt'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Clinic Name',
      required: true,
    },
    {
      name: 'type',
      type: 'select',
      label: 'Clinic Type',
      options: [
        { label: 'Emergency', value: 'emergency' },
        { label: 'Outpatient', value: 'outpatient' },
        { label: 'Inpatient', value: 'inpatient' },
        { label: 'Diagnostic Centre', value: 'diagnostic' },
        { label: 'Private', value: 'private' },
      ],
      required: true,
    },
    {
      name: 'address',
      type: 'group',
      label: 'Address',
      fields: [
        { name: 'street', type: 'text', label: 'Street' },
        { name: 'city', type: 'text', label: 'City', required: true },
        { name: 'postcode', type: 'text', label: 'Postcode' },
        { name: 'country', type: 'text', label: 'Country', defaultValue: 'UK' },
      ],
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Phone Number',
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
    },
    {
      name: 'website',
      type: 'text',
      label: 'Website URL',
    },
    {
      name: 'openingHours',
      type: 'array',
      label: 'Opening Hours',
      fields: [
        {
          name: 'day',
          type: 'select',
          options: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          required: true,
        },
        {
          name: 'opens',
          type: 'text',
          label: 'Opens (e.g. 08:00)',
        },
        {
          name: 'closes',
          type: 'text',
          label: 'Closes (e.g. 18:00)',
        },
        {
          name: 'closed',
          type: 'checkbox',
          label: 'Closed',
          defaultValue: false,
        },
      ],
    },
    {
      name: 'is24Hours',
      type: 'checkbox',
      label: '24-Hour Service',
      defaultValue: false,
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Description',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Image',
    },
  ],
}
