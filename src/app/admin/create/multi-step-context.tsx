'use client';

import { createContext, useContext } from 'react';
import { useSearchParams } from 'next/navigation';

import {
  MultiStepFlow,
  useMultistep,
} from '@/utils/use-multi-step/use-multi-step';

export type Step = 'collection' | 'photo' | 'metadata' | 'summary';

const createPhotoFlow: MultiStepFlow<Step> = {
  collection: {
    next: 'photo',
  },
  photo: {
    next: 'metadata',
    previous: 'collection',
  },
  metadata: {
    next: 'summary',
    previous: 'photo',
  },
  summary: {
    previous: 'metadata',
  },
} as const;

type MultiStepState = {
  step: Step;
  next: () => void;
  previous: () => void;
  goTo: (step: Step) => void;
  review: (step: Step) => void;
  isReview: boolean;
};

const initialContext: MultiStepState = {
  step: 'collection',
  isReview: false,
  next: () => {},
  previous: () => {},
  goTo: () => {},
  review: () => {},
};

const MultiStepContext = createContext<MultiStepState>(initialContext);

export const useMultiStepContext = () => {
  const context = useContext(MultiStepContext);

  if (!context) {
    throw new Error(
      'useMultiStepContext must be used within a MultiStepProvider'
    );
  }

  return context;
};

type Props = {
  children: React.ReactNode;
  queryKey: string;
};

export const MultiStepProvider = (props: Props) => {
  const { children, queryKey } = props;

  const stepQuery = queryKey;
  const searchParams = useSearchParams();
  const queryValue = searchParams.get(stepQuery);
  const initialStep = queryValue?.length ? queryValue : 'collection';

  const { review, goTo, isReview, next, previous, step } = useMultistep(
    createPhotoFlow,
    initialStep,
    'summary',
    stepQuery
  );

  return (
    <MultiStepContext.Provider
      value={{ review, goTo, isReview, next, previous, step: step as Step }}
    >
      {children}
    </MultiStepContext.Provider>
  );
};