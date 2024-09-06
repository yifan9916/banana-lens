'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import { usePathname, useRouter } from '@/i18n/routing';
import { usePhoto } from '@/libs/photography/photos/use-photo';
import { useTimeout } from '@/utils/use-timeout/use-timeout';
import { useIncrementViews } from '@/utils/use-increment-views/use-increment-views';

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

  const photo = usePhoto(params.item);
  useIncrementViews(photo, SET_VIEW_TIME_IN_MS);

  if (!photo) return null;

  const handleClick: React.ComponentProps<'div'>['onClick'] = (e) => {
    setIsAnimating(true);
  };

  const handleScroll: React.ComponentProps<'div'>['onScroll'] = (e) => {
    setIsAnimating(true);
  };

  return (
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
  );
};
