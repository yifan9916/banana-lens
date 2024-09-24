import { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { updateUrlParams } from '../url-state/update-url-params';

export type MultiStepFlow<T extends PropertyKey> = Record<
  T,
  { next?: T | (() => T); previous?: T | (() => T) }
>;

export const useMultistep = <T extends string>(
  flow: MultiStepFlow<T>,
  initialStep: T,
  finalStep: T,
  query = 'step'
) => {
  const [step, setStep] = useState<T>(initialStep);
  const [isReview, setIsReview] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const next = () => {
    if (isReview) {
      cancelReview();
      return;
    }

    const nextStep = flow[step].next ?? step;

    const paramList = updateUrlParams(searchParams, [
      {
        key: query,
        value: typeof nextStep === 'string' ? nextStep : nextStep(),
      },
    ]);

    setStep(nextStep);
    router.push(`${pathname}?${paramList.toString()}`);
  };

  const previous = () => {
    if (isReview) {
      cancelReview();
      return;
    }

    const previousStep = flow[step].previous ?? step;

    const paramList = updateUrlParams(searchParams, [
      {
        key: query,
        value: typeof previousStep === 'string' ? previousStep : previousStep(),
      },
    ]);

    setStep(previousStep);
    router.push(`${pathname}?${paramList.toString()}`);
  };

  const goTo = (nextStep: T) => {
    setStep(nextStep);
  };

  const review = (nextStep: T) => {
    setStep(nextStep);
    setIsReview(true);
  };

  const cancelReview = () => {
    setStep(finalStep);
    setIsReview(false);
  };

  return {
    step,
    next,
    previous,
    goTo,
    review,
    isReview,
  };
};
