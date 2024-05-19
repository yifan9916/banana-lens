import { useEffect } from 'react';

export const useTimeout = (
  callback: () => void,
  timeout: number,
  condition: boolean = true
) => {
  useEffect(() => {
    let timerId: ReturnType<typeof setTimeout>;

    if (condition) {
      timerId = setTimeout(() => {
        callback();
      }, timeout);
    }

    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [callback, condition]);
};
