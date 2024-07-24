'use client';

import { useState } from 'react';

import { type QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  createTRPCReact,
  loggerLink,
  unstable_httpBatchStreamLink,
} from '@trpc/react-query';
import superjson from 'superjson';

import { type AppRouter } from '@/server/trpc';
import { createQueryClient } from './query-client';

let clientQueryClientSingleton: QueryClient | undefined = undefined;

const getBaseUrl = () => {
  if (typeof window !== 'undefined') return window.location.origin;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
};

const getQueryClient = () => {
  if (typeof window === 'undefined') {
    // Server: always make a new query client
    return createQueryClient();
  }
  // Browser: use singleton pattern to keep the same query client
  return (clientQueryClientSingleton ??= createQueryClient());
};

export const trpc = createTRPCReact<AppRouter>({});

export const TRPCReactProvider = (props: { children: React.ReactNode }) => {
  const { children } = props;

  const [queryClient] = useState(() => getQueryClient());
  const [trpcClient] = useState(() => {
    return trpc.createClient({
      links: [
        loggerLink({
          enabled: (op) =>
            process.env.NODE_ENV === 'development' ||
            (op.direction === 'down' && op.result instanceof Error),
        }),
        unstable_httpBatchStreamLink({
          transformer: superjson,
          url: getBaseUrl() + '/api/trpc',
          headers: () => {
            const headers = new Headers();
            headers.set('x-trpc-source', 'nextjs-react');
            return headers;
          },
        }),
      ],
    });
  });

  return (
    <QueryClientProvider client={queryClient}>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        {children}
      </trpc.Provider>
    </QueryClientProvider>
  );
};
