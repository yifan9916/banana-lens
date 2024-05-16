import { data as chongQingData } from './chongqing';
import { data as europeData } from './europe';
import type { Collection, CollectionPhotos, CollectionKey } from '../types';

const chongQingCollection: Collection = {
  id: 'chongqing',
  name: 'chongqing',
  cover: chongQingData[0],
};

const europeCollection: Collection = {
  id: 'europe',
  name: 'europe',
  cover: europeData[0],
};

export const collections: Collection[] = [
  chongQingCollection,
  europeCollection,
];

export const collectionItems: Record<CollectionKey, CollectionPhotos> = {
  chongqing: { ...chongQingCollection, items: chongQingData },
  europe: { ...europeCollection, items: europeData },
};
