import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { Link } from '@/navigation';
import { Photograph } from '@/libs/photography/types';
// import { Eyes } from '../icons';

import type { DictionaryKeys } from '@/i18n';

export const PhotoCard = (props: { photo: Photograph }) => {
  const { photo } = props;

  const dict = useTranslations();

  const title = dict(`${photo.key}.title` as DictionaryKeys);

  return (
    <li key={photo.key} className="rounded-2xl overflow-hidden">
      <Link
        key={photo.key}
        href={{
          pathname: `/photography/${photo.collection}/${photo.key}`,
          query: { loupe: true },
        }}
        className="flex h-full flex-col"
      >
        <Image
          src={photo.src.preview}
          alt={title}
          placeholder="blur"
          className="flex-1 object-cover"
        />
        <div className="flex justify-between items-center text-sm font-light p-2">
          {title || photo.key}{' '}
          {/* <span className="flex text-xs">
            <Eyes className="h-4 w-4 mr-1" /> {photo.views}
          </span> */}
        </div>
      </Link>
    </li>
  );
};
