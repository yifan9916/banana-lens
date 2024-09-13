'use client';

import { Suspense } from 'react';

import { PhotoList } from './photo-list/photo-list';
import { CreatePhoto } from './create/create-photo';

export default function Page() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="p-10">
        <h1 className="text-4xl">Banana Lens</h1>
      </div>

      <Suspense>
        <CreatePhoto />
      </Suspense>

      <PhotoList />
    </div>
  );
}
