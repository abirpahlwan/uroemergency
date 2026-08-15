import type { CollectionConfig } from 'payload'

export const Feedback: CollectionConfig = {
  slug: 'feedback',
  access: {
    // Submitted from the mobile app without a session.
    create: () => true,
    // Everything else stays admin-only (default requires authentication).
  },
  admin: {
    useAsTitle: 'name',
    group: 'Others',
    defaultColumns: ['name', 'email', 'phone', 'consentToContact', 'updatedAt'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Name',
      required: true,
    },
    {
      name: 'message',
      type: 'textarea',
      label: 'Message',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      admin: {
        description: 'Optional — only used with consent',
      },
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Phone Number',
      admin: {
        description: 'Optional — only used with consent',
      },
    },
    {
      name: 'consentToContact',
      type: 'checkbox',
      label: 'Consent to Contact',
      defaultValue: false,
      validate: (value, { data }) => {
        const { email, phone } = (data ?? {}) as { email?: string | null; phone?: string | null }
        if ((email || phone) && !value) {
          return 'Consent is required when an email or phone number is provided'
        }
        return true
      },
      admin: {
        description: 'Must be ticked when contact details are supplied',
      },
    },
  ],
}
