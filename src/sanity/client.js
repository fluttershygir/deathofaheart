import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
const isConfigured = projectId && projectId !== 'your_project_id_here';

export const client = isConfigured
  ? createClient({
      projectId,
      dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
      useCdn: false, // Disable CDN to bypass potential CORS caching issues
      apiVersion: '2024-01-01',
    })
  : null;

const builder = isConfigured ? imageUrlBuilder(client) : null;

export const urlFor = (source) =>
  builder ? builder.image(source) : { url: () => '' };
