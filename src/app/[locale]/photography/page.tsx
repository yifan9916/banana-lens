import { useTranslations } from 'next-intl';

import { LiveMessageThread } from '@/components/messages/live/live-message-thread';
import {
  MessageThread,
  type Message,
} from '@/components/messages/thread/message-thread';
import { ChatWrapper } from '@/components/messages/chat-wrapper';

export default function Page() {
  const dict = useTranslations('Photography.body');

  const one: Message[] = [
    { body: dict('01') },
    { body: dict('02') },
    { body: dict('03') },
  ];

  const two: Message[] = [
    { body: dict('04') },
    { body: dict('05') },
    { body: dict('06') },
    { body: dict('07') },
  ];

  return (
    <div id="description" className="px-10 max-w-2xl m-auto">
      <ChatWrapper>
        <MessageThread messages={one} />
        <LiveMessageThread messages={two} />
      </ChatWrapper>
    </div>
  );
}
