import { cache } from 'react';
import { headers } from 'next/headers';
import { createHydrationHelpers } from '@trpc/react-query/rsc';

import { type AppRouter, createServerCaller } from '@/server/trpc';
import { createTRPCContext } from '@/server/trpc/trpc';
import { createQueryClient } from './query-client';

const createContext = cache(() => {
  const heads = new Headers(headers());
  heads.set('x-trpc-source', 'rsc');

  return createTRPCContext({
    headers: heads,
  });
});

const getQueryClient = cache(createQueryClient);
const caller = createServerCaller(createContext);

export const { trpc, HydrateClient } = createHydrationHelpers<AppRouter>(
  caller,
  getQueryClient
);
