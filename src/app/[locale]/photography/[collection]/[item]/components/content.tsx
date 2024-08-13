'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { Link } from '@/navigation';
import { Photograph } from '@/libs/photography/types';
import { usePhoto } from '@/libs/photography/photos/use-photo';
import { ArrowDownDouble } from '@/components/icons';

import type { DictionaryKeys } from '@/i18n';
import type { RouteParams } from '@/app/[locale]/types';

export const Content = () => {
  const params = useParams<RouteParams>();
  const photo = usePhoto(params.item);

  const dict = useTranslations();

  if (!photo) return;

  const title = dict(`${photo.key}.title` as DictionaryKeys);
  const description = dict(`${photo.key}.description` as DictionaryKeys);

  // no description has to be set to empty string in dictionary
  const hasDescription = !!description;

  return (
    <>
      <div className="flex flex-col-reverse sm:flex-col">
        <Photo photo={photo} title={title} hasDescription={hasDescription} />

        <h1 className="font-[family-name:var(--font-satisfy)] text-center text-2xl sm:text-4xl p-8 opacity-0 animate-[fade-in_1s_ease-in-out_forwards_1s]">
          {title || photo.key}
        </h1>
      </div>

      {hasDescription && (
        <p
          id="description"
          className="max-w-2xl p-6 m-auto opacity-0 animate-[fade-in_1s_ease-in-out_forwards_1s]"
        >
          {description}
        </p>
      )}
    </>
  );
};

const Photo = (props: {
  photo: Photograph;
  title: string;
  hasDescription: boolean;
}) => {
  const { photo, title, hasDescription } = props;

  return (
    <div className="relative w-fit sm:h-dvh m-auto opacity-0 animate-slide-up animation-delay-[500ms]">
      <Image
        src={photo.src.hiRes}
        alt={title}
        priority={true}
        className="w-auto sm:h-full object-contain"
        placeholder="blur"
      />

      {photo.metadata && <Settings settings={photo.metadata} />}

      {hasDescription && (
        <Link
          href="#description"
          className="absolute bottom-0 left-1/2 -translate-x-1/2 p-2 mb-4 bg-black/50 rounded-full opacity-0 animate-fade-out hover:animate-fade-in"
        >
          <ArrowDownDouble className="h-5 w-5" />
        </Link>
      )}
    </div>
  );
};

const Settings = (props: { settings: NonNullable<Photograph['metadata']> }) => {
  const { settings } = props;

  return (
    <div className="p-3 text-xs absolute top-0 sm:p-6 opacity-0 animate-fade-out hover:animate-fade-in group-[.animating]:animate-fade-in">
      <p>
        <i>{settings.focalLength}</i>
      </p>
      <p>
        <i>f / {settings.aperture}</i>
      </p>
      <p>
        <i>{settings.shutterSpeed}</i>
      </p>
      <p>
        <i>ISO {settings.iso}</i>
      </p>
    </div>
  );
};
