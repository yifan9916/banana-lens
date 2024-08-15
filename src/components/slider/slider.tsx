'use client';

// TODO migrate to tailwind
import styles from './slider.module.css';

import { CSSProperties, ElementRef, useEffect, useRef } from 'react';
import Image from 'next/image';

import { Link, usePathname, useRouter } from '@/navigation';
import { Photograph } from '@/libs/photography/types';
import { useIncrementViews } from '@/utils/use-increment-views/use-increment-views';
import { useSlider } from './use-slider';
import { Arrow } from '../icons';

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
      className={`${styles.slider} relative flex h-5/6 flex-col`}
      style={{ '--item-index': state.currentSlideIndex } as CSSProperties}
      ref={sliderRef}
    >
      <div
        className={`${styles.slides} flex h-full text-white transition-transform`}
      >
        {items.map((item, index) => (
          <Slide
            key={item.id}
            item={item}
            isPriority={index <= state.slidesPerScreen}
          />
        ))}
      </div>

      <div className="text-black">
        {!state.isAtBeginning && (
          <button
            aria-label="Slide Left"
            onClick={handleSlideLeft}
            className="absolute top-1/2 translate-y-1/2 bg-white/50 rounded-full sm:p-1 left-0 ml-2 sm:ml-5"
          >
            <Arrow className="h-8 w-8 -rotate-90" />
          </button>
        )}
        {!state.isAtEnd && (
          <button
            aria-label="Slide Right"
            onClick={handleSlideRight}
            className="absolute top-1/2 translate-y-1/2 bg-white/50 rounded-full sm:p-1 right-0 mr-2 sm:mr-5 "
          >
            <Arrow className="h-8 w-8 rotate-90" />
          </button>
        )}
      </div>
    </div>
  );
};

type SlideProps = {
  item: Photograph;
  isPriority?: boolean;
};

const Slide = (props: SlideProps) => {
  const { item, isPriority } = props;

  return (
    <Link
      key={item.key}
      href={{
        pathname: `/photography/${item.collection}/${item.key}`,
        query: { loupe: true },
      }}
      scroll={false}
      className={`${styles.slide} shrink-0 grow-0 cursor-zoom-in px-2`}
    >
      <Image
        src={item.src.preview}
        alt={item.key}
        quality={75}
        priority={isPriority}
        className="h-full w-full object-contain"
      />
    </Link>
  );
};
