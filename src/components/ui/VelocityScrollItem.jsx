import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export default function VelocityScrollItem({ children }) {
  const containerRef = useRef(null);
  
  // Track scroll position of the element relative to the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Clean, organic scale tied to scroll position (0.95 -> 1.0 -> 0.95)
  const rawScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.95, 1, 0.95]
  );
  
  // Smooth out the scale transition using spring physics
  const scale = useSpring(rawScale, {
    damping: 25,
    stiffness: 120,
    mass: 0.2
  });

  // Smooth opacity fade at viewport edges (0.7 -> 1.0 -> 0.7)
  const rawOpacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.75, 1],
    [0.7, 1, 1, 0.7]
  );
  
  const opacity = useSpring(rawOpacity, {
    damping: 25,
    stiffness: 120,
    mass: 0.2
  });

  return (
    <motion.div 
      ref={containerRef} 
      style={{ scale, opacity, transformOrigin: "center center" }}
      className="w-full flex justify-center"
    >
      {children}
    </motion.div>
  );
}
