import { useState } from 'react';

import { FileManagement } from '../../components/file-management';
import { useMultiStepContext } from '../multi-step-context';
import { useFormContext } from '../form-context';

export const FilesStep = () => {
  const { data, updateData } = useFormContext();
  const { isReview, next, previous } = useMultiStepContext();

  const [highQualityFile, setHighQualityFile] = useState<File>();
  const [lowQualityFile, setLowQualityFile] = useState<File>();
  const [thumbnailFile, setThumbnailFile] = useState<File>();

  const handlePrevious = () => {
    previous();
  };

  const handleNext = () => {
    updateData({
      type: 'update_files',
      payload: {
        files: {
          ...(thumbnailFile && { thumbnail: thumbnailFile }),
          ...(lowQualityFile && { lowResolution: lowQualityFile }),
          ...(highQualityFile && { highResolution: highQualityFile }),
        },
      },
    });

    next();
  };

  return (
    <>
      <fieldset className="mb-8 flex flex-col gap-4">
        <legend className="mb-4">Upload</legend>

        <FileManagement
          label="High Quality"
          onChange={(file) => {
            setHighQualityFile(file);
          }}
          media={
            typeof data.files.highResolution === 'string'
              ? data.files.highResolution
              : undefined
          }
        />

        <FileManagement
          label="Low Quality"
          onChange={(file) => {
            setLowQualityFile(file);
          }}
          media={
            typeof data.files.lowResolution === 'string'
              ? data.files.lowResolution
              : undefined
          }
        />

        <FileManagement
          label="Thumbnail"
          onChange={(file) => {
            setThumbnailFile(file);
          }}
          media={
            typeof data.files.thumbnail === 'string'
              ? data.files.thumbnail
              : undefined
          }
        />
      </fieldset>

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
