import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [cursorType, setCursorType] = useState('default'); // 'default' | 'hover-project' | 'hover-folder' | 'hover-link'
  const [isClicked, setIsClicked] = useState(false);
  const [ripples, setRipples] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  const springConfig = { damping: 25, stiffness: 220, mass: 0.35 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      // Offset by 16px to center the 32px (w-8 h-8) cursor ring
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      if (!isVisible) setIsVisible(true);
    };

    const handleHover = (e) => {
      const target = e.target.closest('[data-cursor]');
      if (target) {
        const rawType = target.getAttribute('data-cursor');
        if (rawType === 'project') {
          setCursorType('hover-project');
        } else if (rawType === 'folder') {
          setCursorType('hover-folder');
        } else {
          setCursorType(rawType);
        }
      } else if (e.target.closest('button, a, input, select, textarea, [role="button"], .folder-root')) {
        setCursorType('hover-link');
      } else {
        setCursorType('default');
      }
    };

    const handleMouseDown = () => {
      setIsClicked(true);
    };

    const handleMouseUp = (e) => {
      setIsClicked(false);
      // Spawn a ripple animation at click location
      const newRipple = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
      };
      setRipples((prev) => [...prev.slice(-3), newRipple]); // keep max 4 active ripples
    };

    const handleMouseLeaveWindow = () => {
      setIsVisible(false);
    };

    const handleMouseEnterWindow = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleHover);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeaveWindow);
    document.addEventListener('mouseenter', handleMouseEnterWindow);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleHover);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      document.removeEventListener('mouseenter', handleMouseEnterWindow);
    };
  }, [isVisible]);

  // Clean up ripples after their animation ends
  const removeRipple = (id) => {
    setRipples((prev) => prev.filter((r) => r.id !== id));
  };

  if (!isVisible) return null;

  return (
    <>
      {/* 1. Precise Center Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-black rounded-full pointer-events-none z-[99999] hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          transform: 'translate(11px, 11px)', // center it inside the 32px outer ring
        }}
        animate={{
          scale: isClicked ? 0.75 : 1,
          backgroundColor: cursorType === 'hover-project' || cursorType === 'hover-folder' ? '#ffffff' : '#000000',
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 20 }}
      />

      {/* 2. Trailing Reactive Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-black/25 pointer-events-none z-[99999] hidden md:block flex items-center justify-center overflow-hidden"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          scale: isClicked
            ? 0.75
            : cursorType === 'hover-link'
            ? 1.4
            : cursorType === 'hover-project' || cursorType === 'hover-folder'
            ? 2.2
            : 1,
          backgroundColor:
            cursorType === 'hover-project'
              ? 'rgba(0, 0, 0, 0.94)'
              : cursorType === 'hover-folder'
              ? 'rgba(30, 30, 30, 0.94)'
              : 'rgba(255, 255, 255, 0)',
          borderColor:
            cursorType === 'hover-project' || cursorType === 'hover-folder'
              ? 'rgba(255, 255, 255, 0)'
              : 'rgba(0, 0, 0, 0.25)',
          backdropFilter:
            cursorType === 'hover-project' || cursorType === 'hover-folder'
              ? 'blur(4px)'
              : 'blur(0px)',
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 24, mass: 0.6 }}
      >
        <AnimatePresence mode="wait">
          {cursorType === 'hover-project' && (
            <motion.span
              key="view-text"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              className="text-[8px] text-white font-extrabold tracking-widest leading-none font-heading"
            >
              VIEW
            </motion.span>
          )}
          {cursorType === 'hover-folder' && (
            <motion.span
              key="open-text"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              className="text-[8px] text-white font-extrabold tracking-widest leading-none font-heading"
            >
              OPEN
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* 3. Pointer Ripples */}
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          className="fixed top-0 left-0 w-8 h-8 rounded-full border border-black/35 pointer-events-none z-[99998] hidden md:block"
          style={{
            x: ripple.x - 16,
            y: ripple.y - 16,
          }}
          initial={{ scale: 0.8, opacity: 0.8 }}
          animate={{ scale: 2.2, opacity: 0 }}
          onAnimationComplete={() => removeRipple(ripple.id)}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        />
      ))}
    </>
  );
}
