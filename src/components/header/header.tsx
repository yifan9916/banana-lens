import { Link } from '@/navigation';

export const Header = () => {
  return (
    <header className="flex justify-center p-4 sm:p-12">
      <Link
        href="/"
        className="font-[family-name:var(--font-satisfy)] text-2xl"
      >
        Banana Lens
      </Link>
    </header>
  );
};
