import Image from 'next/image';

import { TODO_Image } from '@/images';
import { Link } from '@/navigation';

type Props = {
  list: TODO_Image[];
};

export const ImageList = (props: Props) => {
  const { list } = props;

  return (
    <div className="relative max-w-4xl m-auto">
      <ul className="grid grid-cols-2 p-2 gap-2 sm:grid-cols-4">
        {list.map((img) => {
          return (
            <li key={img.name} className="rounded-2xl overflow-hidden">
              <Link
                key={img.name}
                href={`/photography/chongqing/${img.name}.jpg`}
              >
                <Image src={img.src} alt={img.name} placeholder="blur" />
                <div className="text-sm font-light p-2">{img.name}</div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
