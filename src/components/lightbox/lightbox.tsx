'use client';

import { useParams, useSearchParams } from 'next/navigation';

import { RouteParams } from '@/app/[locale]/types';
import { useRouter } from '@/navigation';
import { Slider } from '@/components/slider/slider';
import { useCollection } from '@/libs/photography/collections/use-collection';
import { Cross } from '../icons';

export const LightBox = () => {
  const router = useRouter();
  const params = useParams<RouteParams>();
  // https://nextjs.org/docs/app/api-reference/functions/use-router#router-events
  // wrap in <Suspense /> useSearchParams() causes client-side rendering up to the closest Suspense boundary
  const searchParams = useSearchParams();
  const selectedItem = searchParams.get('lightbox');

  const data = useCollection(params.collection);

  if (!selectedItem || !data?.photos.length) return;

  const initialSlide = data?.photos.findIndex((p) => p.key === selectedItem);

  const handleClose = () => {
    router.replace(`/photography/${params.collection}`, { scroll: false });
  };

  return (
    <div className="flex items-center fixed top-0 left-0 h-svh w-svw bg-black/50">
      <Slider items={data.photos} initialSlide={initialSlide} />

      <button
        className="absolute top-0 right-0 p-1 m-4 bg-white/70 text-black rounded-full"
        onClick={handleClose}
      >
        <Cross className="h-8 w-8" />
      </button>
    </div>
  );
};
