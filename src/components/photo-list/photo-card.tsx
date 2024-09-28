import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { Photograph } from '@/libs/photography/types';
import { Eyes } from '../icons';

import type { DictionaryKeys } from '@/i18n/types';

type Props = {
  photo: Photograph;
};

export const PhotoCard = (props: Props) => {
  const { photo } = props;

  const dict = useTranslations();

  const title = dict(`${photo.key}.title` as DictionaryKeys);

  const handleClick = () => {
    window.history.pushState(null, '', `?lightbox=${photo.key}`);
  };

  return (
    <li className="rounded-2xl overflow-hidden">
      <div onClick={handleClick} className="flex h-full flex-col">
        {photo.media.lowResolution?.url && (
          <Image
            unoptimized
            alt={title}
            // TODO
            // placeholder="blur"
            src={photo.media.lowResolution?.url}
            width={214}
            height={321}
            quality={50}
            className="object-cover aspect-[6/9]"
          />
        )}
        <div className="flex justify-between items-center text-sm font-light p-2">
          {title || photo.key}{' '}
          <span className="flex text-xs">
            <Eyes className="h-4 w-4 mr-1" /> {photo.views}
          </span>
        </div>
      </div>
    </li>
  );
};
