import { Pencil } from '@/components/icons';

import { convertByteToMb } from '@/utils/convert-byte-to-mb/convert-byte-to-mb';
import { useFormContext } from '../form-context';
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
          <div className="flex flex-col gap-4">
            {data.files.highResolution instanceof File ? (
              <div>
                <p>Hi-Res File:</p>
                <p className="flex justify-between items-center gap-2 font-bold">
                  {data.files.highResolution.name}
                </p>
                <p className="text-sm text-slate-400">
                  Size: {convertByteToMb(data.files.highResolution.size)} MB
                </p>
              </div>
            ) : (
              <div>
                <p>Hi-Res File:</p>
                <p className="text-gray-400">No new photo selected</p>
              </div>
            )}
            {data.files.lowResolution instanceof File ? (
              <div>
                <p>Hi-Res File:</p>
                <p className="flex justify-between items-center gap-2 font-bold">
                  {data.files.lowResolution.name}
                </p>
                <p className="text-sm text-slate-400">
                  Size: {convertByteToMb(data.files.lowResolution.size)} MB
                </p>
              </div>
            ) : (
              <div>
                <p>Hi-Res File:</p>
                <p className="text-gray-400">No new photo selected</p>
              </div>
            )}
          </div>

          <button
            type="button"
            className="p-3 border rounded-xl"
            onClick={() => review('files')}
          >
            <Pencil className="h-4 w-4" />
          </button>
        </div>

        <div className="py-2 px-6 w-full border rounded-lg flex justify-between items-center">
          Publish status: {data.status}
          <button
            type="button"
            className="p-3 border rounded-xl"
            onClick={() => review('data')}
          >
            <Pencil className="h-4 w-4" />
          </button>
        </div>

        <div className="py-2 px-6 w-full border rounded-lg flex justify-between items-center">
          <div className="flex flex-col gap-2">
            Metadata:
            <div className="flex flex-col gap-2 pl-4 text-gray-500">
              <div>{data.metadata.camera}</div>
              <div>ƒ/ {data.metadata.aperture.replace('.', ',')}</div>
              <div>{data.metadata.focalLength}mm</div>
              <div>ISO {data.metadata.iso}</div>
              <div>{data.metadata.shutterSpeed} sec</div>
            </div>
          </div>

          <button
            type="button"
            className="p-3 border rounded-xl"
            onClick={() => review('data')}
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
