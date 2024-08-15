import { trpc } from '../../trpc/react';
import { processPhoto } from './process-photo';

export const usePhoto = (key: string) => {
  const { data, error } = trpc.photos.getPhoto.useQuery({ key });

  // TODO
  if (!data?.photo) return;

  const photo = processPhoto(data.photo);

  return photo;
};
