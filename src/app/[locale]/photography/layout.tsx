'use client';

import Image from 'next/image';
import { useSelectedLayoutSegments } from 'next/navigation';

import { Link } from '@/navigation';
import { useCollections } from '@/libs/photography/use-collections';
import { Instagram, Tiktok } from '@/components/icons';

type Props = {
  children: React.ReactNode;
};

export default function Layout(props: Props) {
  const { children } = props;
  const segments = useSelectedLayoutSegments();

  const collections = useCollections();

  return (
    <main className="pb-32">
      <h1 className="font-[family-name:var(--font-satisfy)] text-5xl sm:text-[80px] text-center py-2 pt-20 sm:py-4 sm:pt-20">
        Photography
      </h1>

      <p className="flex justify-center max-w-4xl m-auto pb-20 gap-4">
        <Link href="https://www.instagram.com/fanguyyi/">
          <Instagram style={{ height: '40px', width: '40px' }} />
        </Link>
        <Link href="https://www.tiktok.com/@fanguyyi">
          <Tiktok style={{ height: '40px', width: '40px' }} />
        </Link>
      </p>

      <p className="px-10 pb-20 max-w-4xl m-auto">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.{' '}
        <Link href="/photography#description" className="underline">
          more
        </Link>
      </p>

      <section className="mb-20 flex max-w-4xl m-auto w-full h-[400px] sm:h-[80dvh]">
        {collections.map((collection) => {
          return (
            <Link
              key={collection.id}
              href={`/photography/${collection.id}`}
              className={[
                'flex-1 opacity-50 hover:opacity-100',
                segments[0] === collection.id ? '!opacity-100 !flex-[2]' : '',
              ].join(' ')}
            >
              <Image
                src={collection.cover.src.preview}
                alt={collection.title}
                placeholder="blur"
                className="object-cover h-full"
              />
            </Link>
          );
        })}
      </section>

      {children}
    </main>
  );
}
