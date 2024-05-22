import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import { usePathname, useRouter } from '@/navigation';
import { Arrow, CameraLens } from '../icons';

export const SmartNav = () => {
  const router = useRouter();

  const { hasInteracted } = useInteractionEvent();
  const { hasNavigated } = useNavigationEvent();

  const handleClick = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  return (
    <div
      className={[
        'cursor-pointer group fixed h-14 w-14 left-1/2 -translate-x-1/2 z-50 flex justify-center items-center rounded-full bottom-0 my-8 transition-opacity sm:top-0 hover:opacity-100',
        'before:absolute before:h-[120%] before:w-[120%] before:rounded-full before:bg-white/80 before:-z-10 before:backdrop-blur-md',
        'after:absolute after:h-[110%] after:w-[110%] after:border-2 after:border-black/80 after:rounded-full',
        hasInteracted ? 'opacity-100' : 'opacity-0',
      ].join(' ')}
      onClick={handleClick}
    >
      <div className="absolute h-[135%] w-[135%]">
        <CameraLens className="h-full w-full text-[#fafafae0]" />
      </div>

      <div
        className={[
          'font-[family-name:var(--font-satisfy)] text-nowrap text-xs text-black group-hover:opacity-0 transition-opacity',
          hasNavigated ? 'opacity-0' : 'opacity-100',
          'min-w-16 text-center', // text-nowrap is unsupported in safari???
        ].join(' ')}
      >
        Banana Lens
      </div>

      <div
        className={[
          'absolute h-full w-full flex justify-center items-center group-hover:opacity-100 transition-opacity',
          hasNavigated ? 'opacity-100' : 'opacity-0',
        ].join(' ')}
      >
        <Arrow className="-rotate-90 h-7 w-7" />
      </div>
    </div>
  );
};

const useInteractionEvent = () => {
  const VISIBILITY_TIMER_IN_MS = 5000;
  const SCROLL_THROTTLE_TIMER_IN_MS = 1000;

  const [hasInteracted, setHasInteracted] = useState(true);

  useEffect(() => {
    let throttle = false;
    let throttleId: ReturnType<typeof setTimeout>;
    let visibleTimerId: ReturnType<typeof setTimeout>;

    const onInteraction = () => {
      if (throttle) return;

      setHasInteracted(true);

      clearTimeout(visibleTimerId);
      visibleTimerId = setTimeout(() => {
        setHasInteracted(false);
      }, VISIBILITY_TIMER_IN_MS);

      throttle = true;

      throttleId = setTimeout(() => {
        throttle = false;
      }, SCROLL_THROTTLE_TIMER_IN_MS);
    };

    window.addEventListener('scroll', onInteraction, true);
    window.addEventListener('click', onInteraction, true);

    return () => {
      clearTimeout(throttleId);
      clearTimeout(visibleTimerId);

      window.removeEventListener('scroll', onInteraction, true);
      window.removeEventListener('click', onInteraction, true);
    };
  }, []);

  return { hasInteracted };
};

const useNavigationEvent = () => {
  const RECENT_NAVIGATION_TIMER_IN_MS = 1500;

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isMounted, setIsMounted] = useState(false);
  const [hasNavigated, setHasNavigated] = useState(false);

  let navigationTimerId: ReturnType<typeof setTimeout>;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    setHasNavigated(true);

    clearTimeout(navigationTimerId);
    navigationTimerId = setTimeout(() => {
      setHasNavigated(false);
    }, RECENT_NAVIGATION_TIMER_IN_MS);

    return () => {
      clearTimeout(navigationTimerId);
    };
  }, [pathname, searchParams]);

  return { hasNavigated };
};
