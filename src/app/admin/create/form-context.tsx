'use client';

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';

import { useLocalStorage } from '@/utils/local-storage/use-local-storage';
import type { CameraMetadata } from '../utils/metadata';

export type FormState = {
  data: {
    collection?: {
      id?: number;
      key: string;
    };
    photo: {
      key: string;
    };
    metadata: CameraMetadata;
  };
  saveData: (action: FormAction) => void;
};

type FormAction =
  | { type: 'init'; payload: FormState }
  | {
      type: 'save_collection';
      payload: { collection: NonNullable<FormState['data']['collection']> };
    }
  | { type: 'save_photo'; payload: { photo: FormState['data']['photo'] } }
  | {
      type: 'save_metadata';
      payload: { metadata: FormState['data']['metadata'] };
    };

export const initialContext: FormState = {
  data: {
    photo: {
      key: '',
    },
    metadata: {
      aperture: '',
      camera: 'SonyA7M4',
      focalLength: '',
      iso: '',
      shutterSpeed: '',
    },
  },
  saveData: () => 0,
};

const reducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case 'save_collection':
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload,
        },
      };
    case 'save_photo':
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload,
        },
      };
    case 'save_metadata':
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};

export const FormContext = createContext<FormState>(initialContext);

export const useFormContext = () => {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error('useFormContext must be used within a FormContextProvider');
  }

  return context;
};

export const FormProvider = (props: { children: React.ReactNode }) => {
  const { children } = props;

  const [localData, setLocalData] = useLocalStorage(
    'banana-lens-create-photo',
    initialContext.data
  );

  const [state, dispatch] = useReducer(reducer, {
    ...initialContext,
    data: localData,
  });

  const [isMounted, setIsMounted] = useState(false);

  // wait for context to be initialized with local storage data
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const saveData = (action: FormAction) => {
    dispatch(action);
    setLocalData({ ...state.data, ...action.payload });
  };

  return (
    <FormContext.Provider
      value={{
        ...initialContext,
        data: state.data,
        saveData,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
