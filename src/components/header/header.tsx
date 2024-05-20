'use client';

import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import { Link, useRouter } from '@/navigation';
import { CameraLens } from '../icons';

export const Header = () => {
  const observerRef = useRef<IntersectionObserver>();
  const intersectionRef = useRef<HTMLElement | null>(null);
  const searchParams = useSearchParams();
  const [isSmartNav, setIsSmartNav] = useState(false);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          setIsSmartNav(false);
        } else {
          setIsSmartNav(true);
        }
      });
    });

    if (intersectionRef.current) {
      observerRef.current?.observe(intersectionRef.current);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  return (
    <>
      <header ref={intersectionRef} className="flex justify-center p-4 sm:p-12">
        <Link
          href="/"
          className="font-[family-name:var(--font-satisfy)] text-2xl"
        >
          Banana Lens
        </Link>
      </header>

      {(searchParams.get('loupe') || isSmartNav) && <SmartNav />}
    </>
  );
};

const SmartNav = () => {
  const VISIBILITY_TIMER_IN_MS = 5000;
  const SCROLL_THROTTLE_TIMER_IN_MS = 1000;

  const router = useRouter();
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let wait = false;
    let throttleId: ReturnType<typeof setTimeout>;
    let visibleTimerId: ReturnType<typeof setTimeout>;

    const onInteraction = () => {
      if (wait) return;

      setIsActive(true);

      clearTimeout(visibleTimerId);
      visibleTimerId = setTimeout(() => {
        setIsActive(false);
      }, VISIBILITY_TIMER_IN_MS);

      wait = true;

      throttleId = setTimeout(() => {
        wait = false;
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
        'fixed h-14 w-14 left-1/2 -translate-x-1/2 z-50 flex justify-center items-center rounded-full bottom-0 my-8 transition-opacity sm:top-0',
        'before:absolute before:h-[120%] before:w-[120%] before:rounded-full before:bg-white/80 before:-z-10 before:backdrop-blur-md',
        'after:absolute after:h-[110%] after:w-[110%] after:border-2 after:border-black/80 after:rounded-full',
        isActive ? 'opacity-100' : 'opacity-0',
      ].join(' ')}
      onClick={handleClick}
    >
      <div className="absolute h-[135%] w-[135%]">
        <CameraLens className="h-full w-full text-[#fafafae0]" />
      </div>

      <div className="font-[family-name:var(--font-satisfy)] text-nowrap text-xs text-black">
        Banana Lens
      </div>
    </div>
  );
};
