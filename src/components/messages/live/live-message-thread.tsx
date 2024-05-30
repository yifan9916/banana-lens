'use client';

import { useRef, useState } from 'react';

import { MessageBubble } from '@/components/messages/bubble/message-bubble';
import { Message } from '@/components/messages/thread/message-thread';
import { useIntersection } from '@/utils/use-intersection/use-intersection';
import { useTimeout } from '@/utils/use-timeout/use-timeout';
import { ChatWrapper } from '@/components/messages/chat-wrapper';
import { Typing } from '@/components/icons';

type Props = {
  messages: Message[];
  messageTime?: number;
};

export const LiveMessageThread = (props: Props) => {
  const { messages, messageTime = 1000 } = props;

  const [isTyping, setIsTyping] = useState(false);
  const [finishedMessages, setFinishedMessages] = useState<Message[]>([]);

  const intersectionRef = useRef<HTMLDivElement>(null);
  const { isIntersecting } = useIntersection(intersectionRef);

  const hasRenderedAllMessages = messages.length === finishedMessages.length;

  useTimeout(
    () => {
      setIsTyping(true);
    },
    750,
    isIntersecting && !hasRenderedAllMessages
  );

  useTimeout(
    () => {
      setFinishedMessages([
        ...finishedMessages,
        messages[finishedMessages.length],
      ]);
      setIsTyping(false);
    },
    messageTime,
    isIntersecting && isTyping && !hasRenderedAllMessages
  );

  return (
    <ChatWrapper ref={intersectionRef}>
      {!!finishedMessages.length &&
        finishedMessages.map((msg, i) => {
          return (
            <MessageBubble key={i} profile={i === finishedMessages.length - 1}>
              {msg.body}
            </MessageBubble>
          );
        })}

      {isTyping && (
        <MessageBubble profile>
          <Typing className="h-8 w-8" />
        </MessageBubble>
      )}
    </ChatWrapper>
  );
};
