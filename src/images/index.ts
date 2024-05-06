import { StaticImageData } from 'next/image';

export { previewImages } from './preview/images';
export { hiResImages } from './hires/images';

export type TODO_Image = {
  src: StaticImageData;
  name: string;
};
