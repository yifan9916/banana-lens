import { createTRPCRouter } from './trpc';
import { photosRouter } from './routers/photos';
import { collectionsRouter } from './routers/collections';

export const appRouter = createTRPCRouter({
  photos: photosRouter,
  collections: collectionsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
