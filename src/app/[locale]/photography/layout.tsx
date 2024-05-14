'use client';

import Image from 'next/image';
import { useSelectedLayoutSegments } from 'next/navigation';

import { Link } from '@/navigation';
import { useCollections } from '@/libs/photography/use-collections';
import { Arrow, Instagram, Tiktok } from '@/components/icons';

type Props = {
  children: React.ReactNode;
};

export default function Layout(props: Props) {
  const { children } = props;
  const segments = useSelectedLayoutSegments();

  const collections = useCollections();

  return (
    <main>
      <h1 className="font-[family-name:var(--font-satisfy)] text-5xl sm:text-[80px] text-center py-2 pt-20 sm:py-4 sm:pt-20">
        Photography
      </h1>

      <p className="flex justify-center max-w-4xl m-auto pt-4 pb-20 gap-4">
        <Link href="https://www.instagram.com/fanguyyi/">
          <Instagram className="h-8 w-8" />
        </Link>
        <Link href="https://www.tiktok.com/@fanguyyi">
          <Tiktok className="h-8 w-8" />
        </Link>
      </p>

      <p className="px-10 pb-20 max-w-4xl m-auto">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.{' '}
        <Link href="/photography#description" className="underline">
          more
        </Link>
      </p>

      <section className="mb-20 flex max-w-4xl m-auto w-full h-[400px] sm:h-[80dvh] max-h-[600px]">
        {collections.map((collection) => {
          return (
            <Link
              key={collection.id}
              href={`/photography/${collection.id}`}
              scroll={false}
              className={[
                'relative flex-1 opacity-50 hover:opacity-100 transition-all duration-1000',
                'after:absolute after:h-full after:w-full after:top-0 after:bg-gradient-to-t after:from-black/50',
                segments[0] === collection.id ? '!opacity-100 !flex-[1.5]' : '',
              ].join(' ')}
            >
              <Image
                src={collection.cover.src.preview}
                alt={collection.title}
                placeholder="blur"
                className="object-cover h-full"
              />

              <Arrow className="absolute h-6 w-6 bottom-0 left-1/2 -translate-x-1/2 text-white/70 z-10 mb-2" />
            </Link>
          );
        })}
      </section>

      {children}
    </main>
  );
}
