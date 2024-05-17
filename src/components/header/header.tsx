'use client';

import { Link, useRouter } from '@/navigation';
import { useEffect, useRef, useState } from 'react';

export const Header = () => {
  const observerRef = useRef<IntersectionObserver>();
  const intersectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
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

      <Logo visible={isVisible} />
    </>
  );
};

const Logo = (props: { visible: boolean }) => {
  const { visible } = props;
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div
      className={[
        'font-[family-name:var(--font-satisfy)] fixed h-16 w-16 left-1/2 -translate-x-1/2 z-50 flex justify-center items-center dark:border-white rounded-full opacity-0 bottom-0 sm:top-0 my-5 backdrop-blur-sm',
        visible ? '!opacity-100' : '',
      ].join(' ')}
      style={{
        background:
          'linear-gradient(to bottom left, #00c8c833, transparent), linear-gradient(to top right, #0000c833, transparent);',
      }}
      onClick={handleBack}
    >
      <div className="absolute h-full w-full border-2 rounded-full mix-blend-color-burn"></div>

      <div className="text-nowrap pointer-events-none text-xs text-white mix-blend-overlay">
        Banana Lens
      </div>
    </div>
  );
};
