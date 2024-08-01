import { StaticImageData } from 'next/image';
import { chongqingPhotos } from './chongqing';
import { europePhotos } from './europe';

export const collectionPhotos: Record<
  string,
  Record<string, { preview: StaticImageData; hiRes: StaticImageData }>
> = {
  chongqing: chongqingPhotos,
  europe: europePhotos,
};
