'use client';

import { trpc } from '@/libs/trpc/react';
import { sanitizeMetadata } from '@/libs/photography/metadata/metadata';
import { Cross } from '@/components/icons';
import { useFormContext } from './form-context';
import { useMultiStepContext } from './multi-step-context';
import { CollectionFields } from './steps/collection';
import { PhotoFields } from './steps/photo';
import { MetadataFields } from './steps/metadata';
import { Summary } from './steps/summary';

type Props = {
  onCancel: () => void;
};

export const CreatePhotoForm = (props: Props) => {
  const { onCancel } = props;
  const { data, saveData } = useFormContext();
  const { step } = useMultiStepContext();

  const handleCancel = () => {
    onCancel();
  };

  const utils = trpc.useUtils();

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
        ...sanitizeMetadata(data.metadata),
      });

      if (data.collection?.id) {
        addPhotoToCollection.mutate({
          photoId: newData.photo.id,
          collectionId: data.collection.id,
        });
      }

      utils.photos.getPhotos.invalidate();
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

    createPhoto.mutateAsync({ key: data.photo.key });

    onCancel();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border flex justify-center flex-col p-10 rounded-xl shadow-2xl"
    >
      <button
        type="button"
        onClick={handleCancel}
        className="border rounded-xl p-2 mb-2 ml-auto"
      >
        <Cross className="h-5 w-5" />
      </button>

      {step === 'collection' && <CollectionFields />}
      {step === 'photo' && <PhotoFields />}
      {step === 'metadata' && <MetadataFields />}
      {step === 'summary' && <Summary />}
    </form>
  );
};
