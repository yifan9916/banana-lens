'use client';

import { useState } from 'react';

import type { Props as ParentProps } from './message-thread';
import { MessageBubble } from '../bubble/message-bubble';

type Props = ParentProps & {
  labels: {
    view: string;
    hide: string;
  };
};

export const MessageThreadList = (props: Props) => {
  const { labels, messages, collapse } = props;
  const [isCollapsed, setIsCollapsed] = useState(collapse);
  const [first, ...rest] = messages;

  const handleClick: React.ComponentProps<'button'>['onClick'] = (e) => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      <MessageBubble
        reactions={first.reactions}
        profile={messages.length === 1 || isCollapsed}
      >
        {first.body}
      </MessageBubble>

      {!isCollapsed &&
        rest.map((m, i) => {
          return (
            <MessageBubble
              key={i}
              reactions={m.reactions}
              profile={i === messages.length - 2}
            >
              {m.body}
            </MessageBubble>
          );
        })}

      {collapse && (
        <button className="text-slate-500" onClick={handleClick}>
          — {isCollapsed ? labels.view : labels.hide}
        </button>
      )}
    </>
  );
};
