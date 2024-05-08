import Image from 'next/image';

import { type CollectionKey } from '@/libs/photography/types';
import { useCollection } from '@/libs/photography/use-collection';

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
    <div className="flex flex-col justify-center h-full max-h-dvh">
      <Image
        src={image.src['hi-res']}
        alt={image.id}
        priority={true}
        style={{
          width: 'auto',
          height: '100%',
          objectFit: 'contain',
          objectPosition: 'bottom',
        }}
        placeholder="blur"
      />

      <div className="relative p-3 text-white text-xs sm:absolute sm:top-0 sm:p-6">
        <p>
          <i>{image.title || image.id}</i>
        </p>
        {image.settings && (
          <>
            <p>
              <i>{image.settings?.focalLength}</i>
            </p>
            <p>
              <i>f / {image.settings?.aperture}</i>
            </p>
            <p>
              <i>{image.settings?.shutterSpeed}</i>
            </p>
            <p>
              <i>ISO {image.settings?.iso}</i>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
