import Link from 'next/link';

import { Instagram, Tiktok } from '@/components/icons';
import { ImageList } from '@/components/image-list/image-list';
import { images } from '@/images';

type Props = {
  children?: React.ReactNode;
};
export default function Layout(props: Props) {
  const { children } = props;

  return (
    <main className="p-6 pb-32 max-w-4xl m-auto">
      <h1 className="font-[family-name:var(--font-satisfy)] text-5xl sm:text-[80px] text-center py-2 pt-20 sm:py-4 sm:pt-20">
        Photography
      </h1>

      <p className="flex justify-center pb-20 gap-4">
        <Link href="https://www.instagram.com/fanguyyi/">
          <Instagram style={{ height: '40px', width: '40px' }} />
        </Link>
        <Link href="https://www.tiktok.com/@fanguyyi">
          <Tiktok style={{ height: '40px', width: '40px' }} />
        </Link>
      </p>

      <p className="px-10 pb-20">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
        accumsan augue mi, blandit viverra arcu malesuada id. Maecenas et
        eleifend turpis, quis porttitor ante. Sed luctus, enim vitae vulputate
        sollicitudin, magna nisl ullamcorper est, sed suscipit lacus nibh non
        ligula. Vestibulum lobortis aliquam urna quis facilisis. Nunc id cursus
        orci. Sed tristique eu arcu a consequat. Donec scelerisque, orci non
        porta aliquet, diam ligula blandit turpis, pharetra imperdiet est ligula
        et lacus. Quisque in iaculis diam, ut ultricies tortor. Nunc a enim non
        mi suscipit molestie id et erat. Integer eleifend auctor condimentum.
      </p>

      <ImageList list={images}>{children}</ImageList>
    </main>
  );
}
