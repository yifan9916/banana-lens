'use client';

import { useEffect, useState } from 'react';

export const Container = (props: { children: React.ReactNode }) => {
  const { children } = props;
  const FADE_IN_TIME_IN_MS = 1000; // don't forget to keep this in sync with the animation time
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    let animationTimerId: ReturnType<typeof setTimeout>;

    if (isAnimating) {
      animationTimerId = setTimeout(() => {
        setIsAnimating(false);
      }, FADE_IN_TIME_IN_MS);
    }

    return () => {
      if (animationTimerId) {
        clearTimeout(animationTimerId);
      }
    };
  }, [isAnimating]);

  const handleClick: React.ComponentProps<'div'>['onClick'] = (e) => {
    setIsAnimating(true);
  };

  const handleScroll: React.ComponentProps<'div'>['onScroll'] = (e) => {
    setIsAnimating(true);
  };

  return (
    <div
      className={[
        'group z-50 fixed bottom-0 left-0 h-dvh w-dvw overflow-scroll text-white animate-blur-in',
        isAnimating ? 'animating' : '',
      ].join(' ')}
      onClick={handleClick}
      onScroll={handleScroll}
    >
      {children}
    </div>
  );
};
