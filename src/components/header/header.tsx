'use client';

import { Link, useRouter } from '@/navigation';
import { useEffect, useRef, useState } from 'react';

import { useTimeout } from '@/utils/use-timeout/use-timeout';
import { CameraLens } from '../icons';

export const Header = () => {
  const observerRef = useRef<IntersectionObserver>();
  const intersectionRef = useRef<HTMLElement | null>(null);
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

      {isSmartNav && <SmartNav />}
    </>
  );
};

const SmartNav = () => {
  const router = useRouter();
  const navRef = useRef<HTMLDivElement | null>(null);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let wait = false;
    let throttleId: ReturnType<typeof setTimeout>;

    const onScroll = () => {
      if (wait) return;

      setIsActive(true);
      wait = true;

      throttleId = setTimeout(() => {
        wait = false;
      }, 5000);
    };

    window.addEventListener('scroll', onScroll, true);

    return () => {
      clearTimeout(throttleId);
      window.removeEventListener('scroll', onScroll, true);
    };
  }, []);

  useTimeout(() => setIsActive(false), 1000, isActive);

  const handleBack = () => {
    router.back();
  };

  return (
    <div
      ref={navRef}
      className={[
        isActive ? 'animate-fade-in' : '',
        'font-[family-name:var(--font-satisfy)] fixed h-16 w-16 left-1/2 -translate-x-1/2 z-50 flex justify-center items-center rounded-full bottom-0 my-5 opacity-0 animate-fade-out',
        'before:absolute before:h-[120%] before:w-[120%] before:rounded-full before:bg-white/80 before:-z-10 before:backdrop-blur-md',
        'after:absolute after:h-[110%] after:w-[110%] after:border-2 after:border-black/80 after:rounded-full',
      ].join(' ')}
      onClick={handleBack}
    >
      <div className="absolute h-[135%] w-[135%]">
        <CameraLens className="h-full w-full text-[#fafafae0]" />
      </div>
      <div className="text-nowrap text-xs text-black">Banana Lens</div>
    </div>
  );
};
