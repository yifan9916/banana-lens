import { useState } from 'react';
import Image from 'next/image';

const MB_IN_BYTES = 1_048_576;
const ACCEPT_FILE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'video/mp4',
  'video/webm',
].join(',');

export const FileInput = (props: {
  label: string;
  onChange: (file: File | undefined) => void;
}) => {
  const { label, onChange } = props;

  const [file, setFile] = useState<File>();
  const [objectUrl, setObjectUrl] = useState<string>();

  const handleFileChange: React.ComponentProps<'input'>['onChange'] = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      setFile(undefined);
    } else {
      setFile(file);
      // https://developer.mozilla.org/en-US/docs/Web/API/File_API/Using_files_from_web_applications#example_using_object_urls_to_display_images
      setObjectUrl(URL.createObjectURL(file));
    }

    onChange(file);
  };

  return (
    <div className="flex gap-2">
      <div className="flex flex-col gap-2">
        <label>
          <p className="ml-2">{label}</p>

          <input
            type="file"
            accept={ACCEPT_FILE_TYPES}
            onChange={handleFileChange}
            className="border rounded-xl file:p-2 file:border file:border-solid file:border-slate-200 file:bg-white file:mr-4 text-slate-500 hover:file:cursor-pointer"
          />
        </label>

        <p className="text-sm text-slate-500 ml-2 h-4">
          {file && <>Size: {(file.size / MB_IN_BYTES).toFixed(2)} MB</>}
        </p>
      </div>

      {file && (
        // constrain to sibling height
        // https://stackoverflow.com/a/49065029
        <div className="flex flex-col">
          <div className="basis-0 flex-grow overflow-auto flex justify-end">
            <Image
              src={objectUrl || ''}
              alt={file.name}
              width="1024"
              height="768"
              className="object-contain w-auto rounded-lg"
              onLoad={() => {
                if (objectUrl) URL.revokeObjectURL(objectUrl);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
