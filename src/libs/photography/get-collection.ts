import { getTranslations } from 'next-intl/server';

import { trpc } from '../trpc/server';
import { collectionCovers } from './data/collections';
import { collectionPhotos } from './data/photos';
import type { Collection } from './types';

export const getCollection = async (key: string) => {
  const data = await trpc.collections.getCollection({ key: key });

  // TODO
  if (!data.collection) return;

  const dict = await getTranslations(`Photography.Collection.${key}.Item`);
  const photos = data.collection.photosToCollections;

  const collection: Collection = {
    key,
    cover: collectionCovers[key],
    photos: photos.map((p) => {
      return {
        key: p.photo.key,
        src: collectionPhotos[key][p.photo.key],
        title: dict(`${p.photo.key}.title`),
        views: p.photo.views,
        createdAt: p.photo.createdAt,
        updatedAt: p.photo.updatedAt,
      };
    }),
    createdAt: data.collection.createdAt,
    updatedAt: data.collection.updatedAt,
  };

  return collection;
};
