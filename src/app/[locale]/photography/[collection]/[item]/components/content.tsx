import Image from 'next/image';

import { Link } from '@/navigation';
import { ArrowDownDouble } from '@/components/icons';
import { Photograph } from '@/libs/photography/types';

type Props = {
  image: Photograph;
  title?: string;
  description?: string;
};

export const Content = (props: Props) => {
  const { image, description, title } = props;

  return (
    <>
      <div className="relative w-fit sm:h-full sm:max-h-dvh m-auto px-2 mt-20 sm:px-0 sm:mt-0 opacity-0 animate-slide-up animation-delay-[500ms]">
        <Image
          src={image.src.hiRes}
          alt={image.id}
          priority={true}
          className="w-auto sm:h-full object-contain"
          placeholder="blur"
        />

        {image.settings && <Settings settings={image.settings} />}

        {description && (
          <Link
            href={'#description'}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 p-2 mb-4 bg-black/50 rounded-full opacity-0 animate-fade-out hover:animate-fade-in"
          >
            <ArrowDownDouble className="h-5 w-5" />
          </Link>
        )}
      </div>

      <h1 className="font-[family-name:var(--font-satisfy)] text-center text-2xl sm:text-4xl p-8 opacity-0 animate-[fade-in_1s_ease-in-out_forwards_1s]">
        {title || image.id}
      </h1>

      {description && (
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

const Settings = (props: { settings: NonNullable<Photograph['settings']> }) => {
  const { settings } = props;

  return (
    <div className="p-3 text-xs absolute top-0 sm:p-6 opacity-0 animate-fade-out hover:animate-fade-in group-[.animating]:animate-fade-in">
      <p>
        <i>{settings?.focalLength}</i>
      </p>
      <p>
        <i>f / {settings?.aperture}</i>
      </p>
      <p>
        <i>{settings?.shutterSpeed}</i>
      </p>
      <p>
        <i>ISO {settings?.iso}</i>
      </p>
    </div>
  );
};
