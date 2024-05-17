import type { Collection, CollectionPhotos, CollectionKey } from '../types';
import { data as chongQingData } from './chongqing';
import { data as europeData } from './europe';
import { Rome01 } from './europe/preview/images';
import { Chongqing01 } from './chongqing/preview/images';

const chongQingCollection: Collection = {
  id: 'chongqing',
  name: 'chongqing',
  cover: Chongqing01,
};

const europeCollection: Collection = {
  id: 'europe',
  name: 'europe',
  cover: Rome01,
};

export const collections: Collection[] = [
  chongQingCollection,
  europeCollection,
];

export const collectionItems: Record<CollectionKey, CollectionPhotos> = {
  chongqing: { ...chongQingCollection, items: chongQingData },
  europe: { ...europeCollection, items: europeData },
};
