'use client';

import { useSelectedLayoutSegments } from 'next/navigation';

import { ImageList } from '@/components/image-list/image-list';
import { previewImages } from '@/images';

type Props = {
  children?: React.ReactNode;
};

export default function Layout(props: Props) {
  const { children } = props;

  const segments = useSelectedLayoutSegments();

  return (
    <>
      <ImageList list={previewImages} />

      {!!segments.length && (
        <div className="flex justify-center fixed bottom-0 left-0 h-dvh bg-black/80 dark:bg-black/50 backdrop-blur-md overflow-scroll items-end w-dvw p-2 sm:p-0">
          {children}
        </div>
      )}
    </>
  );
}
