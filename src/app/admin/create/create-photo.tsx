import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Cross } from '@/components/icons';
import { deleteUrlParam } from '@/utils/delete-url-param/delete-url-param';
import { MultiStepProvider } from './multi-step-context';
import { FormProvider } from './form-context';
import { CreatePhotoForm } from './create-photo-form';

export const CreatePhoto = () => {
  const urlParam = 'create-photo-step';

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isCreate = searchParams.get(urlParam);

  const handleCreate = () => {
    if (isCreate) {
      handleCancel();
      return;
    }

    router.push(`?${urlParam}=collection`);
  };

  const handleCancel = () => {
    const updatedParams = deleteUrlParam(searchParams.toString(), urlParam);

    router.push(`${pathname}?${updatedParams}`);
  };

  return (
    <div className="p-10">
      <button
        type="button"
        onClick={handleCreate}
        className="border rounded-lg p-2 bg-green-500 text-white"
      >
        <p className="flex items-center">
          Create Photo
          <Cross className="ml-2 h-5 w-5 rotate-45 inline-block" />
        </p>
      </button>

      {isCreate && (
        <MultiStepProvider queryKey={urlParam}>
          <FormProvider>
            <div className="fixed w-full max-w-4xl bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <CreatePhotoForm onCancel={handleCancel} />
            </div>
          </FormProvider>
        </MultiStepProvider>
      )}
    </div>
  );
};
