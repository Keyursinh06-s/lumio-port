import React, { useRef } from 'react';
import { motion, useScroll, useVelocity, useTransform, useSpring } from 'framer-motion';

export default function VelocityScrollItem({ children }) {
  const containerRef = useRef(null);
  
  // Track scroll position
  const { scrollY } = useScroll();
  
  // Track velocity of scrollY
  const scrollVelocity = useVelocity(scrollY);
  
  // Transform scroll velocity to scale.
  // Standard scroll velocity can reach values between -8000 and 8000 during fast scrolls.
  // We scale down slightly (to 0.9) when scrolling fast, returning to 1.0 when stationary.
  const rawScale = useTransform(
    scrollVelocity,
    [-8000, 0, 8000],
    [0.9, 1, 0.9]
  );
  
  // Smooth the scale transitions using spring physics
  const scale = useSpring(rawScale, {
    damping: 30,
    stiffness: 170,
    mass: 0.4
  });

  return (
    <motion.div 
      ref={containerRef} 
      style={{ scale, transformOrigin: "center center" }}
      className="w-full flex justify-center"
    >
      {children}
    </motion.div>
  );
}
