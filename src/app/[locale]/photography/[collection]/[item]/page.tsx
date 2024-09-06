import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import { HydrateClient, trpc } from '@/libs/trpc/server';
import { Container } from './components/container';
import { Content } from './components/content';

import type { Dictionary } from '@/i18n/types';
import type { RouteParams } from '@/app/[locale]/types';

type Props = {
  params: RouteParams;
};

export default async function Page(props: Props) {
  const { params } = props;
  type CollectionKey = keyof Dictionary['Photography']['Collection'];
  const collectionKey = params.collection as CollectionKey;

  await trpc.photos.getPhoto.prefetch({ key: params.item });

  const messages = (await getMessages()) as Dictionary;

  return (
    <HydrateClient>
      <NextIntlClientProvider
        messages={messages.Photography.Collection[collectionKey].Item}
      >
        <Container>
          <Content />
        </Container>
      </NextIntlClientProvider>
    </HydrateClient>
  );
}
