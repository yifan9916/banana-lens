import { CSSProperties, Suspense } from 'react';

import { usePhotos } from '@/libs/photography/photos/use-photos';
import { DeletePhoto } from '../delete/delete-photo';
import { EditPhoto } from '../edit/edit-photo';
import { Eyes } from '@/components/icons';

import type { CameraMetadata } from '@/libs/photography/metadata/metadata';

export const PhotoList = () => {
  const photos = usePhotos();

  return (
    <div className="p-10">
      Total photos: {photos?.length}
      <ul className="grid grid-cols-2 p-2 gap-2 sm:grid-cols-4">
        {photos?.map((p) => (
          <div
            key={p.id}
            style={
              p.media.lowResolution
                ? ({
                    '--bg-img-url': `url(${p.media.lowResolution.url})`,
                  } as CSSProperties)
                : undefined
            }
            className="relative border rounded-lg bg-center bg-cover bg-[image:var(--bg-img-url)]"
          >
            <div className="h-full flex flex-col justify-between p-2 bg-white/80">
              <div>
                <p>ID: {p.id}</p>
                <p className="font-bold">{p.key}</p>
                <p className="flex items-center gap-2">
                  <Eyes className="h-5 w-5 inline-block" />
                  {p.views}
                </p>

                <div className="my-2">
                  <span
                    className={[
                      'rounded-lg px-2 py-1',
                      p.status === 'published'
                        ? 'bg-green-300'
                        : 'bg-yellow-300',
                    ].join(' ')}
                  >
                    Status: {p.status}
                  </span>
                </div>

                {p.collection && (
                  <span className="bg-black/60 rounded-lg text-white px-2 py-1 text-sm">
                    {p.collection.key}
                  </span>
                )}

                <p>Created at: {new Date(p.createdAt).toLocaleDateString()}</p>
                {p.updatedAt && (
                  <p>
                    Updated at: {new Date(p.updatedAt).toLocaleDateString()}
                  </p>
                )}

                <Metadata metadata={p.metadata} />
              </div>

              <div className="flex justify-between mt-4">
                <Suspense>
                  <EditPhoto photo={p} />
                </Suspense>

                <DeletePhoto photo={p} />
              </div>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

const Metadata = (props: { metadata: CameraMetadata }) => {
  const { metadata } = props;

  return (
    <div className="mt-2 text-sm">
      <div className="mb-2">
        <p>{metadata.camera}</p>
      </div>
      <div className="flex flex-wrap gap-1">
        <p>ƒ/ {metadata.aperture}</p>
        <p>{metadata.focalLength}</p>
        <p>{metadata.iso} ISO</p>
        <p>{metadata.shutterSpeed} sec</p>
      </div>
    </div>
  );
};
