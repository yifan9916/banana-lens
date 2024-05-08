import type { Collection } from './types';

import { data as chongQingData } from './data/chongqing';
import { data as europeData } from './data/europe';

const collections: Collection[] = [
  {
    id: 'chongqing',
    title: 'ChongQing',
    cover: chongQingData[0],
  },
  {
    id: 'europe',
    title: 'Europe',
    cover: europeData[0],
  },
];

export const useCollections = () => {
  return collections;
};
