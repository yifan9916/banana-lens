'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import { usePathname, useRouter } from '@/navigation';
import { trpc } from '@/libs/trpc/react';
import { usePhoto } from '@/libs/photography/use-photo';
import { useTimeout } from '@/utils/use-timeout/use-timeout';

type Props = {
  children: React.ReactNode;
};

export const Container = (props: Props) => {
  const FADE_IN_TIME_IN_MS = 1000; // don't forget to keep this in sync with the animation time

  const { children } = props;

  const params = useParams<{ collection: string; item: string }>();
  const photo = usePhoto(params.item);

  if (!photo) return;

  const pathname = usePathname();
  const router = useRouter();
  const [isAnimating, setIsAnimating] = useState(false);

  const utils = trpc.useUtils();
  const mutation = trpc.photos.updatePhoto.useMutation({
    onSuccess: () => {
      utils.photos.getPhoto.invalidate({ key: photo.key });
    },
  });

  useEffect(() => {
    router.replace(`${pathname}?loupe=true`);

    let timerId: ReturnType<typeof setTimeout>;

    timerId = setTimeout(() => {
      if (photo.views !== undefined) {
        mutation.mutate({
          key: photo.key,
          data: { views: photo.views + 1 },
        });
      }
    }, 1000);

    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, []);

  useTimeout(() => setIsAnimating(false), FADE_IN_TIME_IN_MS, isAnimating);

  const handleClick: React.ComponentProps<'div'>['onClick'] = (e) => {
    setIsAnimating(true);
  };

  const handleScroll: React.ComponentProps<'div'>['onScroll'] = (e) => {
    setIsAnimating(true);
  };

  return (
    <div
      className={[
        'group z-40 fixed bottom-0 left-0 h-dvh w-dvw overflow-scroll text-white animate-blur-in pb-28',
        isAnimating ? 'animating' : '',
      ].join(' ')}
      onClick={handleClick}
      onScroll={handleScroll}
    >
      {children}
    </div>
  );
};
