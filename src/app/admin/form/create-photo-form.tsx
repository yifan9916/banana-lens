'use client';

import { trpc } from '@/libs/trpc/react';
import { useFormContext } from './form-context';
import { CollectionFields } from './steps/collection';
import { PhotoFields } from './steps/photo';
import { MetadataFields } from './steps/metadata';
import { Summary } from './steps/summary';
import { useMultiStepContext } from '../multi-step-context';

export const CreatePhotoForm = () => {
  const { data, saveData } = useFormContext();
  const { step } = useMultiStepContext();

  const createCollection = trpc.collections.createCollection.useMutation({
    onSuccess: (newData) => {
      saveData({
        type: 'save_collection',
        payload: { collection: newData.collection },
      });
    },
  });

  const createPhoto = trpc.photos.createPhoto.useMutation({
    onSuccess: (newData) => {
      createMetadata.mutate({
        photoId: newData.photo.id,
        camera: data.metadata.camera,
        aperture: data.metadata.aperture.replace('.', ','),
        focalLength: `${data.metadata.focalLength}mm`,
        iso: data.metadata.iso,
        shutterSpeed: data.metadata.shutterSpeed,
      });

      if (data.collection?.id) {
        addPhotoToCollection.mutate({
          photoId: newData.photo.id,
          collectionId: data.collection.id,
        });
      }
    },
  });

  const addPhotoToCollection =
    trpc.photosToCollections.addPhotoToCollection.useMutation({});

  const createMetadata = trpc.metadata.createMetadata.useMutation({});

  const handleSubmit: React.ComponentProps<'form'>['onSubmit'] = async (e) => {
    e.preventDefault();

    // collection id won't be available if an existing collection was not selected
    if (data.collection && !data.collection?.id && data.collection.key) {
      await createCollection.mutateAsync({
        key: data.collection.key,
      });
    }

    createPhoto.mutate({ key: data.photo.key });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border flex justify-center flex-col p-10 rounded-xl shadow-2xl"
    >
      {step === 'collection' && <CollectionFields />}
      {step === 'photo' && <PhotoFields />}
      {step === 'metadata' && <MetadataFields />}
      {step === 'summary' && <Summary />}
    </form>
  );
};
