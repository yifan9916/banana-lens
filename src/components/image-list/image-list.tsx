import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { Link } from '@/navigation';
import { Photograph } from '@/libs/photography/types';

type Props = {
  collectionKey: string;
  items: Photograph[];
};

export const ImageList = (props: Props) => {
  const { collectionKey, items } = props;

  const dict = useTranslations(`Photography.Collection.${collectionKey}.Item`);

  return (
    <ul className="grid grid-cols-2 p-2 gap-2 sm:grid-cols-4">
      {items.map((img) => {
        const title = dict(`${img.key}.title`);
        return (
          <li key={img.key} className="rounded-2xl overflow-hidden">
            <Link
              key={img.key}
              href={{
                pathname: `/photography/${collectionKey}/${img.key}`,
                query: { loupe: true },
              }}
              className="flex h-full flex-col"
            >
              <Image
                src={img.src.preview}
                alt={title}
                placeholder="blur"
                className="flex-1 object-cover"
              />
              <div className="text-sm font-light p-2">{title || img.key}</div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
