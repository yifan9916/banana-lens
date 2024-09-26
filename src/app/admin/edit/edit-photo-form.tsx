import Image from 'next/image';

import { trpc } from '@/libs/trpc/react';
import { useFormContext } from './form-context';
import { useMultiStepContext } from './multi-step-context';
import { Cross } from '@/components/icons';
import { FilesStep } from './steps/files';
import { DataStep } from './steps/data';
import { Summary } from './steps/summary';

import {
  type CameraMetadata,
  sanitizeMetadata,
} from '@/libs/photography/metadata/metadata';
import type { Photograph } from '@/libs/photography/types';

type Props = {
  photo: Photograph;
  onCancel: () => void;
};

export const UpdatePhotoForm = (props: Props) => {
  const { photo, onCancel } = props;

  const { data } = useFormContext();
  const { step } = useMultiStepContext();

  const createPresignedPost = trpc.files.createPresignedPost.useMutation({});
  const createFile = trpc.files.createFile.useMutation({});
  const updateFile = trpc.files.updateFile.useMutation({});
  const updatePhoto = trpc.photos.updatePhoto.useMutation({});
  const updateMetadata = trpc.metadata.updateMetadata.useMutation({});

  const utils = trpc.useUtils();

  const uploadFile = async (
    file: File,
    quality: keyof (typeof photo)['media']
  ) => {
    const { url, fields } = await createPresignedPost.mutateAsync({
      key: file.name,
      type: file.type,
    });

    // TODO find a different place to stare this
    const cdnUrl = 'https://dfx6ax10jig7t.cloudfront.net';
    const fileUrl = `${cdnUrl}/${fields.key}`;

    const data = {
      ...fields,
      'Content-Type': file.type,
      file,
    };

    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    await fetch(url, {
      method: 'POST',
      body: formData,
    });

    const resolution = quality === 'lowResolution' ? 'low' : 'high';

    if (!photo.media[quality]) {
      createFile.mutate({
        photoId: photo.id,
        url: fileUrl,
        resolution,
      });
    } else {
      updateFile.mutate({
        id: photo.media[quality].id,
        data: {
          url: fileUrl,
          resolution,
        },
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const metadataInput: CameraMetadata = {
      camera: data.metadata.camera,
      aperture: data.metadata.aperture,
      focalLength: data.metadata.focalLength,
      iso: data.metadata.iso,
      shutterSpeed: data.metadata.shutterSpeed,
    };

    if (data.files.lowResolution instanceof File) {
      await uploadFile(data.files.lowResolution, 'lowResolution');
    }

    if (data.files.highResolution instanceof File) {
      await uploadFile(data.files.highResolution, 'highResolution');
    }

    updatePhoto.mutate({
      key: photo.key,
      data: {
        status: data.status,
      },
    });

    updateMetadata.mutate({
      id: photo.metadata.id,
      data: sanitizeMetadata({ ...metadataInput }),
    });

    utils.photos.getPhotos.invalidate();

    handleCancel();
  };

  const handleCancel = () => {
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
        className="border rounded-xl p-2 mb-8 ml-auto"
      >
        <Cross className="h-5 w-5" />
      </button>

      <div className="mb-8 flex gap-4">
        <div>
          <p className="text-sm text-slate-400">#{photo.id}</p>
          <p className="text-lg font-bold">{photo.key}</p>
        </div>

        {photo.media.lowResolution?.url && (
          <div className="flex flex-col">
            <div className="basis-0 flex-grow overflow-auto flex">
              <Image
                src={photo.media.lowResolution.url}
                alt={photo.key}
                width="1024"
                height="768"
                className="object-contain w-auto rounded-lg"
              />
            </div>
          </div>
        )}
      </div>

      {step === 'files' && <FilesStep />}
      {step === 'data' && <DataStep />}
      {step === 'summary' && <Summary />}
    </form>
  );
};
