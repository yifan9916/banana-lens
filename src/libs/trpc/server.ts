import 'server-only';

import { cache } from 'react';
import { headers } from 'next/headers';
import { createHydrationHelpers } from '@trpc/react-query/rsc';

import { appRouter, type AppRouter } from '@/server/trpc';
import { createCallerFactory, createTRPCContext } from '@/server/trpc/trpc';
import { createQueryClient } from './query-client';

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createContext = cache(() => {
  const heads = new Headers(headers());
  heads.set('x-trpc-source', 'rsc');

  return createTRPCContext({
    headers: heads,
  });
});

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
const createServerCaller = createCallerFactory(appRouter);

const getQueryClient = cache(createQueryClient);
const serverCaller = createServerCaller(createContext);

export const { trpc, HydrateClient } = createHydrationHelpers<AppRouter>(
  serverCaller,
  getQueryClient
);
