import type { CollectionExtended, CollectionKey } from './types';

import { data as chongQingData } from './data/chongqing';
import { data as europeData } from './data/europe';

const collectionItems: Record<CollectionKey, CollectionExtended> = {
  chongqing: { id: 'chongqing', items: chongQingData },
  europe: { id: 'europe', items: europeData },
};

export const useCollection = (key: CollectionKey) => {
  return collectionItems[key];
};
