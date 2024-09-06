'use client';

import { FormProvider } from './form/form-context';
import { CreatePhotoForm } from './form/create-photo-form';
import { MultiStepProvider } from './multi-step-context';
import { Suspense } from 'react';

export default function Page() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="p-10">
        <h1 className="text-4xl">Banana Lens</h1>
      </div>

      <Suspense>
        <MultiStepProvider>
          <FormProvider>
            <CreatePhotoForm />
          </FormProvider>
        </MultiStepProvider>
      </Suspense>
    </div>
  );
}
