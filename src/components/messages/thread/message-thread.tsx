import { useTranslations } from 'next-intl';

import type { Reaction } from '../reactions/reactions';
import { MessageThreadList } from './message-thread-list';
import { ChatWrapper } from '../chat-wrapper';

export type Message = {
  body: React.ReactNode;
  reactions?: Reaction[];
};

export type Props = {
  messages: Message[];
  collapse?: boolean;
};

// wrapper to keep translations server-side
export const MessageThread = (props: Props) => {
  const dict = useTranslations('general');

  return (
    <ChatWrapper>
      <MessageThreadList
        {...props}
        labels={{
          view: dict('view_messages', { count: props.messages.length - 1 }),
          hide: dict('hide_messages', { count: props.messages.length - 1 }),
        }}
      />
    </ChatWrapper>
  );
};
