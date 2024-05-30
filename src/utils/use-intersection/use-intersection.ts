import { useEffect, useRef, useState } from 'react';

export const useIntersection = (ref: React.RefObject<HTMLElement>) => {
  const observerRef = useRef<IntersectionObserver>();
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setIsIntersecting(true);
            observerRef.current?.disconnect();
          }
        });
      },
      { threshold: 1 }
    );

    if (ref.current) {
      observerRef.current?.observe(ref.current);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  return { isIntersecting };
};
