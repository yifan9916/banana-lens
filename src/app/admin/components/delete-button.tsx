import { useState } from 'react';

import { Cross, Trash } from '@/components/icons';

type Props = { onDelete: () => void };

export const DeleteButton = (props: Props) => {
  const { onDelete } = props;
  const [isDelete, setIsDelete] = useState(false);

  const handleDelete = () => {
    if (!isDelete) {
      setIsDelete(true);

      return;
    }

    setIsDelete(false);

    onDelete();
  };

  const handleCancelDelete = () => {
    setIsDelete(false);
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={handleDelete}
        className="rounded-xl p-2 bg-red-500 text-white"
      >
        <Trash className="h-5 w-5" />
      </button>

      {isDelete && (
        <button onClick={handleCancelDelete} className="border rounded-xl p-2">
          <Cross className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};
