import React, { useEffect, useState, useRef } from 'react';
import useMediaQuery from '../../hooks/useMediaQuery';

export default function CustomCursor() {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const [cursorType, setCursorType] = useState('default'); // 'default' | 'hover-project' | 'hover-folder' | 'hover-link'
  const [isVisible, setIsVisible] = useState(false);

  // Keep track of the last active label to prevent layout jump / text disappearance during fade out
  const lastLabelRef = useRef('');
  const labelText = cursorType === 'hover-project' ? 'VIEW PROJECT' : cursorType === 'hover-folder' ? 'OPEN FOLDER' : '';
  if (labelText) {
    lastLabelRef.current = labelText;
  }

  // Track pressed state without re-renders
  const isPressedRef = useRef(false);
  const currentScaleRef = useRef(1);

  useEffect(() => {
    if (isMobile) return;

    let mx = -200;
    let my = -200;
    let cx = -200;
    let cy = -200;
    let rafId;

    const lerp = (a, b, t) => a + (b - a) * t;

    const animate = () => {
      cx = lerp(cx, mx, 0.14);
      cy = lerp(cy, my, 0.14);

      // Smoothly animate scale towards target (0.85 when pressed, 1.0 when released)
      const targetScale = isPressedRef.current ? 0.85 : 1;
      currentScaleRef.current = lerp(currentScaleRef.current, targetScale, 0.18);
      const s = currentScaleRef.current;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(calc(${cx}px - 50%), calc(${cy}px - 50%)) scale(${s})`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(calc(${mx}px - 50%), calc(${my}px - 50%)) scale(${s})`;
      }

      rafId = requestAnimationFrame(animate);
    };

    animate();

    const handleMouseMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
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
      isPressedRef.current = true;
    };

    const handleMouseUp = () => {
      isPressedRef.current = false;
    };

    const handleMouseLeaveWindow = () => {
      setIsVisible(false);
      isPressedRef.current = false;
    };

    const handleMouseEnterWindow = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleHover);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeaveWindow);
    document.addEventListener('mouseenter', handleMouseEnterWindow);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleHover);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      document.removeEventListener('mouseenter', handleMouseEnterWindow);
    };
  }, [isVisible, isMobile]);

  if (isMobile || !isVisible) return null;

  // Compute styles reactively based on cursorType
  const getCursorStyles = () => {
    const base = {
      position: 'fixed',
      top: 0,
      left: 0,
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      willChange: 'transform',
      zIndex: 99999,
      boxSizing: 'border-box',
      backgroundImage: 'none',
      backgroundOrigin: 'padding-box',
      backgroundClip: 'border-box',
      backdropFilter: 'none',
      transition: `
        width 0.35s cubic-bezier(0.34, 1.56, 0.64, 1),
        height 0.35s cubic-bezier(0.34, 1.56, 0.64, 1),
        border-radius 0.35s cubic-bezier(0.34, 1.56, 0.64, 1),
        background 0.3s ease,
        border-color 0.3s ease,
        box-shadow 0.3s ease
      `.trim().replace(/\s+/g, ' ')
    };

    if (cursorType === 'hover-project') {
      return {
        ...base,
        width: '154px',
        height: '46px',
        borderRadius: '100px',
        backgroundImage: 'linear-gradient(rgba(15, 15, 15, 0.75), rgba(15, 15, 15, 0.75)), linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.15) 35%, rgba(120, 120, 120, 0.3) 50%, rgba(255, 255, 255, 0.15) 65%, rgba(255, 255, 255, 0.7) 100%)',
        backgroundOrigin: 'border-box',
        backgroundClip: 'padding-box, border-box',
        border: '1.5px solid transparent',
        backdropFilter: 'blur(12px) saturate(180%)',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.25)',
      };
    }

    if (cursorType === 'hover-folder') {
      return {
        ...base,
        width: '144px',
        height: '46px',
        borderRadius: '100px',
        backgroundImage: 'linear-gradient(rgba(15, 15, 15, 0.75), rgba(15, 15, 15, 0.75)), linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.15) 35%, rgba(120, 120, 120, 0.3) 50%, rgba(255, 255, 255, 0.15) 65%, rgba(255, 255, 255, 0.7) 100%)',
        backgroundOrigin: 'border-box',
        backgroundClip: 'padding-box, border-box',
        border: '1.5px solid transparent',
        backdropFilter: 'blur(12px) saturate(180%)',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.25)',
      };
    }

    if (cursorType === 'hover-link') {
      return {
        ...base,
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        backgroundColor: 'transparent',
        border: '1.5px solid #000000',
        boxShadow: 'none',
      };
    }

    // Default state
    return {
      ...base,
      width: '16px',
      height: '16px',
      borderRadius: '50%',
      backgroundColor: '#000000',
      border: '1.5px solid transparent',
      boxShadow: 'none',
    };
  };

  const getDotStyles = () => {
    const base = {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '5px',
      height: '5px',
      borderRadius: '50%',
      backgroundColor: '#000000',
      pointerEvents: 'none',
      willChange: 'transform',
      zIndex: 100000,
      transition: 'opacity 0.2s ease',
    };

    if (cursorType === 'hover-project' || cursorType === 'hover-folder') {
      return {
        ...base,
        opacity: 0,
      };
    }

    return {
      ...base,
      opacity: 1,
    };
  };

  const getLabelStyles = () => {
    const showLabel = cursorType === 'hover-project' || cursorType === 'hover-folder';
    return {
      color: '#ffffff',
      fontSize: '13px',
      fontWeight: '600',
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      opacity: showLabel ? 1 : 0,
      transition: 'opacity 0.2s ease 0.1s',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      whiteSpace: 'nowrap',
      fontFamily: 'system-ui, sans-serif',
    };
  };

  return (
    <>
      {/* Trailing Outer Cursor (Morphs on hover) */}
      <div
        ref={cursorRef}
        style={getCursorStyles()}
      >
        <span style={getLabelStyles()}>
          {lastLabelRef.current}
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </span>
      </div>

      {/* Inner Dot (Instant tracking) */}
      <div
        ref={dotRef}
        style={getDotStyles()}
      />
    </>
  );
}
