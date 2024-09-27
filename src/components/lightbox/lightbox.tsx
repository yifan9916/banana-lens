'use client';

import { useParams, useSearchParams } from 'next/navigation';

import { RouteParams } from '@/app/[locale]/types';
import { Slider } from '@/components/slider/slider';
import { useCollection } from '@/libs/photography/collections/use-collection';
import { deleteParamsFromUrl } from '@/utils/url-state/delete-url-params';
import { Cross } from '../icons';

export const LightBox = () => {
  const urlParam = 'lightbox';

  const params = useParams<RouteParams>();
  // https://nextjs.org/docs/app/api-reference/functions/use-router#router-events
  // wrap in <Suspense /> useSearchParams() causes client-side rendering up to the closest Suspense boundary
  const searchParams = useSearchParams();
  const selectedItem = searchParams.get(urlParam);

  const data = useCollection(params.collection);

  if (!selectedItem || !data?.photos.length) return null;

  const initialSlide = data?.photos.findIndex((p) => p.key === selectedItem);

  const handleClose = () => {
    window.history.replaceState(null, '', deleteParamsFromUrl([urlParam]));
  };

  return (
    <div className="flex items-center fixed top-0 left-0 h-svh w-svw bg-white/50 dark:bg-black/50 backdrop-blur-md">
      <Slider
        items={data.photos}
        initialSlide={initialSlide}
        urlParam={urlParam}
      />

      <button
        className="absolute top-0 right-0 p-1 m-6 bg-white/70 text-black rounded-full"
        onClick={handleClose}
      >
        <Cross className="h-5 sm:h-8 w-5 sm:w-8" />
      </button>
    </div>
  );
};
