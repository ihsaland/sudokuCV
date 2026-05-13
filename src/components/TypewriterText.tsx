import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  text: string;
  delay?: number;
  charDelay?: number;
  style?: React.CSSProperties;
  className?: string;
}

const TypewriterText: React.FC<Props> = ({
  text,
  delay = 0,
  charDelay = 0.055,
  style,
  className,
}) => (
  <motion.span
    className={className}
    style={style}
    initial="hidden"
    animate="visible"
    variants={{
      visible: {
        transition: { staggerChildren: charDelay, delayChildren: delay },
      },
    }}
  >
    {text.split('').map((char, i) => (
      <motion.span
        key={i}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0 } },
        }}
      >
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    ))}
  </motion.span>
);

export default TypewriterText;
