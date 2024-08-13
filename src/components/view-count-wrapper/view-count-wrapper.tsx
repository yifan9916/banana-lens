'use client';

import { useEffect } from 'react';

import { trpc } from '@/libs/trpc/react';
import { usePhoto } from '@/libs/photography/photos/use-photo';
import { useLocalStorage } from '@/utils/local-storage/use-local-storage';

import type { PhotoOutput } from '@/libs/photography/types';

type Props = {
  children: React.ReactNode;
  photoKey: string;
  viewTimeout?: number;
};

export const ViewCountWrapper = (props: Props) => {
  const { children, photoKey, viewTimeout } = props;

  const photo = usePhoto(photoKey);

  const [localViews, saveLocalViews] = useLocalStorage('banana-lens-views', {});

  useEffect(() => {
    if (!photo) return;

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
    }, viewTimeout ?? 1000);

    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, []);

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
      saveLocalViews({
        ...localViews,
        [photo.key]: 'seen',
      });

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

  return <>{children}</>;
};
