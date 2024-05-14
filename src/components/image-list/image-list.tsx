import Image from 'next/image';

import { Link } from '@/navigation';
import { TODO_Image } from '@/libs/photography/types';

type Props = {
  list: {
    id: string;
    items: TODO_Image[];
  };
};

export const ImageList = (props: Props) => {
  const { list } = props;

  return (
    <ul className="grid grid-cols-2 p-2 gap-2 sm:grid-cols-4">
      {list.items.map((img) => {
        return (
          <li key={img.id} className="rounded-2xl overflow-hidden">
            <Link
              key={img.id}
              href={`/photography/${list.id}/${img.id}.jpg`}
              className="flex h-full flex-col"
            >
              <Image
                src={img.src.preview}
                alt={img.id}
                placeholder="blur"
                className="flex-1 object-cover"
              />
              <div className="text-sm font-light p-2">
                {img.title || img.id}
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
