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
  const collection = useCollection(collectionKey);

  return (
    <>
      <div className="relative max-w-4xl m-auto opacity-0 animate-slide-down animation-delay-500">
        <ImageList collectionKey={collection.id} items={collection.items} />
      </div>

      {children}
    </>
  );
}
