import { z } from 'zod';
import { useState } from 'react';

import { useFormContext } from '../../create/form-context';
import { useMultiStepContext } from '../multi-step-context';
import { InputErrors } from '../../components/input-errors';

const PhotoSchema = z.object({
  key: z
    .string()
    .min(1, { message: 'A Key is required to create a photo entry' }),
});
type FlattenedErrors = z.inferFlattenedErrors<typeof PhotoSchema>;

const generatePhotoKey = (value: string) =>
  value.toLowerCase().split(' ').join('-');

export const PhotoFields = () => {
  const { data, saveData } = useFormContext();
  const { previous, next, isReview } = useMultiStepContext();

  const [photoInput, setPhotoInput] = useState(data.photo.key);
  const [photoKey, setPhotoKey] = useState(data.photo.key);
  const [errors, setErrors] = useState<FlattenedErrors['fieldErrors']>();

  const handlePhotoInput: React.ComponentProps<'input'>['onChange'] = (e) => {
    const query = e.currentTarget.value;

    if (!query.length) {
      setPhotoInput('');
      setPhotoKey('');

      return;
    }

    const photoKey = generatePhotoKey(query);

    setPhotoInput(query);
    setPhotoKey(photoKey);
  };

  const handlePrevious = () => {
    previous();
  };

  const handleNext = () => {
    const parsedData = PhotoSchema.safeParse({ key: photoKey });
    const errors = parsedData.success ? undefined : parsedData.error.flatten();

    if (errors) {
      setErrors(errors.fieldErrors);
      return;
    }

    saveData({
      type: 'save_photo',
      payload: {
        photo: { key: photoKey },
      },
    });

    next();
  };

  return (
    <>
      <div className="mb-16">
        <label htmlFor="photoKey" className="block p-2">
          Enter a key for the photo
        </label>

        <input
          type="text"
          id="photoKey"
          name="photoKey"
          placeholder="Photo Key..."
          onChange={handlePhotoInput}
          value={photoInput}
          className="py-2 pl-6 w-full border rounded-lg"
        />

        {photoInput && (
          <p className="p-2 text-sm text-gray-500">Resulting key: {photoKey}</p>
        )}

        {errors?.key && (
          <div className="px-2">
            <InputErrors errors={errors.key} />
          </div>
        )}
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
