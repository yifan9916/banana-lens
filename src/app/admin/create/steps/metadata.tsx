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
import { useFormContext } from '../../create/form-context';
import { useMultiStepContext } from '../multi-step-context';
import { InputErrors } from '../../components/input-errors';

type FlattenedErrors = z.inferFlattenedErrors<typeof MetadataSchema>;

export const MetadataFields = () => {
  const { data, saveData } = useFormContext();
  const { previous, next, isReview } = useMultiStepContext();

  const [cameraInput, setCamera] = useState(data.metadata.camera);
  const [apertureInput, setAperture] = useState(data.metadata.aperture);
  const [focalLengthInput, setFocalLength] = useState(
    data.metadata.focalLength
  );
  const [isoInput, setIso] = useState(data.metadata.iso);
  const [shutterSpeedInput, setShutterSpeed] = useState(
    data.metadata.shutterSpeed
  );
  const [errors, setErrors] = useState<FlattenedErrors['fieldErrors']>();

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
    const parsedData = MetadataSchema.safeParse({
      aperture: apertureInput,
      camera: cameraInput,
      focalLength: focalLengthInput,
      iso: isoInput,
      shutterSpeed: shutterSpeedInput,
    });

    const errors = parsedData.success ? undefined : parsedData.error.flatten();

    if (errors) {
      setErrors(errors.fieldErrors);
      return;
    }

    saveData({
      type: 'save_metadata',
      payload: {
        metadata: {
          aperture: apertureInput,
          camera: cameraInput,
          focalLength: focalLengthInput,
          iso: isoInput,
          shutterSpeed: shutterSpeedInput,
        },
      },
    });

    next();
  };

  return (
    <>
      <div className="mb-16">
        <p className="p-2">Add metadata</p>

        <div className="flex flex-col gap-2">
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
        </div>
      </div>

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
          className="p-3 border rounded-xl"
          onClick={handleNext}
        >
          {isReview ? 'Save' : 'Next'}
        </button>
      </div>
    </>
  );
};
