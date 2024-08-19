'use client';

// TODO migrate to tailwind
import styles from './slider.module.css';

import { CSSProperties, ElementRef, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useFormatter, useTranslations } from 'next-intl';

import { Link, usePathname, useRouter } from '@/navigation';
import { useIncrementViews } from '@/utils/use-increment-views/use-increment-views';
import { useSlider } from './use-slider';
import { Arrow } from '../icons';

import type { DictionaryKeys } from '@/i18n';
import type { Photograph } from '@/libs/photography/types';

type Props = {
  items: Photograph[];
  initialSlide?: number;
};

export const Slider = (props: Props) => {
  const { items, initialSlide } = props;

  const router = useRouter();
  const pathname = usePathname();

  const sliderRef = useRef<ElementRef<'div'>>(null);
  const { state, dispatch } = useSlider(sliderRef, items, initialSlide);

  const handleSlideLeft = () => {
    dispatch({ type: 'slide_left' });
  };

  const handleSlideRight = () => {
    dispatch({ type: 'slide_right' });
  };

  useEffect(() => {
    router.replace(
      `${pathname}/?lightbox=${items[state.currentSlideIndex].key}`,
      {
        scroll: false,
      }
    );
  }, [state.currentSlideIndex]);

  useIncrementViews(items[state.currentSlideIndex]);

  return (
    <div
      className={`${styles.slider} relative h-full w-full flex flex-col justify-center`}
      style={{ '--item-index': state.currentSlideIndex } as CSSProperties}
      ref={sliderRef}
    >
      <div
        className={`${styles.slides} max-h-full flex text-white transition-transform`}
      >
        {items.map((item, index) => (
          <Slide
            key={item.id}
            item={item}
            isPriority={index <= state.slidesPerScreen}
          />
        ))}
      </div>

      {!state.isAtBeginning && (
        <button
          aria-label="Slide Left"
          onClick={handleSlideLeft}
          className="text-black absolute top-1/2 -translate-y-1/2 bg-white/50 rounded-full sm:p-1 left-0 ml-5"
        >
          <Arrow className="h-8 w-8 -rotate-90" />
        </button>
      )}

      {!state.isAtEnd && (
        <button
          aria-label="Slide Right"
          onClick={handleSlideRight}
          className="text-black absolute top-1/2 -translate-y-1/2 bg-white/50 rounded-full sm:p-1 right-0 mr-5"
        >
          <Arrow className="h-8 w-8 rotate-90" />
        </button>
      )}
    </div>
  );
};

type SlideProps = {
  item: Photograph;
  isPriority?: boolean;
};

const Slide = (props: SlideProps) => {
  const { item, isPriority } = props;

  const format = useFormatter();
  const dict = useTranslations();

  const title = dict(`${item.key}.title` as DictionaryKeys);
  const date = format.dateTime(item.createdAt, {
    year: 'numeric',
    day: '2-digit',
    month: 'short',
  });

  return (
    <div
      className={`${styles.slide} shrink-0 grow-0 p-4 flex justify-center items-center`}
    >
      <div className="rounded-xl shadow-2xl dark:shadow-white/50 bg-white dark:bg-black flex flex-col sm:flex-row max-h-full overflow-scroll">
        <Link
          href={{
            pathname: `/photography/${item.collection}/${item.key}`,
            query: { loupe: true },
          }}
          scroll={false}
          className="cursor-zoom-in"
        >
          <Image
            src={item.src.preview}
            alt={item.key}
            quality={75}
            priority={isPriority}
            className="h-full w-full object-contain"
          />
        </Link>

        <div className="text-black dark:text-white basis-1/3 flex flex-col-reverse sm:flex-col justify-between">
          <div className="mb-2 p-6">
            <h3 className="font-bold">{title}</h3>
            <p className="inline-block py-[2px] px-2 text-sm capitalize rounded-md bg-black/80 dark:bg-white/80 text-white dark:text-black mb-2">
              {item.collection}
            </p>
            <p className="text-sm">{date}</p>
            <p className="text-sm capitalize">
              {dict('general.views' as DictionaryKeys)}: {item.views}
            </p>
          </div>

          <div className="flex flex-row flex-wrap text-sm gap-1 bg-black/80 dark:bg-white/80 text-white dark:text-black p-2">
            <span>{item.metadata?.focalLength} ·</span>
            <span>ƒ/{item.metadata?.aperture} ·</span>
            <span>
              <span className="italic">{item.metadata?.shutterSpeed}</span> sec
              ·
            </span>
            <span>ISO {item.metadata?.iso}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
