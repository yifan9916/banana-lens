import { useTranslations } from 'next-intl';

export default function Index() {
  const dict = useTranslations('Home');

  return (
    <div className="h-dvh w-dvw flex justify-center items-center flex-col">
      <h1 className="font-[family-name:var(--font-satisfy)] text-4xl sm:text-[80px] text-center">
        {dict('title')}
      </h1>
    </div>
  );
}
