import { StaticImageData } from 'next/image';

import { Rome01 } from './europe/preview/images';
import { Chongqing01 } from './chongqing/preview/images';

export const collectionCovers: Record<string, StaticImageData> = {
  chongqing: Chongqing01,
  europe: Rome01,
};
