import { getTranslations } from 'next-intl/server';
import { trpc } from '../trpc/server';
import { collectionPhotos } from './data/photos';
import { Photograph } from './types';

export const getPhoto = async (key: string) => {
  const data = await trpc.photos.getPhoto({ key });

  // TODO
  if (!data.photo) return;

  const collection = data.photo.photosToCollections[0].collection.key;
  const dict = await getTranslations(
    `Photography.Collection.${collection}.Item`
  );

  const photo: Photograph = {
    createdAt: data.photo.createdAt,
    updatedAt: data.photo.updatedAt,
    src: collectionPhotos[collection][key],
    title: dict(`${key}.title`),
    description: dict(`${key}.description`),
    key: data.photo.key,
    metadata: data.photo.cameraMetadata,
    views: data.photo.views,
  };

  return photo;
};
