import { StaticImageData } from 'next/image';

export type Photograph = {
  id: string;
  src: {
    preview: StaticImageData;
    hiRes: StaticImageData;
  };
  date?: Date;
  camera?: 'a7iv' | 'iphone15';
  settings?: {
    focalLength: string;
    aperture: string;
    shutterSpeed: string;
    iso: string;
  };
};

export type CollectionKey = 'chongqing' | 'europe';

export type Collection = {
  id: CollectionKey;
  title: string;
  cover: Photograph;
  description?: string;
};

export type CollectionExtended = {
  id: CollectionKey;
  items: Photograph[];
};
