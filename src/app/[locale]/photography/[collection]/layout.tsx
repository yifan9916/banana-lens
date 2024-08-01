import { getTranslations } from 'next-intl/server';

import { getCollection } from '@/libs/photography/get-collection';
import { ImageList } from '@/components/image-list/image-list';
import { MessageThread } from '@/components/messages/thread/message-thread';

type Props = {
  children: React.ReactNode;
  params: {
    collection: string;
  };
};

const descriptionMessages: Record<string, string[]> = {
  chongqing: ['01', '02', '03', '04', '05', '06'],
  europe: ['01', '02'],
};

export default async function Layout(props: Props) {
  const { children, params } = props;
  const collectionKey = params.collection;

  const collection = await getCollection(collectionKey);

  if (!collection) {
    return <div>Collection not found!</div>;
  }

  const dict = await getTranslations(`Photography.Collection.${collectionKey}`);

  const messages = descriptionMessages[collectionKey].map((m) => ({
    body: dict(`description.${m}`),
  }));

  return (
    <>
      <div className="max-w-4xl m-auto">
        <h2 className="font-[family-name:var(--font-satisfy)] text-4xl sm:text-6xl text-center p-5 mb-8 sm:mb-14">
          {dict('title')}
        </h2>

        <div className="px-4 sm:px-10 mb-20 max-w-2xl m-auto">
          <MessageThread messages={messages} collapse={messages.length > 2} />
        </div>

        <div className="relative opacity-0 animate-slide-down animation-delay-500">
          <ImageList collectionKey={collection.key} items={collection.photos} />
        </div>
      </div>

      {children}
    </>
  );
}
