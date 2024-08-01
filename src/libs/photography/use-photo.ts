import { trpc } from '../trpc/react';
import type { Photograph } from './types';
import { collectionPhotos } from './data/photos';

export const usePhoto = (key: string) => {
  const { data } = trpc.photos.getPhoto.useQuery({ key });

  // TODO
  if (!data?.photo) return;

  const collection = data.photo.photosToCollections[0].collection.key;

  const photo: Photograph = {
    createdAt: data.photo.createdAt,
    updatedAt: data.photo.updatedAt,
    src: collectionPhotos[collection][key],
    key: data.photo.key,
    metadata: data.photo.cameraMetadata,
    views: data.photo.views,
  };

  return photo;
};
