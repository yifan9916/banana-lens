import type { FileResolution, Photograph, PhotoOutput } from '../types';

const resolutionMap: Record<FileResolution, keyof Photograph['media']> = {
  thumbnail: 'thumbnail',
  low: 'lowResolution',
  high: 'highResolution',
};

export const processPhoto = (photo: NonNullable<PhotoOutput>): Photograph => {
  // TODO handle photos without collections later
  const collection = photo.photosToCollections.length
    ? {
        id: photo.photosToCollections[0].collectionId,
        key: photo.photosToCollections[0].collection.key,
      }
    : undefined;

  const processed: Photograph = {
    id: photo.id,
    collection,
    createdAt: photo.createdAt,
    key: photo.key,
    metadata: photo.cameraMetadata,
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
    const key: keyof Photograph['media'] = resolutionMap[file.resolution];

    acc[key] = file;

    return acc;
  }, {} as Photograph['media']);

  return processedFiles;
};
