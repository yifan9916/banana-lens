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

export type Photograph = PhotoData &
  Omit<SelectPhoto, 'id'> & {
    collection?: string;
    metadata?: Omit<SelectCameraMetadata, 'id'>;
  };

// TODO image data still coming from app server clean up after images have been migrated
export type CollectionData = {
  cover: StaticImageData;
} & Omit<SelectCollection, 'id'>;

export type Collection = CollectionData & { photos: Photograph[] };
