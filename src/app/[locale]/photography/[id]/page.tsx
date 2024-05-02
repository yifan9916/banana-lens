import Image from 'next/image';

import { images } from '@/images';

type Props = {
  params: {
    id: string;
  };
};

export default function Page(props: Props) {
  const { params } = props;

  const image = images.filter((img) => {
    return `${img.name}.jpg` === params.id;
  })[0];

  return (
    <div className="flex flex-col justify-center h-full max-h-[100svh]">
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
