'use client';

import { createContext, useContext, useReducer } from 'react';

import type { Photograph } from '@/libs/photography/types';
import type { CameraMetadata } from '@/libs/photography/metadata/metadata';

export type FormState = {
  data: {
    files: {
      lowResolution?: File | string;
      highResolution?: File | string;
    };
    status: Photograph['status'];
    metadata: CameraMetadata;
  };
  updateData: (action: FormAction) => void;
};

type FormAction =
  | {
      type: 'update_files';
      payload: {
        files: FormState['data']['files'];
      };
    }
  | {
      type: 'update_status';
      payload: {
        status: FormState['data']['status'];
      };
    }
  | {
      type: 'update_metadata';
      payload: {
        metadata: FormState['data']['metadata'];
      };
    };

export const initialContext: FormState = {
  data: {
    files: {},
    status: 'draft',
    metadata: {
      camera: '',
      aperture: '',
      focalLength: '',
      iso: '',
      shutterSpeed: '',
    },
  },
  updateData: () => {},
};

const reducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case 'update_files':
      const newState = {
        ...state,
        data: {
          ...state.data,
          ...action.payload,
          files: {
            ...state.data.files,
            ...action.payload.files,
          },
        },
      };

      return newState;
    case 'update_status':
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload,
        },
      };
    case 'update_metadata':
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

export const FormProvider = (props: {
  children: React.ReactNode;
  photo: Photograph;
}) => {
  const { children, photo } = props;

  const [state, dispatch] = useReducer(reducer, {
    ...initialContext,
    data: {
      files: {
        lowResolution: photo.media.lowResolution?.url,
        highResolution: photo.media.highResolution?.url,
      },
      status: photo.status,
      metadata: {
        camera: photo.metadata.camera,
        aperture: photo.metadata.aperture,
        focalLength: photo.metadata.focalLength,
        iso: photo.metadata.iso,
        shutterSpeed: photo.metadata.shutterSpeed,
      },
    },
  });

  const updateData = (action: FormAction) => {
    dispatch(action);
  };

  return (
    <FormContext.Provider
      value={{
        ...initialContext,
        data: state.data,
        updateData,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
