import { createCallerFactory, createTRPCRouter } from './trpc';
import { photosRouter } from './routers/photos';

export const appRouter = createTRPCRouter({
  photos: photosRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createServerCaller = createCallerFactory(appRouter);
