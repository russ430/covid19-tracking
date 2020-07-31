import { useEffect, useState } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

const useResizeObserver = (ref) => {
  const [dimensions, setDimensions] = useState({ width: 600, height: 300 });
  useEffect(() => {
    const observeTarget = ref.current;
    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const { width, height } = entry.contentRect;
        setDimensions({ width, height });
      });
    });
    resizeObserver.observe(observeTarget);
    return () => {
      resizeObserver.unobserve(observeTarget);
    };
  }, [ref]);
  return dimensions;
};

export default useResizeObserver;
