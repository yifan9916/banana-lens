import { z } from 'zod';
import { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { trpc } from '@/libs/trpc/react';
import {
  CameraMetadata,
  cameras,
  getApertureDataList,
  getFocalLengthDataList,
  getIsoDataList,
  MetadataSchema,
  sanitizeApertureInput,
  sanitizeFocalLengthInput,
  sanitizeIsoInput,
  sanitizeMetadata,
} from '@/libs/photography/metadata/metadata';
import { Combobox } from '@/components/combobox/combobox';
import { Cross, Pencil } from '@/components/icons';
import { deleteUrlParam } from '@/utils/delete-url-param/delete-url-param';
import { InputErrors } from '../components/input-errors';

import type { Photograph } from '@/libs/photography/types';

const EditPhotoSchema = z.intersection(
  z.object({ status: z.enum(['published', 'draft']) }),
  MetadataSchema
);

type FlattenedErrors = z.inferFlattenedErrors<typeof EditPhotoSchema>;

type Props = {
  photo: Photograph;
};

export const EditPhoto = (props: Props) => {
  const urlParam = 'edit-photo';
  const { photo } = props;

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Status
  const [statusInput, setStatus] = useState(photo.status);
  // Metadata
  const [cameraInput, setCamera] = useState(photo.metadata.camera);
  const [apertureInput, setAperture] = useState(photo.metadata.aperture);
  const [focalLengthInput, setFocalLength] = useState(
    sanitizeFocalLengthInput(photo.metadata.focalLength)
  );
  const [isoInput, setIso] = useState(photo.metadata.iso);
  const [shutterSpeedInput, setShutterSpeed] = useState(
    photo.metadata.shutterSpeed
  );

  const [errors, setErrors] = useState<FlattenedErrors['fieldErrors']>();

  const updatePhoto = trpc.photos.updatePhoto.useMutation({
    onSuccess: () => {},
  });

  const updateMetadata = trpc.metadata.updateMetadata.useMutation({
    onSuccess: () => {},
  });

  const utils = trpc.useUtils();

  const isEdit = searchParams.get(urlParam) === photo.key;

  const handleStatusChange: React.ComponentProps<'fieldset'>['onChange'] = (
    e
  ) => {
    setStatus((e.target as HTMLInputElement).value as typeof photo.status);
  };

  const handleApertureChange = (value: string) => {
    setAperture(sanitizeApertureInput(value));
  };

  const handleFocalLengthChange = (value: string) => {
    setFocalLength(sanitizeFocalLengthInput(value));
  };

  const handleIsoChange = (value: string) => {
    setIso(sanitizeIsoInput(value));
  };

  const handleEdit = () => {
    if (isEdit) {
      const updatedParams = deleteUrlParam(searchParams.toString(), urlParam);

      router.replace(`${pathname}?${updatedParams}`, { scroll: false });

      return;
    }

    router.replace(`?${urlParam}=${photo.key}`, { scroll: false });
  };

  const handleCancel = () => {
    const updatedParams = deleteUrlParam(searchParams.toString(), urlParam);

    router.replace(`${pathname}?${updatedParams}`, { scroll: false });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // const formData = new FormData(e.currentTarget);
    // const inputData = Object.fromEntries(formData.entries()) as EditPhotoData;

    const metadataInput: CameraMetadata = {
      camera: cameraInput,
      aperture: apertureInput,
      focalLength: focalLengthInput,
      iso: isoInput,
      shutterSpeed: shutterSpeedInput,
    };

    const parsedData = EditPhotoSchema.safeParse({
      status: statusInput,
      ...metadataInput,
    });
    const errors = parsedData.success ? undefined : parsedData.error.flatten();

    if (errors) {
      setErrors(errors.fieldErrors);
      return;
    }

    updatePhoto.mutate({
      key: photo.key,
      data: { status: statusInput, views: photo.views },
    });

    updateMetadata.mutate({
      id: photo.metadata.id,
      data: sanitizeMetadata({ ...metadataInput }),
    });

    utils.photos.getPhotos.invalidate();

    handleCancel();
  };

  return (
    <>
      <button onClick={handleEdit} className="border rounded-xl p-2">
        <Pencil className="h-5 w-5" />
      </button>

      {isEdit && (
        <div className="fixed w-full max-w-4xl bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
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

            <div className="mb-10">
              <div className="text-sm text-slate-500">#{photo.id}</div>
              <div className="font-extrabold text-lg">{photo.key}</div>
            </div>

            <fieldset onChange={handleStatusChange} className="mb-8">
              <legend className="mb-4">Status</legend>

              <input
                type="radio"
                id="published"
                name="status"
                value="published"
                checked={statusInput === 'published'}
                className="mx-2"
              />
              <label htmlFor="published">Published</label>

              <input
                type="radio"
                id="draft"
                name="status"
                value="draft"
                checked={statusInput === 'draft'}
                className="mx-2"
              />
              <label htmlFor="draft">Draft</label>
            </fieldset>

            <fieldset className="flex flex-col gap-2 mb-16">
              <legend className="mb-4">Metadata</legend>
              <Combobox
                name="camera"
                placeholder="Camera..."
                initialValue={cameraInput}
                list={cameras.map((c) => ({ value: c }))}
                onInputChange={(value) => setCamera(value)}
              />
              <div className="flex flex-row gap-2">
                <Combobox
                  name="aperture"
                  placeholder="Aperture..."
                  initialValue={apertureInput ? `ƒ/ ${apertureInput}` : ''}
                  list={getApertureDataList()}
                  onInputChange={handleApertureChange}
                />

                <Combobox
                  name="focalLength"
                  placeholder="Focal length..."
                  initialValue={focalLengthInput ? `${focalLengthInput}mm` : ''}
                  list={getFocalLengthDataList()}
                  onInputChange={handleFocalLengthChange}
                />

                <Combobox
                  name="iso"
                  placeholder="ISO..."
                  initialValue={isoInput ? `ISO ${isoInput}` : ''}
                  list={getIsoDataList()}
                  onInputChange={handleIsoChange}
                />

                <input
                  type="text"
                  id="shutterSpeed"
                  name="shutterSpeed"
                  placeholder="Shutter speed..."
                  onChange={(e) => setShutterSpeed(e.currentTarget.value)}
                  value={shutterSpeedInput}
                  className="py-2 pl-6 w-full border rounded-lg"
                />
              </div>

              {errors && (
                <div className="px-2">
                  {Object.entries(errors).map((entry) => (
                    <InputErrors key={entry[0]} errors={entry[1]} />
                  ))}
                </div>
              )}
            </fieldset>

            <div className="flex flex-row mt-4">
              <button className="border rounded-xl p-3 ml-auto">Update</button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};
