import { trpc } from '../../trpc/react';
import { processPhoto } from './process-photo';

export const usePhotos = () => {
  const { data, error } = trpc.photos.getPhotos.useQuery();

  // TODO
  if (!data?.photos) return;

  const photos = data.photos.map((p) => {
    return processPhoto(p);
  });

  return photos;
};
