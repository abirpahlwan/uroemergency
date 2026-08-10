import type { GlobalConfig } from 'payload'

export const SiteConfig: GlobalConfig = {
  slug: 'site-config',
  label: 'Site Configuration',
  access: {
    read: () => true,
  },
  admin: {
    description: 'Global site settings and key values',
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      label: 'Site Name',
      required: true,
      defaultValue: 'URO Emergency',
    },
    {
      name: 'tagline',
      type: 'text',
      label: 'Tagline',
    },
    {
      name: 'emergenciesCount',
      type: 'number',
      label: 'Emergencies On Home Screen',
      admin: {
        description:
          'How many emergencies to show on the app home screen. The rest move to the Misc screen.',
      },
      defaultValue: 4,
      min: 1,
    },
    {
      name: 'contactEmail',
      type: 'email',
      label: 'Contact Email',
    },
    {
      name: 'contactPhone',
      type: 'text',
      label: 'Contact Phone',
    },
    {
      name: 'address',
      type: 'textarea',
      label: 'Address',
    },
    {
      name: 'emergencyNumber',
      type: 'text',
      label: 'Emergency Number',
    },
    {
      name: 'logoUrl',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo',
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Social Links',
      fields: [
        {
          name: 'platform',
          type: 'select',
          options: ['Facebook', 'Twitter', 'LinkedIn', 'Instagram', 'YouTube'],
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          label: 'URL',
          required: true,
        },
      ],
    },
  ],
}
