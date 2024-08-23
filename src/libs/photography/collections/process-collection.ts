import { collectionCovers } from '../data/collections';
import { collectionPhotos } from '../data/photos';
import { CollectionWithPhotos, CollectionOutput } from '../types';

export const processCollection = (
  collection: NonNullable<CollectionOutput>
) => {
  const photos = collection.photosToCollections;

  const processed: CollectionWithPhotos = {
    id: collection.id,
    key: collection.key,
    cover: collectionCovers[collection.key],
    photos: photos.map((p) => {
      return {
        id: p.photoId,
        collection: collection.key,
        key: p.photo.key,
        src: collectionPhotos[collection.key][p.photo.key],
        status: p.photo.status,
        views: p.photo.views,
        createdAt: p.photo.createdAt,
        updatedAt: p.photo.updatedAt,
        metadata: p.photo.cameraMetadata,
      };
    }),
    createdAt: collection.createdAt,
    updatedAt: collection.updatedAt,
  };

  return processed;
};
