'use client';

import { forwardRef } from 'react';
import Image from 'next/image';

import { type Reaction, Reactions } from '../reactions/reactions';
import Profile from '@/public/photography/profile.jpg';

type Props = {
  children: React.ReactNode;
  isThread?: boolean;
  reactions?: Reaction[];
  profile?: boolean;
};

export const MessageBubble = forwardRef<HTMLDivElement, Props>(
  (props: Props, ref) => {
    const { children, isThread, profile, reactions } = props;

    return (
      <div
        ref={ref}
        className={[
          'group relative flex flex-row items-end',
          reactions ? 'mb-7' : '',
        ].join(' ')}
      >
        {profile && (
          <div className="absolute -left-9 h-8 w-8 rounded-full overflow-hidden shrink-0 mr-2">
            <Image
              src={Profile}
              alt={'Profile'}
              placeholder="blur"
              className="object-cover"
              quality={1}
            />
          </div>
        )}

        <div className="relative flex">
          <p
            className={[
              'inline-block p-3 text-white bg-sky-600 rounded-e-3xl',
              isThread
                ? '' // left corners of thread messages should not be rounded
                : 'group-first-of-type:rounded-ss-3xl', // can use pseudo class for live message threads which don't have a wrapper
            ].join(' ')}
          >
            {children}
          </p>

          {!!reactions?.length && <Reactions reactions={reactions} />}
        </div>
      </div>
    );
  }
);
