import { collectionPhotos } from '../data/photos';
import { Photograph, PhotoOutput } from '../types';

export const processPhoto = (photo: NonNullable<PhotoOutput>) => {
  const collection = photo.photosToCollections[0].collection.key;

  const processed: Photograph = {
    id: photo.id,
    collection,
    createdAt: photo.createdAt,
    key: photo.key,
    metadata: photo.cameraMetadata,
    src: collectionPhotos[collection][photo.key],
    updatedAt: photo.updatedAt,
    views: photo.views,
  };

  return processed;
};
