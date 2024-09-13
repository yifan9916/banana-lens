import { Pencil } from '@/components/icons';

import { useFormContext } from '../../create/form-context';
import { useMultiStepContext } from '../multi-step-context';

export const Summary = () => {
  const { data } = useFormContext();
  const { previous, review } = useMultiStepContext();

  const handlePrevious = () => {
    previous();
  };

  return (
    <div>
      <div className="flex flex-col gap-2 mb-16">
        <div className="py-2 px-6 w-full border rounded-lg flex justify-between items-center">
          {!!data.collection?.key ? (
            <span>Collection Key: {data.collection.key}</span>
          ) : (
            <span className="text-gray-400">No collection added</span>
          )}

          <button
            type="button"
            className="p-3 border rounded-xl"
            onClick={() => review('collection')}
          >
            <Pencil className="h-4 w-4" />
          </button>
        </div>

        <div className="py-2 px-6 w-full border rounded-lg flex justify-between items-center">
          Photo Key: {data.photo.key}
          <button
            type="button"
            className="p-3 border rounded-xl"
            onClick={() => review('photo')}
          >
            <Pencil className="h-4 w-4" />
          </button>
        </div>

        <div className="py-2 px-6 w-full border rounded-lg flex justify-between items-center">
          <div className="flex flex-col gap-2">
            Metadata:
            <div className="pl-2">{data.metadata.camera}</div>
            <div className="flex flex-col gap-2 pl-4 text-gray-500">
              <div>ƒ/ {data.metadata.aperture.replace('.', ',')}</div>
              <div>{data.metadata.focalLength}mm</div>
              <div>ISO {data.metadata.iso}</div>
              <div>{data.metadata.shutterSpeed} sec</div>
            </div>
          </div>

          <button
            type="button"
            className="p-3 border rounded-xl"
            onClick={() => review('metadata')}
          >
            <Pencil className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          className="p-3 border rounded-xl"
          onClick={handlePrevious}
        >
          Previous
        </button>

        <button type="submit" className="p-3 border rounded-xl">
          Submit
        </button>
      </div>
    </div>
  );
};
