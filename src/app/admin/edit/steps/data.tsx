import { z } from 'zod';
import { useState } from 'react';

import {
  cameras,
  getApertureDataList,
  getFocalLengthDataList,
  getIsoDataList,
  MetadataSchema,
  sanitizeApertureInput,
  sanitizeFocalLengthInput,
  sanitizeIsoInput,
} from '@/libs/photography/metadata/metadata';
import { Combobox } from '@/components/combobox/combobox';
import { InputErrors } from '../../components/input-errors';
import { useFormContext } from '../form-context';
import { useMultiStepContext } from '../multi-step-context';

const EditPhotoSchema = z.intersection(
  z.object({ status: z.enum(['published', 'draft']) }),
  MetadataSchema
);
type FlattenedErrors = z.inferFlattenedErrors<typeof EditPhotoSchema>;

export const DataStep = () => {
  const { isReview, next, previous } = useMultiStepContext();
  const { data, updateData } = useFormContext();

  // Status
  const [statusInput, setStatus] = useState(data.status);
  // Metadata
  const [cameraInput, setCamera] = useState(data.metadata.camera);
  const [apertureInput, setAperture] = useState(data.metadata.aperture);
  const [focalLengthInput, setFocalLength] = useState(
    sanitizeFocalLengthInput(data.metadata.focalLength)
  );
  const [isoInput, setIso] = useState(data.metadata.iso);
  const [shutterSpeedInput, setShutterSpeed] = useState(
    data.metadata.shutterSpeed
  );

  const [errors, setErrors] = useState<FlattenedErrors['fieldErrors']>();

  const handleStatusChange: React.ComponentProps<'fieldset'>['onChange'] = (
    e
  ) => {
    setStatus((e.target as HTMLInputElement).value as typeof data.status);
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

  const handlePrevious = () => {
    previous();
  };

  const handleNext = () => {
    const parsedData = EditPhotoSchema.safeParse({
      status: statusInput,
      camera: cameraInput,
      focalLength: focalLengthInput,
      aperture: apertureInput,
      shutterSpeed: shutterSpeedInput,
      iso: isoInput,
    });

    const errors = parsedData.success ? undefined : parsedData.error.flatten();

    if (errors) {
      setErrors(errors.fieldErrors);
      return;
    }

    updateData({ type: 'update_status', payload: { status: statusInput } });
    updateData({
      type: 'update_metadata',
      payload: {
        metadata: {
          camera: cameraInput,
          focalLength: focalLengthInput,
          aperture: apertureInput,
          shutterSpeed: shutterSpeedInput,
          iso: isoInput,
        },
      },
    });

    next();
  };

  return (
    <>
      <fieldset onChange={handleStatusChange} className="mb-8">
        <legend className="mb-4">Status</legend>

        <input
          type="radio"
          id="published"
          name="status"
          value="published"
          defaultChecked={statusInput === 'published'}
          className="mx-2"
        />
        <label htmlFor="published">Published</label>

        <input
          type="radio"
          id="draft"
          name="status"
          value="draft"
          defaultChecked={statusInput === 'draft'}
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

      <div className="flex justify-between">
        <button
          type="button"
          className="p-3 border rounded-xl"
          onClick={handlePrevious}
        >
          {isReview ? 'Cancel' : 'Previous'}
        </button>
        <button
          type="button"
          className="p-3 border rounded-xl capitalize ml-auto"
          onClick={handleNext}
        >
          {isReview ? 'Save' : 'Next'}
        </button>
      </div>
    </>
  );
};
