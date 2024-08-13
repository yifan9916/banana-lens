'use client';

import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import { Link } from '@/navigation';
import { SmartNav } from './smart-nav';

export const Header = () => {
  const observerRef = useRef<IntersectionObserver>();
  const intersectionRef = useRef<HTMLElement | null>(null);
  // https://nextjs.org/docs/app/api-reference/functions/use-router#router-events
  // wrap in <Suspense /> useSearchParams() causes client-side rendering up to the closest Suspense boundary
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
