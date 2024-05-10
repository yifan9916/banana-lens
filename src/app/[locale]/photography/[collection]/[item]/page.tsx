import Image from 'next/image';

import { useCollection } from '@/libs/photography/use-collection';
import type { TODO_Image, CollectionKey } from '@/libs/photography/types';

type Props = {
  params: {
    collection: string;
    item: string;
  };
};

export default function Page(props: Props) {
  const { params } = props;

  const collectionKey = params.collection as CollectionKey;
  const collection = useCollection(collectionKey);

  const image = collection.items.filter((img) => {
    return `${img.id}.jpg` === params.item;
  })[0];

  return (
    <>
      <div className="flex h-full flex-col sm:flex-row">
        <Image
          src={image.src['hi-res']}
          alt={image.id}
          priority={true}
          style={{
            width: 'auto',
            height: '100%',
            objectFit: 'contain',
          }}
          placeholder="blur"
        />

        {image.settings && <Settings settings={image.settings} />}
      </div>
      <h1 className="font-[family-name:var(--font-satisfy)] text-center text-2xl sm:text-4xl p-8">
        {image.title || image.id}
      </h1>
      {image.description && (
        <p className="max-w-2xl p-6 m-auto">{image.description}</p>
      )}
    </>
  );
}

const Settings = (props: { settings: NonNullable<TODO_Image['settings']> }) => {
  const { settings } = props;

  return (
    <div className="relative p-3 text-xs sm:absolute sm:top-0 sm:p-6">
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
