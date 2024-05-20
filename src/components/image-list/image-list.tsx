import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { Link } from '@/navigation';
import { CollectionKey, Photograph } from '@/libs/photography/types';

type Props = {
  collectionKey: CollectionKey;
  items: Photograph[];
};

export const ImageList = (props: Props) => {
  const { collectionKey, items } = props;
  const dict = useTranslations(`Photography.Collection.${collectionKey}.Item`);

  return (
    <ul className="grid grid-cols-2 p-2 gap-2 sm:grid-cols-4">
      {items.map((img) => {
        return (
          <li key={img.id} className="rounded-2xl overflow-hidden">
            <Link
              key={img.id}
              href={{
                pathname: `/photography/${collectionKey}/${img.id}.jpg`,
                query: { loupe: true },
              }}
              className="flex h-full flex-col"
            >
              <Image
                src={img.src.preview}
                alt={img.id}
                placeholder="blur"
                className="flex-1 object-cover"
              />
              <div className="text-sm font-light p-2">
                {dict(`${img.id}.title`) || img.id}
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
