import { trpc } from '../../trpc/server';
import { collectionCovers } from '../data/collections';
import type { Collection } from '../types';

export const getCollections = async () => {
  const data = await trpc.collections.getCollections();

  const collections: Collection[] = data.collections.map((c) => ({
    ...c,
    cover: collectionCovers[c.key],
  }));

  return collections;
};
