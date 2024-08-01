import { trpc } from '../trpc/server';
import { collectionPhotos } from './data/photos';
import { Photograph } from './types';

export const getPhoto = async (key: string) => {
  const data = await trpc.photos.getPhoto({ key });

  // TODO
  if (!data.photo) return;

  const collection = data.photo.photosToCollections[0].collection.key;

  const photo: Photograph = {
    collection,
    createdAt: data.photo.createdAt,
    key: data.photo.key,
    metadata: data.photo.cameraMetadata,
    src: collectionPhotos[collection][key],
    updatedAt: data.photo.updatedAt,
    views: data.photo.views,
  };

  return photo;
};