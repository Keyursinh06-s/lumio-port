import { useEffect, useRef, useState } from 'react';

export default function useScrollReveal(options = {}) {
  const [isRevealed, setIsRevealed] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsRevealed(true);
        if (options.triggerOnce !== false && ref.current) {
          observer.unobserve(ref.current);
        }
      } else if (options.triggerOnce === false) {
        setIsRevealed(false);
      }
    }, {
      threshold: options.threshold ?? 0.15,
      rootMargin: options.rootMargin ?? '0px',
    });

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options.threshold, options.rootMargin, options.triggerOnce]);

  return [ref, isRevealed];
}
