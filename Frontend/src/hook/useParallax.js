// src/hooks/useParallax.js
import { useScroll, useTransform, useSpring } from 'framer-motion';

export const useParallax = (distance = 200) => {
  const { scrollY } = useScroll();
  // Using spring makes the motion feel "premium" and smooth, removing "laggy" jumps
  const y = useSpring(useTransform(scrollY, [0, 500], [0, distance]), {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  return y;
};