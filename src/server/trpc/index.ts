import { inferRouterInputs, inferRouterOutputs } from '@trpc/server';

import { createTRPCRouter } from './trpc';
import { photosRouter } from './routers/photos';
import { collectionsRouter } from './routers/collections';
import { metadataRouter } from './routers/metadata';
import { photosToCollections } from './routers/photos-to-collections';
import { filesRouter } from './routers/files';

export const appRouter = createTRPCRouter({
  collections: collectionsRouter,
  photos: photosRouter,
  metadata: metadataRouter,
  photosToCollections: photosToCollections,
  files: filesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;
