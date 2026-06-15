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

// SVG petal paths from the provided design (viewBox 719×566)
const PETAL_PATHS = [
  // 0 — Left outer
  "M30.0708 429.723C-9.64301 410.723 3.52112 331.555 30.2725 301.518L42.8556 285.724C63.6593 263.591 101.301 263.681 123.435 284.484L276.757 430.745C287.345 440.846 289.101 457.112 280.913 469.24L274.566 478.639C267.287 489.421 253.888 494.282 241.389 490.676L30.0708 429.723Z",
  // 1 — Left inner
  "M243.811 103.188C228.279 76.1185 191.808 67.8755 162.351 84.7771L117.187 110.691C87.7293 127.593 76.4407 163.239 91.9726 190.309L274.489 405.065C283.559 415.553 296.766 414.806 308.883 408.065C320.744 401.467 328.49 391.013 324.797 377.952L243.811 103.188Z",
  // 2 — Center (selected)
  "M275 64.0899C275 28.694 302.837 0 337.176 0H389.824C424.163 0 452 28.694 452 64.0899L380.817 376.61C378.9 385.028 371.415 391 362.781 391C354.117 391 346.614 384.987 344.727 376.531L275 64.0899Z",
  // 3 — Right inner
  "M476.914 103.188C492.446 76.1185 528.916 67.8755 558.374 84.7771L603.538 110.691C632.995 127.593 644.284 163.239 628.752 190.309L446.235 405.065C437.166 415.553 423.959 414.806 411.842 408.065C399.981 401.467 392.234 391.013 395.928 377.952L476.914 103.188Z",
  // 4 — Right outer
  "M689.023 429.723C728.737 410.723 715.573 331.555 688.821 301.518L676.238 285.724C655.434 263.591 617.792 263.681 595.659 284.484L442.337 430.745C431.749 440.846 429.993 457.112 438.181 469.24L444.527 478.639C451.807 489.421 465.206 494.282 477.705 490.676L689.023 429.723Z",
];

// Rotation angle to fold each petal into center for close animation
const FOLD_ANGLES = [66, 33, 0, -33, -66];

// Stagger delays (center petal first, then outward)
const OPEN_DELAYS = [0.16, 0.08, 0, 0.08, 0.16];

// Icon positions on each petal (% of viewBox 719×566)
const ICON_POS = [
  { x: 11.6, y: 65.0 },   // Left outer
  { x: 25.2, y: 31.4 },   // Left inner
  { x: 50.6, y: 15.0 },   // Center
  { x: 75.1, y: 31.4 },   // Right inner
  { x: 88.2, y: 65.0 },   // Right outer
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
                viewBox="0 0 719 566"
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
                        transformOrigin: '357px 460px',
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
                  <div
                    key={`nav-wrap-${item.id}`}
                    style={{
                      position: 'absolute',
                      left: `${ICON_POS[i].x}%`,
                      top: `${ICON_POS[i].y}%`,
                      transform: 'translate(-50%, -50%)',
                      pointerEvents: 'none',
                    }}
                  >
                    <motion.button
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
                            ? '#1F2937'
                            : 'rgba(31, 41, 55, 0.45)',
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
                            ? '#1F2937'
                            : 'rgba(31, 41, 55, 0.45)',
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
                            ? '#1E1E1E'
                            : '#D1D5DB',
                          transition: 'background-color 0.2s',
                        }}
                      />
                    </motion.button>
                  </div>
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
