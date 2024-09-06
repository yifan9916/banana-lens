'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';

import { FlagUs, FlagCn, FlagNl, FlagDe } from '@/components/icons/';
import { Link, type Locale, locales, usePathname } from '@/i18n/routing';

const flags = {
  en: FlagUs,
  zh: FlagCn,
  nl: FlagNl,
  de: FlagDe,
};

export const LocaleSwitcher = () => {
  const pathName = usePathname();
  const params = useParams();
  const [isSelection, setIsSelection] = useState(false);

  const handleClick: React.ComponentProps<'div'>['onClick'] = (e) => {
    if (isSelection) {
      e.stopPropagation();
      setIsSelection(false);
    } else {
      setIsSelection(true);
    }
  };

  const handleStyles = (locale: Locale) => {
    const isCurrentLocale = params.locale === locale;

    const localeStyles = isCurrentLocale ? 'opacity-100' : 'opacity-50';
    const selectionStyles = isSelection ? '' : isCurrentLocale ? '' : '!w-0';

    const styles = [selectionStyles, localeStyles, 'transition-all'].join(' ');

    return styles;
  };

  return (
    <div className="flex" onClick={handleClick}>
      <ul
        className={[
          'flex flex-row border rounded-full',
          isSelection ? 'px-1' : '',
        ].join(' ')}
      >
        {locales.map((locale) => {
          const Flag = flags[locale];

          return (
            <li
              key={locale}
              className={['h-8 w-8', handleStyles(locale)].join(' ')}
              aria-label={`Language: ${locale}`}
            >
              <Link
                locale={locale}
                href={pathName}
                scroll={false}
                replace
                className="h-full w-full flex justify-center items-center"
              >
                <Flag className="h-5 w-5" />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
