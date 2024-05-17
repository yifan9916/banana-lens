'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useSelectedLayoutSegments } from 'next/navigation';

import { useCollections } from '@/libs/photography/use-collections';
import { Link } from '@/navigation';

export const Collections = () => {
  const segments = useSelectedLayoutSegments();
  const observerRef = useRef<IntersectionObserver>();
  const intersectionRef = useRef<HTMLElement | null>(null);
  const [hasIntersected, setHasIntersected] = useState(false);

  const collections = useCollections();

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setHasIntersected(true);
            observerRef.current?.disconnect();
          }
        });
      },
      { threshold: 1 }
    );

    if (intersectionRef.current) {
      observerRef.current?.observe(intersectionRef.current);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  return (
    <section
      ref={intersectionRef}
      className={[
        'group mb-20 flex max-w-4xl m-auto w-full h-[400px] sm:h-[80dvh] max-h-[600px]',
        hasIntersected ? 'intersect' : '',
      ].join(' ')}
    >
      {collections.map((collection, i) => {
        const isFirstItem = i === 0;
        const shouldAnimate = !segments.length && isFirstItem && hasIntersected;

        return (
          <Link
            key={collection.id}
            href={`/photography/${collection.id}`}
            className={[
              'relative flex-1 opacity-50 hover:opacity-100 transition-all duration-1000',
              'after:absolute after:h-full after:w-full after:top-0 after:bg-gradient-to-t after:from-black/50',
              segments[0] === collection.id ? '!opacity-100 !flex-[1.5]' : '',
              shouldAnimate
                ? 'group-[.intersect]:animate-attention-collection'
                : '',
            ].join(' ')}
          >
            <Image
              src={collection.cover}
              alt={collection.name}
              placeholder="blur"
              className="object-cover h-full"
            />

            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 mb-4">
              <div className="absolute h-full w-full rounded-full border-2 border-white/70 group-[.intersect]:animate-[ping_1s_cubic-bezier(0,0,0.2,1)_2.5s_3_forwards]"></div>
              <div className="relative rounded-full border-2 h-6 w-6 border-white/70"></div>
            </div>
          </Link>
        );
      })}
    </section>
  );
};
