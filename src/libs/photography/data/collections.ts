import { StaticImageData } from 'next/image';

import { default as Rome01 } from '@/public/photography/europe/preview/rome-01.webp';
import { default as Chongqing01 } from '@/public/photography/chongqing/preview/chongqing-01.webp';

// TODO clean up after images are fully migrated
export const collectionCovers: Record<string, StaticImageData> = {
  chongqing: Chongqing01,
  europe: Rome01,
};
