import { createTRPCRouter } from './trpc';
import { photosRouter } from './routers/photos';
import { collectionsRouter } from './routers/collections';
import { inferRouterInputs, inferRouterOutputs } from '@trpc/server';

export const appRouter = createTRPCRouter({
  photos: photosRouter,
  collections: collectionsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;
