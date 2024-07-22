import { useTranslations } from 'next-intl';

import { Link } from '@/navigation';
import { MessageThread } from '@/components/messages/thread/message-thread';
import { LiveMessageThread } from '@/components/messages/live/live-message-thread';
import { Arrow } from '@/components/icons';
import { Contact } from '@/components/contact/contact';

export default function Index() {
  const dict = useTranslations('Home');

  return (
    <div className="p-2 pt-20 sm:py-40">
      <div className="max-w-xl mb-8 mx-8 sm:mx-auto">
        <h1 className="font-[family-name:var(--font-satisfy)] text-3xl sm:text-4xl mb-14 sm:mb-16">
          {dict('introduction.01')}
        </h1>
      </div>

      <div className="px-4 sm:px-10 max-w-2xl m-auto">
        <MessageThread
          messages={[
            {
              body: (
                <Link href={'/engineering'} scroll={false}>
                  {dict.rich('introduction.02', {
                    nav: (chunks) => (
                      <span className="font-semibold text-nowrap text-sky-950 underline">
                        {chunks}
                      </span>
                    ),
                  })}

                  <Arrow className="inline-block rotate-90 h-5 w-5" />
                </Link>
              ),
            },
            {
              body: (
                <Link href={'/photography'} scroll={false}>
                  {dict.rich('introduction.03', {
                    nav: (chunks) => (
                      <span className="font-semibold text-nowrap text-sky-950 underline">
                        {chunks}
                      </span>
                    ),
                  })}

                  <Arrow className="inline-block rotate-90 h-5 w-5" />
                </Link>
              ),
            },
          ]}
        />

        <LiveMessageThread
          messages={[
            { body: dict('introduction.04') },
            { body: dict('introduction.05') },
            { body: dict('introduction.06') },
          ]}
        />

        <Contact />
      </div>
    </div>
  );
}
