import { trpc } from '@/libs/trpc/react';
import { collectionCovers } from '../data/collections';
import type { Collection } from '../types';

export const useCollections = () => {
  const { data } = trpc.collections.getCollections.useQuery();

  if (!data?.collections) return;

  const collections: Collection[] = data.collections.map((c) => ({
    ...c,
    cover: collectionCovers[c.key],
  }));

  return collections;
};
