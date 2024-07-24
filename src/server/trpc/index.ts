import { createTRPCRouter } from './trpc';
import { photosRouter } from './routers/photos';

export const appRouter = createTRPCRouter({
  photos: photosRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
