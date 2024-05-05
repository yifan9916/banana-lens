'use client';

import Image from 'next/image';
import { useSelectedLayoutSegments } from 'next/navigation';

import { TODO_Image } from '@/images';
import { Link } from '@/navigation';

type Props = {
  children?: React.ReactNode;
  list: TODO_Image[];
};

export const ImageList = (props: Props) => {
  const { children, list } = props;
  const segments = useSelectedLayoutSegments();

  return (
    <div className="relative">
      <ul className="grid grid-cols-2 p-3 gap-2 sm:grid-cols-4">
        {list.map((img) => {
          return (
            <li key={img.name} className="rounded-2xl overflow-hidden">
              {/* <Link key={img.name} href={`/photography/${img.name}.jpg`}> */}
              <Image
                src={img.src}
                alt={img.name}
                placeholder="blur"
                quality={1}
              />
              <div className="text-xs font-light p-2">{img.name}</div>
              {/* </Link> */}
            </li>
          );
        })}
      </ul>

      {!!segments.length && (
        <div className="flex justify-center fixed bottom-0 left-0 h-dvh bg-black/80 dark:bg-black/50 backdrop-blur-md overflow-scroll items-end w-dvw p-5 sm:p-0">
          {children}
        </div>
      )}
    </div>
  );
};
