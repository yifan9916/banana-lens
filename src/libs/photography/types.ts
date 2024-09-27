import type { StaticImageData } from 'next/image';

import type {
  SelectCameraMetadata,
  SelectCollection,
  SelectFiles,
  SelectPhoto,
} from '@/server/db/schema';
import type { RouterOutputs } from '@/server/trpc';

type PhotoImageSrc = {
  media: {
    lowResolution?: Omit<SelectFiles, 'resolution'>;
    highResolution?: Omit<SelectFiles, 'resolution'>;
  };
};

export type Photograph = PhotoImageSrc &
  SelectPhoto & {
    collection?: Pick<SelectCollection, 'id' | 'key'>;
    metadata: SelectCameraMetadata;
  };

export type PhotoOutput = RouterOutputs['photos']['getPhoto']['photo'];

// TODO image data still coming from app server clean up after images have been migrated
type CollectionCover = {
  cover: StaticImageData;
};

export type Collection = CollectionCover & SelectCollection;

export type CollectionWithPhotos = Collection & {
  photos: Photograph[];
};

export type CollectionOutput =
  RouterOutputs['collections']['getCollection']['collection'];

export type CollectionsOutput =
  RouterOutputs['collections']['getCollections']['collections'];
