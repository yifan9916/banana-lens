import Image from 'next/image';

import { hiResImages } from '@/images';

type Props = {
  params: {
    item: string;
  };
};

export default function Page(props: Props) {
  const { params } = props;

  const image = hiResImages.filter((img) => {
    return `${img.name}.jpg` === params.item;
  })[0];

  return (
    <div className="flex flex-col justify-center h-full max-h-dvh">
      <Image
        src={image.src}
        alt={image.name}
        priority={true}
        style={{
          width: 'auto',
          height: '100%',
          objectFit: 'contain',
          objectPosition: 'bottom',
        }}
        placeholder="blur"
      />

      <div className="relative p-3 text-white text-xs sm:absolute sm:top-0 sm:p-6">
        <p>
          <i>{image.name}</i>
        </p>
        <p>
          <i>f 1.8</i>
        </p>
        <p>
          <i>1/200</i>
        </p>
      </div>
    </div>
  );
}
