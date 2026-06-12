import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import PremiumButton from '../ui/PremiumButton';
import { Home, Layers, Briefcase, MessageSquare, Zap, ShieldQuestion, BookOpen, User, LayoutGrid, Send } from 'lucide-react';

/* ===================================================
   DESKTOP DOCK ICON — completely unchanged
=================================================== */
function DockIcon({ mouseX, onClick, label, children }) {
  const ref = useRef(null);
  const distance = useTransform(mouseX, (val) => {
    if (!ref.current) return 9999;
    const bounds = ref.current.getBoundingClientRect();
    return val - (bounds.left + bounds.width / 2);
  });
  const rawScale = useTransform(distance, [-100, 0, 100], [1, 1.45, 1], { clamp: true });
  const scale = useSpring(rawScale, { stiffness: 220, damping: 24, mass: 0.1 });

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      style={{ scale, transformOrigin: 'center bottom' }}
      className="p-1 sm:p-2.5 rounded-full bg-transparent border-0 outline-none hover:bg-black/5 text-black/60 hover:text-black transition-colors duration-200 relative group flex items-center justify-center origin-bottom"
      aria-label={label}
    >
      {children}
      <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
        {label}
      </span>
    </motion.button>
  );
}

/* ===================================================
   SVG FAN NAVIGATION — CONSTANTS
=================================================== */

const NAV_ITEMS = [
  { id: 'newsletter', label: 'Blog', icon: BookOpen },
  { id: 'process', label: 'About', icon: User },
  { id: 'projects', label: 'Work', icon: LayoutGrid },
  { id: 'services', label: 'Services', icon: Layers },
  { id: 'contact', label: 'Contact', icon: Send },
];

// SVG petal paths from the provided design (viewBox 737×470)
const PETAL_PATHS = [
  // 0 — Left outer
  "M53.0708 396.499C13.357 377.499 26.5211 298.331 53.2725 268.294L65.8556 252.5C86.6593 230.367 124.301 230.457 146.435 251.26L299.757 397.521C310.345 407.622 312.101 423.888 303.913 436.016L297.566 445.415C290.287 456.196 276.888 461.058 264.389 457.452L53.0708 396.499Z",
  // 1 — Left inner
  "M276.666 97.1884C261.135 70.1185 224.664 61.8755 195.206 78.7771L150.042 104.691C120.585 121.593 109.296 157.239 124.828 184.309L307.345 399.065C316.414 409.553 329.621 408.806 341.738 402.065C353.599 395.467 361.346 385.013 357.652 371.952L276.666 97.1884Z",
  // 2 — Center (selected)
  "M291.855 64.0899C291.855 28.694 319.692 0 354.031 0H406.68C441.018 0 468.855 28.694 468.855 64.0899L397.673 376.61C395.755 385.028 388.27 391 379.637 391C370.973 391 363.47 384.987 361.583 376.531L291.855 64.0899Z",
  // 3 — Right inner
  "M484.183 97.6235C499.715 70.5536 536.186 62.3105 565.643 79.2122L610.808 105.126C640.265 122.028 651.553 157.674 636.022 184.744L453.505 399.5C444.435 409.988 431.229 409.241 419.112 402.5C407.25 395.902 399.504 385.448 403.198 372.387L484.183 97.6235Z",
  // 4 — Right outer
  "M706.878 396.499C746.592 377.499 733.428 298.331 706.677 268.294L694.094 252.5C673.29 230.367 635.648 230.457 613.514 251.26L460.192 397.521C449.604 407.622 447.848 423.888 456.037 436.016L462.383 445.415C469.662 456.196 483.061 461.058 495.56 457.452L706.878 396.499Z",
];

// Rotation angle to fold each petal into center for close animation
const FOLD_ANGLES = [66, 33, 0, -33, -66];

// Stagger delays (center petal first, then outward)
const OPEN_DELAYS = [0.16, 0.08, 0, 0.08, 0.16];

// Icon positions on each petal (% of viewBox 737×470)
const ICON_POS = [
  { x: 23.7, y: 75.5 },   // Left outer
  { x: 31.9, y: 46.8 },   // Left inner
  { x: 51.6, y: 36.2 },   // Center
  { x: 68.1, y: 46.8 },   // Right inner
  { x: 76.3, y: 75.5 },   // Right outer
];

// Render order: outer petals behind, center in front
const Z_ORDER = [0, 4, 1, 3, 2];

/* ===================================================
   MOBILE SVG FAN NAVIGATION COMPONENT
   Apple-inspired glassmorphic radial fan
=================================================== */
function MobileFanNav({ currentPath, onNavigate }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState('projects');
  const navRef = useRef(null);
  const toggleRef = useRef(false);

  // Arrange items so selected is always at center (position 2)
  const arranged = useMemo(() => {
    const si = NAV_ITEMS.findIndex(n => n.id === selectedId);
    return [0, 1, 2, 3, 4].map(p => NAV_ITEMS[(si + p - 2 + 5) % 5]);
  }, [selectedId]);

  const handleNavClick = useCallback((id) => {
    setSelectedId(id);
    setIsOpen(false);
    if (currentPath !== 'home') {
      onNavigate('home', id);
    } else {
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 200);
    }
  }, [currentPath, onNavigate]);

  // Close on outside tap
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener('pointerdown', handler);
    return () => document.removeEventListener('pointerdown', handler);
  }, [isOpen]);

  // Prevent double-trigger
  const handleToggle = useCallback(() => {
    if (toggleRef.current) return;
    toggleRef.current = true;
    setIsOpen(v => !v);
    setTimeout(() => { toggleRef.current = false; }, 400);
  }, []);

  return (
    <nav
      ref={navRef}
      className="mobile-fan-nav"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pointerEvents: 'none',
        paddingBottom: 'max(8px, env(safe-area-inset-bottom, 8px))',
      }}
    >
      {/* ---- Dim backdrop ---- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.05)',
              backdropFilter: 'blur(3px)',
              WebkitBackdropFilter: 'blur(3px)',
              zIndex: -1,
              pointerEvents: 'auto',
            }}
          />
        )}
      </AnimatePresence>

      {/* ---- Fan petals + icons ---- */}
      <div style={{
        position: 'relative',
        width: 'min(100vw, 420px)',
        pointerEvents: 'none',
      }}>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.12 }}
              style={{ width: '100%', position: 'relative' }}
            >
              {/* SVG fan shape */}
              <svg
                viewBox="0 0 737 470"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  overflow: 'visible',
                  filter: 'drop-shadow(0 6px 16px rgba(0,0,0,0.08))',
                }}
              >
                {Z_ORDER.map(i => {
                  const isCenter = i === 2;
                  const item = arranged[i];
                  return (
                    <motion.path
                      key={`petal-${i}`}
                      d={PETAL_PATHS[i]}
                      fill={
                        i === 2
                          ? 'rgba(255, 255, 255, 0.96)'
                          : (i === 1 || i === 3)
                          ? 'rgba(243, 242, 244, 0.88)'
                          : 'rgba(232, 230, 235, 0.88)'
                      }
                      stroke={
                        i === 2
                          ? 'rgba(255, 255, 255, 0.9)'
                          : (i === 1 || i === 3)
                          ? 'rgba(255, 255, 255, 0.6)'
                          : 'rgba(255, 255, 255, 0.45)'
                      }
                      strokeWidth="1.5"
                      style={{
                        transformOrigin: '380px 465px',
                        transformBox: 'view-box',
                        cursor: 'pointer',
                        pointerEvents: 'auto',
                      }}
                      onClick={() => handleNavClick(item.id)}
                      initial={{
                        scale: 0.12,
                        opacity: 0,
                        rotate: FOLD_ANGLES[i],
                      }}
                      animate={{
                        scale: 1,
                        opacity: 1,
                        rotate: 0,
                      }}
                      exit={{
                        scale: 0.12,
                        opacity: 0,
                        rotate: FOLD_ANGLES[i],
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 155,
                        damping: 16,
                        mass: 0.75,
                        delay: OPEN_DELAYS[i],
                      }}
                    />
                  );
                })}
              </svg>

              {/* Icon labels overlaid on each petal */}
              {[0, 1, 2, 3, 4].map(i => {
                const item = arranged[i];
                const Icon = item.icon;
                const isCenter = i === 2;

                return (
                  <motion.button
                    key={`nav-${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{
                      type: 'spring',
                      stiffness: 200,
                      damping: 20,
                      delay: OPEN_DELAYS[i] + 0.06,
                    }}
                    whileTap={{ scale: 0.85 }}
                    style={{
                      position: 'absolute',
                      left: `${ICON_POS[i].x}%`,
                      top: `${ICON_POS[i].y}%`,
                      transform: 'translate(-50%, -50%)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '4px',
                      background: 'transparent',
                      border: 'none',
                      outline: 'none',
                      cursor: 'pointer',
                      padding: '8px 10px',
                      WebkitTapHighlightColor: 'transparent',
                      pointerEvents: 'auto',
                    }}
                    aria-label={`Go to ${item.label}`}
                  >
                    <Icon
                      style={{
                        width: isCenter ? '26px' : '22px',
                        height: isCenter ? '26px' : '22px',
                        strokeWidth: 1.75,
                        color: isCenter
                          ? 'rgba(0,0,0,0.82)'
                          : 'rgba(0,0,0,0.42)',
                        transition: 'color 0.2s',
                      }}
                    />
                    <span
                      style={{
                        fontSize: isCenter ? '12px' : '11px',
                        fontWeight: 600,
                        lineHeight: 1,
                        letterSpacing: '-0.01em',
                        color: isCenter
                          ? 'rgba(0,0,0,0.82)'
                          : 'rgba(0,0,0,0.42)',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", Geist, Inter, sans-serif',
                        whiteSpace: 'nowrap',
                        transition: 'color 0.2s',
                      }}
                    >
                      {item.label}
                    </span>
                    <span
                      style={{
                        width: '4px',
                        height: '4px',
                        borderRadius: '50%',
                        backgroundColor: isCenter
                          ? 'rgba(0,0,0,0.28)'
                          : 'rgba(0,0,0,0.12)',
                        transition: 'background-color 0.2s',
                      }}
                    />
                  </motion.button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ---- Bottom dock bar (glassmorphism) ---- */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: 'min(82vw, 310px)',
          height: '60px',
          borderRadius: '30px',
          padding: '0 26px',
          pointerEvents: 'auto',
          position: 'relative',
          zIndex: 10,
          marginTop: '-16px',
          background: 'rgba(242, 242, 243, 0.82)',
          backdropFilter: 'blur(24px) saturate(1.6)',
          WebkitBackdropFilter: 'blur(24px) saturate(1.6)',
          boxShadow: `
            0 16px 40px rgba(0,0,0,0.07),
            0 6px 16px rgba(0,0,0,0.04),
            inset 0 1px 0 rgba(255,255,255,0.65)
          `,
          border: '1px solid rgba(255,255,255,0.45)',
        }}
      >
        {/* Home button */}
        <button
          onClick={() => handleNavClick('hero')}
          style={{
            padding: '10px',
            background: 'transparent',
            border: 'none',
            outline: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'rgba(0,0,0,0.38)',
            WebkitTapHighlightColor: 'transparent',
            transition: 'color 0.2s',
          }}
          aria-label="Go to home"
        >
          <Home style={{ width: '24px', height: '24px', strokeWidth: 1.75 }} />
        </button>

        {/* Central hamburger button (black circle with white ring) */}
        <div style={{ position: 'relative' }}>
          <motion.button
            onClick={handleToggle}
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              border: '6px solid rgba(249,249,250,0.92)',
              outline: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              top: '-14px',
              background: 'radial-gradient(circle at 50% 28%, #2a2a2a 0%, #000 100%)',
              boxShadow: '0 10px 28px rgba(0,0,0,0.28), 0 4px 10px rgba(0,0,0,0.15)',
              WebkitTapHighlightColor: 'transparent',
              zIndex: 10,
            }}
            whileTap={{ scale: 0.92 }}
            aria-label="Toggle menu"
          >
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4.5px',
              width: '18px',
            }}>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 6.5 : 0 }}
                style={{
                  display: 'block', height: '1.8px', width: '18px',
                  backgroundColor: '#fff', borderRadius: '2px',
                  transformOrigin: 'center',
                }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              />
              <motion.span
                animate={{ opacity: isOpen ? 0 : 1, scaleX: isOpen ? 0 : 1 }}
                style={{
                  display: 'block', height: '1.8px', width: '18px',
                  backgroundColor: '#fff', borderRadius: '2px',
                }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -6.5 : 0 }}
                style={{
                  display: 'block', height: '1.8px', width: '18px',
                  backgroundColor: '#fff', borderRadius: '2px',
                  transformOrigin: 'center',
                }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </motion.button>
        </div>

        {/* Chat/Messages button */}
        <button
          onClick={() => handleNavClick('contact')}
          style={{
            padding: '10px',
            background: 'transparent',
            border: 'none',
            outline: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'rgba(0,0,0,0.38)',
            WebkitTapHighlightColor: 'transparent',
            transition: 'color 0.2s',
          }}
          aria-label="Go to contact"
        >
          <MessageSquare style={{ width: '24px', height: '24px', strokeWidth: 1.75 }} />
        </button>
      </div>
    </nav>
  );
}

/* ===================================================
   MAIN NAVBAR EXPORT
   Desktop dock (md+) | Mobile SVG fan (<md)
=================================================== */
export default function Navbar({ currentPath, onNavigate }) {
  const mouseX = useMotionValue(Infinity);

  const navItems = [
    { id: 'hero', icon: Home, label: 'Home' },
    { id: 'services', icon: Layers, label: 'Services' },
    { id: 'projects', icon: Briefcase, label: 'Projects' },
    { id: 'testimonials', icon: MessageSquare, label: 'Testimonials' },
    { id: 'process', icon: Zap, label: 'Process' },
    { id: 'faq', icon: ShieldQuestion, label: 'FAQ' },
  ];

  const handleNavClick = (id) => {
    if (currentPath !== 'home') {
      onNavigate('home', id);
    } else {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Desktop/Tablet Floating Dock Navbar — UNCHANGED */}
      <nav
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="desktop-nav-dock hidden md:flex fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-white/70 backdrop-blur-dock border border-black/5 rounded-full px-4 py-2 shadow-2xl items-center gap-2 max-w-2xl h-[64px] overflow-visible"
      >
        <div className="flex items-center gap-2 pr-2 border-r border-black/10 h-full overflow-visible">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <DockIcon
                key={item.id}
                mouseX={mouseX}
                onClick={() => handleNavClick(item.id)}
                label={item.label}
              >
                <Icon className="w-5 h-5" />
              </DockIcon>
            );
          })}
        </div>
        <PremiumButton
          onClick={() => handleNavClick('pricing')}
          className="nav-premium-btn"
          style={{ transform: 'scale(0.85)', transformOrigin: 'right center' }}
          defaultText="Let's go"
          hoverText="Pricing"
        />
      </nav>

      {/* Mobile SVG Fan Navigation — NEW */}
      <div className="block md:hidden">
        <MobileFanNav currentPath={currentPath} onNavigate={onNavigate} />
      </div>
    </>
  );
}
