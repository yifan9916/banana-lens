import { trpc } from '@/libs/trpc/react';

import { DeleteButton } from '../components/delete-button';

import type { Photograph } from '@/libs/photography/types';

type Props = {
  photo: Photograph;
};

export const DeletePhoto = (props: Props) => {
  const { photo } = props;

  const utils = trpc.useUtils();

  const deletePhoto = trpc.photos.deletePhoto.useMutation({
    onSuccess: () => {},
  });

  const deleteMetadata = trpc.metadata.deleteMetadata.useMutation();

  const deletePhotosToCollections =
    trpc.photosToCollections.deletePhotoFromCollection.useMutation();

  const handleDelete = async () => {
    if (photo.collection) {
      await deletePhotosToCollections.mutateAsync({
        photoId: photo.id,
        collectionId: photo.collection.id,
      });
    }

    await deleteMetadata.mutateAsync({ id: photo.metadata.id });

    deletePhoto.mutate({ id: photo.id });

    utils.photos.getPhotos.invalidate();
  };

  return <DeleteButton onDelete={() => handleDelete()} />;
};
