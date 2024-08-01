import { getTranslations } from 'next-intl/server';

import { Link } from '@/navigation';
import { Instagram, Tiktok } from '@/components/icons';
import { Collections } from '@/components/collections/collections';
import {
  type Message,
  MessageThread,
} from '@/components/messages/thread/message-thread';
import { getCollections } from '@/libs/photography/get-collections';

type Props = {
  children: React.ReactNode;
};

export default async function Layout(props: Props) {
  const { children } = props;

  const dict = await getTranslations('Photography');
  const collections = await getCollections();

  const messages: Message[] = [
    { body: dict('introduction.01') },
    {
      body: dict.rich('introduction.02', {
        more: (chunks) => (
          <Link
            href="/photography#description"
            className="font-semibold text-nowrap text-sky-950"
          >
            {chunks}
          </Link>
        ),
      }),
    },
  ];

  return (
    <main>
      <h1 className="font-[family-name:var(--font-satisfy)] text-6xl sm:text-8xl text-center py-2 pt-20 sm:py-4 sm:pt-20">
        {dict('title')}
      </h1>

      <p className="flex justify-center max-w-2xl m-auto pt-4 pb-20 gap-4">
        <Link href="https://www.instagram.com/bananalens88/">
          <Instagram className="h-8 w-8" />
        </Link>
        <Link href="https://www.tiktok.com/@bananalens">
          <Tiktok className="h-8 w-8" />
        </Link>
      </p>

      <div className="px-4 sm:px-10 mb-20 max-w-2xl m-auto">
        <MessageThread messages={messages} />
      </div>

      <Collections collections={collections} />

      {children}
    </main>
  );
}
