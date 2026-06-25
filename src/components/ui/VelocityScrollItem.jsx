import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export default function VelocityScrollItem({ children }) {
  const containerRef = useRef(null);
  
  // Track scroll position of the element relative to the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Scale: subtle breathe tied to scroll position (0.96 -> 1.0 -> 0.96)
  const rawScale = useTransform(
    scrollYProgress,
    [0, 0.4, 0.6, 1],
    [0.96, 1, 1, 0.96]
  );
  
  const scale = useSpring(rawScale, {
    damping: 30,
    stiffness: 150,
    mass: 0.15
  });

  // Opacity: smooth fade at viewport edges
  const rawOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.4, 1, 1, 0.4]
  );
  
  const opacity = useSpring(rawOpacity, {
    damping: 30,
    stiffness: 150,
    mass: 0.15
  });

  // Subtle Y parallax: elements drift slightly against scroll direction
  const rawY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [30, 0, -30]
  );

  const y = useSpring(rawY, {
    damping: 35,
    stiffness: 100,
    mass: 0.2
  });

  // Edge blur: elements slightly blur at edges of viewport, crystal clear in center
  const rawBlur = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [2, 0, 0, 2]
  );

  const blur = useSpring(rawBlur, {
    damping: 30,
    stiffness: 150,
    mass: 0.15
  });

  // Convert blur spring to CSS filter string
  const filter = useTransform(blur, (v) => `blur(${v}px)`);

  return (
    <motion.div 
      ref={containerRef} 
      style={{ scale, opacity, y, filter, transformOrigin: "center center" }}
      className="w-full flex justify-center"
    >
      {children}
    </motion.div>
  );
}
