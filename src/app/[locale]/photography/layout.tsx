import { useTranslations } from 'next-intl';

import { Link } from '@/navigation';
import { Instagram, Tiktok } from '@/components/icons';
import { Collections } from '@/components/collections/collections';

type Props = {
  children: React.ReactNode;
};

export default function Layout(props: Props) {
  const { children } = props;
  const dict = useTranslations('Photography');

  return (
    <main>
      <h1 className="font-[family-name:var(--font-satisfy)] text-6xl sm:text-8xl text-center py-2 pt-20 sm:py-4 sm:pt-20">
        {dict('title')}
      </h1>

      <p className="flex justify-center max-w-4xl m-auto pt-4 pb-20 gap-4">
        <Link href="https://www.instagram.com/fanguyyi/">
          <Instagram className="h-8 w-8" />
        </Link>
        <Link href="https://www.tiktok.com/@fanguyyi">
          <Tiktok className="h-8 w-8" />
        </Link>
      </p>

      <p className="px-10 pb-20 max-w-4xl m-auto">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.{' '}
        <Link href="/photography#description" className="underline">
          more
        </Link>
      </p>

      <Collections />

      {children}
    </main>
  );
}
