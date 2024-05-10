'use client';

import { useSelectedLayoutSegments } from 'next/navigation';

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

  const segments = useSelectedLayoutSegments();

  const collection = useCollection(collectionKey);

  return (
    <>
      <ImageList list={{ id: collection.id, items: collection.items }} />

      {!!segments.length && (
        <div className="flex flex-col items-center fixed bottom-0 left-0 h-dvh bg-black/80 dark:bg-black/50 backdrop-blur-md overflow-scroll w-dvw p-2 py-10 sm:p-0">
          {children}
        </div>
      )}
    </>
  );
}
