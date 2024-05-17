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
        'fixed h-14 w-14 left-1/2 -translate-x-1/2 z-50 border-2 border-black rounded-full opacity-0 bottom-0 sm:top-0 my-5 bg-gradient-to-tr from-[#00c8c833] backdrop-blur-sm',
        visible ? '!opacity-100' : '',
      ].join(' ')}
      onClick={handleBack}
    ></div>
  );
};
