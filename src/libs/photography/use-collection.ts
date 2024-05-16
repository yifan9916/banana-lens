import type { CollectionKey } from './types';
import { collectionItems } from './data/collections';

export const useCollection = (key: CollectionKey) => {
  return collectionItems[key];
};
