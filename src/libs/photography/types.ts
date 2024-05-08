import { StaticImageData } from 'next/image';

export type TODO_Image = {
  id: string;
  src: {
    preview: StaticImageData;
    'hi-res': StaticImageData;
  };
  title?: string;
  description?: string;
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
  cover: TODO_Image;
  description?: string;
};

export type CollectionExtended = {
  id: CollectionKey;
  items: TODO_Image[];
};
