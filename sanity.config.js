import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';

export default defineConfig({
  name: 'deathofaheart',
  title: 'death of a heart',

  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  basePath: '/studio',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('death of a heart — Studio')
          .items([
            S.listItem()
              .title('🎵 Concerts Galleries')
              .child(
                S.documentList()
                  .title('Concerts — click a gallery to edit or add images')
                  .filter('_type == "gallery" && category == "concerts"')
                  .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
              ),
            S.listItem()
              .title('🖼️ Portrait Galleries')
              .child(
                S.documentList()
                  .title('Portraits — click a gallery to edit or add images')
                  .filter('_type == "gallery" && category == "portraits"')
                  .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
              ),
            S.divider(),
            S.listItem()
              .title('➕ Create New Gallery')
              .schemaType('gallery')
              .child(S.documentTypeList('gallery').title('All Galleries')),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
