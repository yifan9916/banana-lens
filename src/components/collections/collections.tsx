'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useSelectedLayoutSegments } from 'next/navigation';

import { Link } from '@/navigation';
import { useIntersection } from '@/utils/use-intersection/use-intersection';
import { CollectionData } from '@/libs/photography/types';

type Props = {
  collections: CollectionData[];
};

export const Collections = (props: Props) => {
  const { collections } = props;
  const segments = useSelectedLayoutSegments();

  const intersectionRef = useRef<HTMLElement>(null);
  const { isIntersecting } = useIntersection(intersectionRef);

  return (
    <section
      ref={intersectionRef}
      className={[
        'group mb-20 flex max-w-4xl m-auto w-full h-[400px] sm:h-[80dvh] max-h-[600px]',
        isIntersecting ? 'intersect' : '',
      ].join(' ')}
    >
      {collections.map((collection, i) => {
        const isFirstItem = i === 0;
        const shouldAnimate = !segments.length && isFirstItem && isIntersecting;

        return (
          <Link
            key={collection.key}
            href={`/photography/${collection.key}`}
            className={[
              'relative flex-1 opacity-50 hover:opacity-100 transition-all duration-1000',
              'after:absolute after:h-full after:w-full after:top-0 after:bg-gradient-to-t after:from-black/50',
              segments[0] === collection.key ? '!opacity-100 !flex-[1.5]' : '',
              shouldAnimate
                ? 'group-[.intersect]:animate-attention-collection'
                : '',
            ].join(' ')}
          >
            <Image
              src={collection.cover}
              alt={collection.key}
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
