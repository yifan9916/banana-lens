import { useState } from 'react';
import Image from 'next/image';

import { FileInput } from './file-input';
import { Pencil } from '@/components/icons';

type Props = {
  label: string;
  onChange: (file: File | undefined) => void;
  media?: string;
};

export const FileManagement = (props: Props) => {
  const { label, onChange, media } = props;

  const [isUpdate, setIsUpdate] = useState(!media);

  return (
    <>
      {media && !isUpdate ? (
        <div>
          <div className="flex">
            <p className="w-24 mr-4">{label}</p>
            <button onClick={() => setIsUpdate(true)} className="relative">
              <Image
                src={media}
                alt={media}
                width={768}
                height={1024}
                className="h-24 w-min object-contain rounded-xl"
              />
              <Pencil className="h-4 w-4 absolute bottom-2 right-2 text-white" />
            </button>
          </div>
          <div className="text-sm text-slate-400">
            <a href={media}>{media.split('?').shift()?.split('/').pop()}</a>
          </div>
        </div>
      ) : (
        <FileInput label={label} onChange={onChange} />
      )}
    </>
  );
};
