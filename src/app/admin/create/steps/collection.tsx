import { useState } from 'react';

import { useCollections } from '@/libs/photography/collections/use-collections';
import { Combobox } from '@/components/combobox/combobox';
import { useFormContext } from '../../create/form-context';
import { useMultiStepContext } from '../multi-step-context';

export const CollectionFields = () => {
  const { data, saveData } = useFormContext();
  const { previous, next, isReview } = useMultiStepContext();

  const [collectionInput, setCollectionInput] = useState(
    data.collection?.key || ''
  );

  const collections = useCollections();

  const handleDataChange = (value: string) => {
    setCollectionInput(value);
  };

  const handlePrevious = () => {
    previous();
  };

  const handleNext = () => {
    const collection = { key: collectionInput } as NonNullable<
      typeof data.collection
    >;

    // include ID if input matches collection in the list
    if (collections?.length) {
      const match = collections.filter((c) => {
        return collectionInput.includes(c.key);
      });

      const hasMatch = !!match.length;

      if (hasMatch) {
        collection.id = collections?.filter(
          (c) => c.key === collectionInput
        )[0]?.id;
      }
    }

    saveData({
      type: 'save_collection',
      payload: {
        collection,
      },
    });

    next();
  };

  return (
    <>
      <div className="mb-16">
        <label htmlFor="collectionKey" className="block p-2">
          Select or create a new collection for the photo
        </label>

        <Combobox
          name="collectionKey"
          placeholder="Collection..."
          initialValue={collectionInput}
          list={collections?.map((c) => ({ value: c.key }))}
          onInputChange={handleDataChange}
        />
      </div>

      <div className="flex justify-between">
        {isReview && (
          <button
            type="button"
            className="p-3 border rounded-xl"
            onClick={handlePrevious}
          >
            Cancel
          </button>
        )}
        <button
          type="button"
          className="p-3 border rounded-xl capitalize ml-auto"
          onClick={handleNext}
        >
          {isReview ? 'Save' : 'Next'}
        </button>
      </div>
    </>
  );
};
