export const gallerySchema = {
  name: 'gallery',
  title: 'Gallery',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Gallery Title',
      type: 'string',
      description: 'The name of this gallery — shown on the website (e.g. "Glaive at Terminal 5", "Emma — Editorial 2026")',
      validation: (Rule) => Rule.required().error('A title is required'),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'Is this a concert shoot or a portrait/editorial shoot?',
      options: {
        list: [
          { title: '🎵 Concerts', value: 'concerts' },
          { title: '🖼️ Portraits', value: 'portraits' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required().error('Choose a category'),
    },
    {
      name: 'slug',
      title: 'URL Slug (auto-generated)',
      type: 'slug',
      description: 'Click "Generate" to auto-fill from the title. This creates the web address for this gallery.',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required().error('Click Generate to create the URL'),
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      description: 'The thumbnail shown on the grid page. If left blank, the first photo below will be used.',
      options: { hotspot: true },
    },
    {
      name: 'images',
      title: 'Portfolio Images',
      type: 'array',
      description: '📸 Add all photos for this gallery here. They appear when someone clicks this gallery on the website.',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'caption',
              title: 'Caption (optional)',
              type: 'string',
              description: 'Short label shown under the photo',
            },
          ],
        },
      ],
    },
    {
      name: 'date',
      title: 'Date (optional)',
      type: 'date',
      description: 'When was this shoot?',
    },
    {
      name: 'description',
      title: 'Description (optional)',
      type: 'text',
      rows: 3,
      description: 'A short note about this gallery — shown beneath the title on the gallery page.',
    },
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      media: 'coverImage',
    },
    prepare({ title, category, media }) {
      return {
        title,
        subtitle: category ? category.charAt(0).toUpperCase() + category.slice(1) : '',
        media,
      };
    },
  },
};
