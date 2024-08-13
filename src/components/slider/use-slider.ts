import { RefObject, useEffect, useReducer } from 'react';

type SliderState = {
  slidesPerScreen: number;
  totalSlides: number;
  maxSlideIndex: number;

  currentSlideIndex: number;
  isAtBeginning: boolean;
  isAtEnd: boolean;
};

type SliderAction =
  | { type: 'update_slider'; payload: number }
  | { type: 'set_slides_per_screen'; payload: number }
  | {
      type: 'slide_left';
    }
  | { type: 'slide_right' };

export const initialState: SliderState = {
  slidesPerScreen: 2,
  totalSlides: 0,
  maxSlideIndex: 0,

  currentSlideIndex: 0,
  isAtBeginning: true,
  isAtEnd: false,
};

export const reducer = (
  state: SliderState,
  action: SliderAction
): SliderState => {
  switch (action.type) {
    case 'update_slider': {
      const newTotalSLides = action.payload;
      const maxSlideIndex = newTotalSLides - 1;

      return {
        slidesPerScreen: state.slidesPerScreen,
        currentSlideIndex: state.currentSlideIndex,
        totalSlides: newTotalSLides,
        maxSlideIndex: newTotalSLides - 1,
        isAtBeginning: state.currentSlideIndex <= 0,
        isAtEnd: state.currentSlideIndex >= maxSlideIndex,
      };
    }
    case 'set_slides_per_screen': {
      return { ...state, slidesPerScreen: action.payload };
    }
    case 'slide_left': {
      if (state.isAtBeginning) return state;

      const nextIndex = state.currentSlideIndex - state.slidesPerScreen;
      const isAtBeginning = nextIndex <= 0;

      const newState = {
        ...state,
        currentSlideIndex: isAtBeginning ? 0 : nextIndex,
        isAtBeginning,
        isAtEnd: false,
      };

      return newState;
    }
    case 'slide_right': {
      if (state.isAtEnd) return state;

      const nextIndex = state.currentSlideIndex + state.slidesPerScreen;
      const isAtEnd = nextIndex >= state.maxSlideIndex;

      const newState = {
        ...state,
        currentSlideIndex: isAtEnd ? state.maxSlideIndex : nextIndex,
        isAtEnd,
        isAtBeginning: false,
      };

      return newState;
    }
    default: {
      return state;
    }
  }
};

export const useSlider = (
  sliderRef: RefObject<HTMLDivElement>,
  items: Array<any>,
  initialSlideIdx = 0
) => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    currentSlideIndex: initialSlideIdx,
    totalSlides: items.length,
    maxSlideIndex: items.length - 1,
  });

  useEffect(() => {
    if (!sliderRef.current) return;

    const styleValue = parseInt(
      getComputedStyle(sliderRef.current).getPropertyValue(
        '--slides-per-screen'
      ),
      10
    );

    dispatch({ type: 'set_slides_per_screen', payload: styleValue });
  }, [sliderRef]);

  useEffect(() => {
    dispatch({ type: 'update_slider', payload: items.length });
  }, [items]);

  return {
    state,
    dispatch,
  };
};
