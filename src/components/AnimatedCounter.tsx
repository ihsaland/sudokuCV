import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface Props {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

const AnimatedCounter: React.FC<Props> = ({ value, prefix = '', suffix = '', duration = 1.6 }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [current, setCurrent] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;

    const startTime = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - startTime) / (duration * 1000), 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      setCurrent(Math.floor(eased * value));
      if (t < 1) requestAnimationFrame(tick);
      else setCurrent(value);
    };
    requestAnimationFrame(tick);
  }, [inView, value, duration]);

  return (
    <span ref={ref}>
      {prefix}{current}{suffix}
    </span>
  );
};

export default AnimatedCounter;
