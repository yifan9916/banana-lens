import { collectionCovers } from '../data/collections';
import { collectionPhotos } from '../data/photos';
import { processFiles } from '../photos/process-photo';

import type { CollectionWithPhotos, CollectionOutput } from '../types';

export const processCollection = (
  collection: NonNullable<CollectionOutput>
) => {
  const photos = collection.photosToCollections;

  const processed: CollectionWithPhotos = {
    id: collection.id,
    key: collection.key,
    status: collection.status,
    cover: collectionCovers[collection.key],
    photos: photos.map((p) => {
      return {
        id: p.photoId,
        collection: {
          id: collection.id,
          key: collection.key,
        },
        key: p.photo.key,
        src: collectionPhotos[collection.key][p.photo.key],
        status: p.photo.status,
        views: p.photo.views,
        createdAt: p.photo.createdAt,
        updatedAt: p.photo.updatedAt,
        metadata: p.photo.cameraMetadata,
        media: processFiles(p.photo.files),
      };
    }),
    createdAt: collection.createdAt,
    updatedAt: collection.updatedAt,
  };

  return processed;
};
