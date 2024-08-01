import { trpc } from '../trpc/server';
import { collectionCovers } from './data/collections';
import type { CollectionData } from './types';

export const getCollections = async () => {
  const data = await trpc.collections.getCollections();

  const collections: CollectionData[] = data.collections.map((c) => ({
    key: c.key,
    cover: collectionCovers[c.key],
    createdAt: c.createdAt,
    updatedAt: c.updatedAt,
  }));

  return collections;
};
