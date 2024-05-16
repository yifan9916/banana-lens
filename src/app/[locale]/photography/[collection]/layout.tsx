import { useTranslations } from 'next-intl';

import { ImageList } from '@/components/image-list/image-list';
import { useCollection } from '@/libs/photography/use-collection';
import type { CollectionKey } from '@/libs/photography/types';

type Props = {
  children: React.ReactNode;
  params: {
    collection: string;
  };
};

export default function Layout(props: Props) {
  const { children, params } = props;
  const collectionKey = params.collection as CollectionKey;

  const dict = useTranslations(`Photography.Collection.${collectionKey}`);
  const collection = useCollection(collectionKey);

  return (
    <>
      <div className="max-w-4xl m-auto">
        <h2 className="font-[family-name:var(--font-satisfy)] text-4xl sm:text-6xl text-center p-5 mb-14">
          {dict('title')}
        </h2>

        <div className="relative opacity-0 animate-slide-down animation-delay-500">
          <ImageList collectionKey={collection.id} items={collection.items} />
        </div>
      </div>

      {children}
    </>
  );
}
