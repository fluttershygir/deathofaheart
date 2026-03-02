export const photographerProfileSchema = {
  name: 'photographerProfile',
  title: 'Photographer Profile',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Photographer ID',
      type: 'string',
      description: 'Internal identifier — must be exactly "shay" or "danica" (lowercase)',
      options: {
        list: [
          { title: 'Shay', value: 'shay' },
          { title: 'Danica', value: 'danica' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'displayName',
      title: 'Display Name',
      type: 'string',
      description: 'Full name shown on the site (e.g. "Shay", "Danica")',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'tagline',
      title: 'Tagline (under title)',
      type: 'string',
      description: 'Short descriptor shown under the main title on the home page (e.g. "Concert & Portrait Photography")',
    },
    {
      name: 'heroBio',
      title: 'Hero Bio (italic quote)',
      type: 'text',
      rows: 2,
      description: 'The italic quote shown on the home page hero (e.g. "Capturing the raw emotion of sound and silence.")',
    },
    {
      name: 'contactSubtext',
      title: 'Contact Section Subtext',
      type: 'text',
      rows: 3,
      description: 'The paragraph shown next to the contact form (e.g. "Whether it\'s the energy of a live show...")',
    },
    {
      name: 'basedIn',
      title: 'Based In',
      type: 'string',
      description: 'Location shown on the contact page (e.g. "Los Angeles, CA")',
    },
    {
      name: 'email',
      title: 'Contact Email',
      type: 'string',
      description: 'Email address shown and used for the contact form. This is where form submissions go.',
      validation: (Rule) => Rule.required().email(),
    },
    {
      name: 'instagramHandle',
      title: 'Instagram Handle',
      type: 'string',
      description: 'Instagram username WITHOUT the @ (e.g. "suchislifeisuppose" or "heymrkrabbs")',
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'displayName',
      subtitle: 'email',
    },
  },
};
