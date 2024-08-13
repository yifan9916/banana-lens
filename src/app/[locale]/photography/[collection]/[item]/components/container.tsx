'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import { usePathname, useRouter } from '@/navigation';
import { useTimeout } from '@/utils/use-timeout/use-timeout';
import { ViewCountWrapper } from '@/components/view-count-wrapper/view-count-wrapper';

import type { RouteParams } from '@/app/[locale]/types';

type Props = {
  children: React.ReactNode;
};

export const Container = (props: Props) => {
  const FADE_IN_TIME_IN_MS = 1000; // don't forget to keep this in sync with the animation time
  const SET_VIEW_TIME_IN_MS = FADE_IN_TIME_IN_MS + 500;

  const { children } = props;

  const [isAnimating, setIsAnimating] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams<RouteParams>();

  useEffect(() => {
    router.replace(`${pathname}?loupe=true`);
  }, []);

  useTimeout(() => setIsAnimating(false), FADE_IN_TIME_IN_MS, isAnimating);

  const handleClick: React.ComponentProps<'div'>['onClick'] = (e) => {
    setIsAnimating(true);
  };

  const handleScroll: React.ComponentProps<'div'>['onScroll'] = (e) => {
    setIsAnimating(true);
  };

  return (
    <ViewCountWrapper photoKey={params.item} viewTimeout={SET_VIEW_TIME_IN_MS}>
      <div
        className={[
          'group z-40 fixed bottom-0 left-0 h-dvh w-dvw overflow-scroll text-white animate-blur-in pb-28',
          isAnimating ? 'animating' : '',
        ].join(' ')}
        onClick={handleClick}
        onScroll={handleScroll}
      >
        {children}
      </div>
    </ViewCountWrapper>
  );
};
