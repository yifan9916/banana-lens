'use client';

import { useParams } from 'next/navigation';

import { PhotoCard } from './photo-card';
import { useCollection } from '@/libs/photography/collections/use-collection';

import type { RouteParams } from '@/app/[locale]/types';

export const PhotoList = () => {
  const params = useParams<RouteParams>();
  const data = useCollection(params.collection);

  if (!data?.photos) return null;

  return (
    <ul className="grid grid-cols-2 p-2 gap-2 sm:grid-cols-4">
      {data.photos.map((photo) => {
        return <PhotoCard key={photo.key} photo={photo} />;
      })}
    </ul>
  );
};
