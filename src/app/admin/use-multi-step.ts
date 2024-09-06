import { useState } from 'react';
import { useRouter } from 'next/navigation';

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

  const next = () => {
    if (isReview) {
      cancelReview();
      return;
    }

    const nextStep = flow[step].next ?? step;

    setStep(nextStep);
    router.push(`?${query}=${nextStep}`);
  };

  const previous = () => {
    if (isReview) {
      cancelReview();
      return;
    }

    const previousStep = flow[step].previous ?? step;

    setStep(previousStep);
    router.push(`?${query}=${previousStep}`);
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
