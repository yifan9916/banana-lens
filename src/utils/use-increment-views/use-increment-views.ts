import { useEffect } from 'react';

import { trpc } from '@/libs/trpc/react';
import { useLocalStorage } from '@/utils/local-storage/use-local-storage';
import { processPhoto } from '@/libs/photography/photos/process-photo';
import { processCollection } from '@/libs/photography/collections/process-collection';

import type { Photograph } from '@/libs/photography/types';

export const useIncrementViews = (
  photo: Photograph | undefined,
  viewTimeout?: number
) => {
  const [localViews, saveLocalViews] = useLocalStorage('banana-lens-views', {});

  useEffect(() => {
    if (!photo) return;

    let timerId: ReturnType<typeof setTimeout>;

    timerId = setTimeout(() => {
      if (!localViews[photo.key]) {
        mutation.mutate({
          key: photo.key,
          collection: photo.collection?.key,
          data: {
            status: photo.status,
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
  }, [photo?.key]);

  const utils = trpc.useUtils();

  const mutation = trpc.photos.updatePhoto.useMutation({
    onMutate: async (input) => {
      await utils.photos.getPhoto.cancel({ key: input.key });

      if (input.collection) {
        // update views count in getCollection cache
        const prevCollectionData = utils.collections.getCollection.getData({
          key: input.collection,
        });

        if (!prevCollectionData?.collection) return;

        const collectionPhoto = processCollection(
          prevCollectionData.collection
        );

        const photo = collectionPhoto.photos.find((p) => p.key === input.key);

        if (!photo) return;

        updateCollectionPhotoViews(photo, input.data.views || photo.views);
      }

      // update views count in getPhoto cache
      const prevData = utils.photos.getPhoto.getData({ key: input.key });

      if (!prevData?.photo) return;

      utils.photos.getPhoto.setData(
        {
          key: input.key,
        },
        {
          photo: {
            ...prevData.photo,
            key: input.key,
            views: input.data.views || prevData.photo.views,
          },
        }
      );

      return { prevData };
    },
    onError: (error, input, ctx) => {
      if (!ctx?.prevData) return;

      utils.photos.getPhoto.setData(
        {
          key: input.key,
        },
        ctx.prevData
      );

      if (!ctx.prevData.photo) return;

      const prevPhoto = processPhoto(ctx.prevData.photo);

      updateCollectionPhotoViews(prevPhoto, ctx.prevData.photo.views);
    },
    onSuccess: (res, input, ctx) => {
      saveLocalViews({
        ...localViews,
        [input.key]: 'seen',
      });

      utils.photos.getPhoto.invalidate({
        key: input.key,
      });
      utils.collections.getCollection.invalidate({
        key: ctx.prevData.photo?.photosToCollections[0].collection.key,
      });
    },
  });

  // helper function for updating view count for a photo in a collection
  const updateCollectionPhotoViews = (photo: Photograph, views: number) => {
    const collectionKey = photo.collection?.key;

    if (collectionKey) {
      utils.collections.getCollection.setData(
        {
          key: collectionKey,
        },
        (old) => {
          if (!old?.collection) return;

          const updatedPhotos = old.collection.photosToCollections.map((p) => {
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
              photosToCollections: updatedPhotos,
            },
          };

          return updatedCollection;
        }
      );
    }
  };
};
