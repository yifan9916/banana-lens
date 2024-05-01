import { Instagram, Tiktok } from '@/components/icons';
import Link from 'next/link';

export default function Page() {
  return (
    <main className="p-4 pb-32 max-w-4xl m-auto">
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
    </main>
  );
}
