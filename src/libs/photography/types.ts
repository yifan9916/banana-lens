import type { StaticImageData } from 'next/image';

import {
  SelectCameraMetadata,
  SelectCollection,
  SelectPhoto,
} from '@/server/db/schema';

// TODO image data still coming from app server clean up after images have been migrated
type PhotoData = {
  src: {
    preview: StaticImageData;
    hiRes: StaticImageData;
  };
};

// translation properties
type PhotoContent = {
  title: string;
  description?: string;
};

export type Photograph = PhotoData &
  Omit<SelectPhoto, 'id'> & {
    metadata?: Omit<SelectCameraMetadata, 'id'>;
  } & PhotoContent;

// TODO image data still coming from app server clean up after images have been migrated
export type CollectionData = {
  cover: StaticImageData;
} & Omit<SelectCollection, 'id'>;

export type Collection = CollectionData & { photos: Photograph[] };
