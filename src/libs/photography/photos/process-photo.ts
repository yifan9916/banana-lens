import { collectionPhotos } from '../data/photos';

import type { Photograph, PhotoOutput } from '../types';

export const processPhoto = (photo: NonNullable<PhotoOutput>): Photograph => {
  const collection = photo.photosToCollections.length
    ? {
        id: photo.photosToCollections[0].collectionId,
        key: photo.photosToCollections[0].collection.key,
      }
    : undefined;
  // TODO handle photos without collections later
  const collectionKey =
    photo.photosToCollections[0]?.collection.key || 'chongqing';

  const processed: Photograph = {
    id: photo.id,
    collection,
    createdAt: photo.createdAt,
    key: photo.key,
    metadata: photo.cameraMetadata,
    src: collectionPhotos[collectionKey][photo.key],
    // TODO
    media: processFiles(photo.files),
    updatedAt: photo.updatedAt,
    status: photo.status,
    views: photo.views,
  };

  return processed;
};

export const processFiles = (
  files: NonNullable<PhotoOutput>['files']
): Photograph['media'] => {
  const processedFiles = files.reduce((acc, file) => {
    const key: keyof Photograph['media'] =
      file.resolution === 'low' ? 'lowResolution' : 'highResolution';

    acc[key] = file;

    return acc;
  }, {} as Photograph['media']);

  return processedFiles;
};
