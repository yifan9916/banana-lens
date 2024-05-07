'use client';

import { useSelectedLayoutSegments } from 'next/navigation';
import Image from 'next/image';

import { Instagram, Tiktok } from '@/components/icons';
import { previewImages } from '@/images';
import { Link } from '@/navigation';

type Props = {
  children?: React.ReactNode;
};

const collections = [
  {
    src: previewImages[0].src,
    name: 'chongqing',
  },
  {
    src: previewImages[1].src,
    name: 'europe',
  },
  {
    src: previewImages[2].src,
    name: 'other',
  },
];

export default function Layout(props: Props) {
  const { children } = props;
  const segments = useSelectedLayoutSegments();

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
              key={collection.name}
              href={`/photography/${collection.name}`}
              className={[
                'flex-1 opacity-50 hover:opacity-100',
                segments[0] === collection.name ? '!opacity-100 !flex-[2]' : '',
              ].join(' ')}
            >
              <Image
                src={collection.src}
                alt={collection.name}
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
