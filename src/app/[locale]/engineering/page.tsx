import Link from 'next/link';
import { useTranslations } from 'next-intl';

import {
  type Message,
  MessageThread,
} from '@/components/messages/thread/message-thread';
import { LiveMessageThread } from '@/components/messages/live/live-message-thread';
import { Github } from '@/components/icons';

export default function Page() {
  const dict = useTranslations('Engineering.messages');

  const intro: Message[] = [
    { body: dict('intro.01') },
    { body: dict('intro.02') },
    { body: dict('intro.03') },
  ];

  const current: Message[] = [
    { body: dict('current.01') },
    { body: dict('current.02') },
    { body: dict('current.03') },
    { body: dict('current.04') },
    { body: dict('current.05') },
    { body: dict('current.06') },
  ];

  const background: Message[] = [
    { body: dict('background.01') },
    { body: dict('background.02') },
    { body: dict('background.03') },
    { body: dict('background.04') },
    { body: dict('background.05') },
    { body: dict('background.06') },
    { body: dict('background.07') },
  ];

  const professional: Message[] = [
    { body: dict('professional.01') },
    { body: dict('professional.02') },
    { body: dict('professional.03') },
    { body: dict('professional.04') },
    { body: dict('professional.05') },
    { body: dict('professional.06') },
    { body: dict('professional.07') },
    { body: dict('professional.08') },
  ];

  const tools: Message[] = [
    { body: dict('tools.01') },
    { body: dict('tools.02') },
  ];

  const outro: Message[] = [
    { body: dict('outro.01') },
    { body: dict('outro.02') },
    { body: dict('outro.03') },
  ];

  return (
    <main className="p-4 pb-32 max-w-2xl m-auto">
      <h1 className="font-[family-name:var(--font-satisfy)] text-6xl sm:text-8xl text-center py-2 pt-20 sm:py-4 sm:pt-20">
        Engineering
      </h1>

      <p className="flex justify-center pt-4 pb-20">
        <Link href="https://github.com/yifan9916">
          <Github className="h-8 w-8" />
        </Link>
      </p>

      <MessageThread messages={intro} />
      <MessageThread messages={current} collapse />
      <MessageThread messages={background} collapse />
      <MessageThread messages={professional} collapse />
      <MessageThread messages={tools} />

      <LiveMessageThread messages={outro} />
    </main>
  );
}
