'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import { usePathname, useRouter } from '@/navigation';
import { trpc } from '@/libs/trpc/react';
import { usePhoto } from '@/libs/photography/photos/use-photo';
import { useTimeout } from '@/utils/use-timeout/use-timeout';
import { useLocalStorage } from '@/utils/local-storage/use-local-storage';

import type { RouteParams } from '@/app/[locale]/types';
import type { PhotoOutput } from '@/libs/photography/types';

type Props = {
  children: React.ReactNode;
};

export const Container = (props: Props) => {
  const FADE_IN_TIME_IN_MS = 1000; // don't forget to keep this in sync with the animation time

  const { children } = props;

  const [isAnimating, setIsAnimating] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams<RouteParams>();

  const photo = usePhoto(params.item);

  const [localViews, saveLocalViews] = useLocalStorage('banana-lens-views', {});

  useEffect(() => {
    if (!photo) return;

    router.replace(`${pathname}?loupe=true`);

    let timerId: ReturnType<typeof setTimeout>;

    timerId = setTimeout(() => {
      if (!localViews[photo.key]) {
        mutation.mutate({
          key: photo.key,
          data: {
            views: photo.views + 1,
          },
        });
      }
    }, 1500);

    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, []);

  useTimeout(() => setIsAnimating(false), FADE_IN_TIME_IN_MS, isAnimating);

  if (!photo) return;

  const utils = trpc.useUtils();
  const mutation = trpc.photos.updatePhoto.useMutation({
    onMutate: async (newData) => {
      await utils.photos.getPhoto.cancel({ key: photo.key });

      const prevData = utils.photos.getPhoto.getData({ key: photo.key });

      if (!prevData?.photo) return;

      utils.photos.getPhoto.setData(
        {
          key: newData.key,
        },
        {
          photo: {
            ...prevData.photo,
            key: newData.key,
            views: newData.data.views,
          },
        }
      );

      updateCollectionPhotoViews(prevData.photo, newData.data.views);

      return { prevData };
    },
    onError: (error, newData, ctx) => {
      if (!ctx?.prevData) return;

      utils.photos.getPhoto.setData(
        {
          key: photo.key,
        },
        ctx.prevData
      );

      if (!ctx.prevData.photo) return;

      updateCollectionPhotoViews(ctx.prevData.photo, ctx.prevData.photo.views);
    },
    onSuccess: () => {
      saveLocalViews({ ...localViews, [photo.key]: 'seen' });

      utils.photos.getPhoto.invalidate({
        key: photo.key,
      });
      utils.collections.getCollection.invalidate({
        key: photo.collection,
      });
    },
  });

  // helper function for updating view count for a photo in a collection
  const updateCollectionPhotoViews = (photo: PhotoOutput, views: number) => {
    const collectionKey = photo?.photosToCollections[0].collection.key;

    if (collectionKey) {
      utils.collections.getCollection.setData(
        {
          key: collectionKey,
        },
        (old) => {
          if (!old?.collection) return;

          const updatedPhoto = old.collection.photosToCollections.map((p) => {
            if (p.photoId !== photo.id) return p;

            return {
              photoId: p.photoId,
              collectionId: p.collectionId,
              photo: {
                ...p.photo,
                views,
              },
            };
          });

          const updatedCollection = {
            collection: {
              ...old.collection,
              photosToCollections: updatedPhoto,
            },
          };

          return updatedCollection;
        }
      );
    }
  };

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
