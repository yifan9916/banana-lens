import { Suspense } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';

import { HydrateClient, trpc } from '@/libs/trpc/server';
import { PhotoList } from '@/components/photo-list/photo-list';
import { MessageThread } from '@/components/messages/thread/message-thread';
import { LightBox } from '@/components/lightbox/lightbox';

import type { Dictionary, DictionaryKeys } from '@/i18n';

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
  type CollectionKeys = keyof Dictionary['Photography']['Collection'];
  const collectionKey = params.collection as CollectionKeys;

  await trpc.collections.getCollection.prefetch({ key: collectionKey });

  const messages = (await getMessages()) as Dictionary;
  const dict = await getTranslations(`Photography.Collection.${collectionKey}`);

  // TODO https://next-intl-docs.vercel.app/docs/usage/messages#arrays-varying-amount
  const description = descriptionMessages[collectionKey].map((m) => {
    return {
      body: dict(`description.${m as DictionaryKeys}`),
    };
  });

  return (
    <HydrateClient>
      <NextIntlClientProvider
        messages={messages.Photography.Collection[collectionKey].Item}
      >
        <div className="max-w-4xl m-auto">
          <h2 className="font-[family-name:var(--font-satisfy)] text-4xl sm:text-6xl text-center p-5 mb-8 sm:mb-14">
            {dict('title')}
          </h2>

          <div className="px-4 sm:px-10 mb-20 max-w-2xl m-auto">
            <MessageThread
              messages={description}
              collapse={description.length > 2}
            />
          </div>

          <div className="relative opacity-0 animate-slide-down animation-delay-500">
            <PhotoList />
          </div>

          <Suspense>
            <LightBox />
          </Suspense>
        </div>

        {children}
      </NextIntlClientProvider>
    </HydrateClient>
  );
}
