'use client';

import Image from 'next/image';
import { useSelectedLayoutSegments } from 'next/navigation';

import { useCollections } from '@/libs/photography/use-collections';
import { Link } from '@/navigation';
import { Arrow } from '@/components/icons';

export const Collections = () => {
  const segments = useSelectedLayoutSegments();

  const collections = useCollections();

  return (
    <section className="mb-20 flex max-w-4xl m-auto w-full h-[400px] sm:h-[80dvh] max-h-[600px]">
      {collections.map((collection) => {
        return (
          <Link
            key={collection.id}
            href={`/photography/${collection.id}`}
            className={[
              'relative flex-1 opacity-50 hover:opacity-100 transition-all duration-1000',
              'after:absolute after:h-full after:w-full after:top-0 after:bg-gradient-to-t after:from-black/50',
              segments[0] === collection.id ? '!opacity-100 !flex-[1.5]' : '',
            ].join(' ')}
          >
            <Image
              src={collection.cover.src.preview}
              alt={collection.name}
              placeholder="blur"
              className="object-cover h-full"
            />

            <Arrow className="absolute h-6 w-6 bottom-0 left-1/2 -translate-x-1/2 text-white/70 z-10 mb-2" />
          </Link>
        );
      })}
    </section>
  );
};
