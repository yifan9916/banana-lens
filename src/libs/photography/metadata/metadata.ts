import { z } from 'zod';

import { ComboboxListItem } from '@/components/combobox/combobox';

import type { Photograph } from '@/libs/photography/types';

export const cameras = ['SonyA7M4', 'iPhone15ProMax'];
const fStops = [
  1.8, 2.0, 2.2, 2.5, 2.8, 3.2, 3.5, 4.0, 4.5, 5.0, 5.6, 6.3, 7.1, 8.0, 9.0, 10,
  11, 13, 14, 16, 18, 20, 22,
];
const focalLengths = [13, 20, 24, 28, 30, 35, 50, 85, 120];
const isoValues = [
  100, 125, 160, 200, 250, 320, 400, 500, 640, 800, 1000, 1250, 1600, 2000,
  2500, 3200, 4000, 5000, 6400, 8000, 10000, 12800,
];

export const getApertureDataList = (): ComboboxListItem[] =>
  fStops.map((v) => ({
    value: `ƒ/ ${v.toFixed(1).replace('.', ',')}`,
  }));

export const getFocalLengthDataList = (): ComboboxListItem[] =>
  focalLengths.map((v) => ({ value: `${v}mm` }));

export const getIsoDataList = (): ComboboxListItem[] =>
  isoValues.map((v) => ({ value: `ISO ${v}` }));

export const sanitizeApertureInput = (value: string) => {
  const sanitizedInput = value.replace('ƒ/', '').trim();

  return sanitizedInput;
};

export const sanitizeFocalLengthInput = (value: string) => {
  const sanitizedInput = value.replace('mm', '').trim();

  return sanitizedInput;
};

export const sanitizeIsoInput = (value: string) => {
  const sanitizedInput = value.replace('ISO', '').trim();

  return sanitizedInput;
};

export const MetadataSchema = z.object({
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
}) satisfies z.ZodSchema<Omit<Photograph['metadata'], 'photoId' | 'id'>>;

export type CameraMetadata = z.infer<typeof MetadataSchema>;

export const sanitizeMetadata = (data: CameraMetadata) => {
  const sanitizedObj = {
    camera: data.camera,
    aperture: data.aperture.replace('.', ','),
    focalLength: `${data.focalLength}mm`,
    iso: data.iso,
    shutterSpeed: data.shutterSpeed,
  };

  return sanitizedObj;
};
