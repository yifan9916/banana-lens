import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { deleteUrlParams } from '@/utils/url-state/delete-url-params';
import { MultiStepProvider } from './multi-step-context';
import { FormProvider } from './form-context';
import { UpdatePhotoForm } from './edit-photo-form';
import { Pencil } from '@/components/icons';

import type { Photograph } from '@/libs/photography/types';

type Props = {
  photo: Photograph;
};

export const EditPhoto = (props: Props) => {
  const editItemParam = 'edit-photo';
  const editStepParam = 'edit-step';

  const { photo } = props;

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const isEdit =
    searchParams.get(editStepParam) &&
    searchParams.get(editItemParam) === photo.key;

  const handleEdit = () => {
    if (isEdit) {
      const updatedParams = deleteUrlParams(searchParams, [
        editItemParam,
        editStepParam,
      ]);

      router.replace(`${pathname}?${updatedParams}`, { scroll: false });

      return;
    }

    router.replace(`?${editItemParam}=${photo.key}&${editStepParam}=files`, {
      scroll: false,
    });
  };

  const handleCancel = () => {
    router.replace('/admin', { scroll: false });
  };

  return (
    <>
      <button
        onClick={handleEdit}
        className="border border-black rounded-xl p-2"
      >
        <Pencil className="h-5 w-5" />
      </button>

      {isEdit && (
        <MultiStepProvider queryKey={editStepParam}>
          <FormProvider photo={photo}>
            <div className="fixed w-full max-w-4xl bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <UpdatePhotoForm photo={photo} onCancel={handleCancel} />
            </div>
          </FormProvider>
        </MultiStepProvider>
      )}
    </>
  );
};
