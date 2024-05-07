import { StaticImageData } from 'next/image';

export { previewImages } from './preview/images';
export { hiResImages } from './hi-res/images';

export type TODO_Image = {
  src: StaticImageData;
  name: string;
};
