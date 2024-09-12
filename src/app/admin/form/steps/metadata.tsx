import { z } from 'zod';
import { useState } from 'react';

import { Combobox } from '@/components/combobox/combobox';
import { useFormContext } from '../form-context';
import { useMultiStepContext } from '../../multi-step-context';
import { InputErrors } from '../input-errors';

const cameras = ['SonyA7M4', 'iPhone15ProMax'];

const fStops = [
  1.8, 2.0, 2.2, 2.5, 2.8, 3.2, 3.5, 4.0, 4.5, 5.0, 5.6, 6.3, 7.1, 8.0, 9.0, 10,
  11, 13, 14, 16, 18, 20, 22,
];

const focalLengths = [13, 20, 24, 28, 30, 35, 50, 85, 120];

const isoValues = [
  100, 125, 160, 200, 250, 320, 400, 500, 640, 800, 1000, 1250, 1600, 2000,
  2500, 3200, 4000, 5000, 6400, 8000, 10000, 12800,
];

const MetadataSchema = z.object({
  camera: z.string().min(1, {
    message: 'Camera system is missing a value',
  }),
  aperture: z.string().min(1, {
    message: 'Aperture is missing a value',
  }),
  focalLength: z.string().min(1, {
    message: 'Focal Length is missing a value',
  }),
  iso: z.string().min(1, {
    message: 'ISO field is missing a value',
  }),
  shutterSpeed: z.string().min(1, {
    message: 'Shutter Speed is missing a value',
  }),
});
type FlattenedErrors = z.inferFlattenedErrors<typeof MetadataSchema>;

export const MetadataFields = () => {
  const { data, saveData } = useFormContext();
  const { previous, next, isReview } = useMultiStepContext();

  const [cameraInput, setCamera] =
    useState<(typeof cameras)[number]>('SonyA7M4');
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
    const rawValue = value.replace('ƒ/', '').trim();

    setAperture(rawValue);
  };

  const handleFocalLengthChange = (value: string) => {
    const rawValue = value.replace('mm', '').trim();

    setFocalLength(rawValue);
  };

  const handleIsoChange = (value: string) => {
    const rawValue = value.replace('ISO', '').trim();

    setIso(rawValue);
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
              list={fStops.map((v) => ({
                value: `ƒ/ ${v.toFixed(1).replace('.', ',')}`,
              }))}
              onInputChange={handleApertureChange}
            />

            <Combobox
              name="focalLength"
              placeholder="Focal length..."
              initialValue={focalLengthInput ? `${focalLengthInput}mm` : ''}
              list={focalLengths.map((v) => ({ value: `${v}mm` }))}
              onInputChange={handleFocalLengthChange}
            />

            <Combobox
              name="iso"
              placeholder="ISO..."
              initialValue={isoInput ? `ISO ${isoInput}` : ''}
              list={isoValues.map((v) => ({ value: `ISO ${v}` }))}
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
