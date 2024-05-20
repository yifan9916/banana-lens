'use client';

import { useEffect, useState } from 'react';

import { usePathname, useRouter } from '@/navigation';
import { useTimeout } from '@/utils/use-timeout/use-timeout';

export const Container = (props: { children: React.ReactNode }) => {
  const FADE_IN_TIME_IN_MS = 1000; // don't forget to keep this in sync with the animation time

  const { children } = props;
  const pathname = usePathname();
  const router = useRouter();
  const [isAnimating, setIsAnimating] = useState(false);

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
    <div
      className={[
        'group z-40 fixed bottom-0 left-0 h-dvh w-dvw overflow-scroll text-white animate-blur-in',
        isAnimating ? 'animating' : '',
      ].join(' ')}
      onClick={handleClick}
      onScroll={handleScroll}
    >
      {children}
    </div>
  );
};
