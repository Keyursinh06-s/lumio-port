import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import PremiumButton from '../ui/PremiumButton';
import { Home, Layers, Briefcase, MessageSquare, Zap, ShieldQuestion, BookOpen, User, LayoutGrid, Send } from 'lucide-react';

function DockIcon({ mouseX, onClick, label, children }) {
  const ref = useRef(null);

  // Calculate distance from mouse pointer to the center of the icon
  const distance = useTransform(mouseX, (val) => {
    if (!ref.current) return 9999;
    const bounds = ref.current.getBoundingClientRect();
    const centerX = bounds.left + bounds.width / 2;
    return val - centerX;
  });

  // Scale: 1.0 (far away) -> 1.45 (at mouse position)
  const rawScale = useTransform(distance, [-100, 0, 100], [1, 1.45, 1], { clamp: true });
  const scale = useSpring(rawScale, {
    stiffness: 220,
    damping: 24,
    mass: 0.1,
  });

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      style={{ scale, transformOrigin: 'center bottom' }}
      className="p-1 sm:p-2.5 rounded-full bg-transparent border-0 outline-none hover:bg-black/5 text-black/60 hover:text-black transition-colors duration-200 relative group flex items-center justify-center origin-bottom"
      aria-label={label}
    >
      {children}
      {/* Tooltip */}
      <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
        {label}
      </span>
    </motion.button>
  );
}

export default function Navbar({ currentPath, onNavigate }) {
  const [isOpen, setIsOpen] = useState(false);
  const mouseX = useMotionValue(Infinity);

  const navItems = [
    { id: 'hero', icon: Home, label: 'Home' },
    { id: 'services', icon: Layers, label: 'Services' },
    { id: 'projects', icon: Briefcase, label: 'Projects' },
    { id: 'testimonials', icon: MessageSquare, label: 'Testimonials' },
    { id: 'process', icon: Zap, label: 'Process' },
    { id: 'faq', icon: ShieldQuestion, label: 'FAQ' },
  ];

  const petals = [
    { id: 'newsletter', label: 'Blog', icon: BookOpen, angle: -76 },
    { id: 'process', label: 'About', icon: User, angle: -38 },
    { id: 'projects', label: 'Work', icon: LayoutGrid, angle: 0 },
    { id: 'services', label: 'Services', icon: Layers, angle: 38 },
    { id: 'contact', label: 'Contact', icon: Send, angle: 76 },
  ];

  const handleNavClick = (id) => {
    if (currentPath !== 'home') {
      onNavigate('home', id);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const petalVariants = {
    closed: (petal) => ({
      x: 0,
      y: 0,
      scale: 0,
      opacity: 0,
      transition: {
        type: 'spring',
        stiffness: 250,
        damping: 22,
        delay: (4 - petal.index) * 0.03
      }
    }),
    open: (petal) => {
      const angleRad = (petal.angle * Math.PI) / 180;
      const x = Math.round(125 * Math.sin(angleRad));
      const y = Math.round(-125 * Math.cos(angleRad));
      return {
        x,
        y,
        scale: 1,
        opacity: 1,
        transition: {
          type: 'spring',
          stiffness: 165,
          damping: 14,
          delay: petal.index * 0.04
        }
      };
    }
  };

  return (
    <>
      {/* Backdrop Dimmer for Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/15 backdrop-blur-[2px] z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Desktop/Tablet Floating Dock Navbar */}
      <nav 
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="hidden md:flex fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-white/70 backdrop-blur-dock border border-black/5 rounded-full px-4 py-2 shadow-2xl items-center gap-2 max-w-2xl h-[64px] overflow-visible"
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

      {/* Mobile Floating Bottom Bar with Radial Fan Menu */}
      <nav className="flex md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 h-[64px] w-[90vw] max-w-[340px] bg-white/70 backdrop-blur-md border border-black/5 rounded-full px-6 items-center justify-between shadow-2xl overflow-visible">
        {/* Home Button (Left) */}
        <button
          onClick={() => {
            handleNavClick('hero');
            setIsOpen(false);
          }}
          className="p-3 text-brand-black/60 hover:text-brand-black active:scale-90 transition-transform bg-transparent border-0 outline-none flex items-center justify-center cursor-pointer"
          aria-label="Go to home"
        >
          <Home className="w-5.5 h-5.5" />
        </button>

        {/* Hamburger Button (Center) */}
        <div className="relative flex items-center justify-center overflow-visible">
          {/* Fan items */}
          <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none w-0 h-0 overflow-visible">
            {petals.map((petal, idx) => {
              const Icon = petal.icon;
              return (
                <motion.button
                  key={petal.id}
                  custom={{ angle: petal.angle, index: idx }}
                  variants={petalVariants}
                  initial="closed"
                  animate={isOpen ? "open" : "closed"}
                  onClick={() => {
                    handleNavClick(petal.id);
                    setIsOpen(false);
                  }}
                  className="absolute w-[72px] h-[92px] bg-white/95 backdrop-blur-md border border-black/5 shadow-[0_8px_30px_rgba(0,0,0,0.06)] rounded-[36px_36px_20px_20px] flex flex-col items-center justify-center gap-1 cursor-pointer active:scale-95 transition-transform origin-bottom pointer-events-auto"
                  style={{
                    left: '-36px', // w-[72px]/2
                    top: '-46px',  // h-[92px]/2
                  }}
                  aria-label={`Go to ${petal.label}`}
                >
                  <Icon className="w-5 h-5 text-brand-black/70" />
                  <span className="text-[10px] font-bold text-brand-black tracking-tight">{petal.label}</span>
                  <span className="w-1 h-1 rounded-full bg-black/20" />
                </motion.button>
              );
            })}
          </div>

          {/* Central Black Hamburger Button */}
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="w-14 h-14 rounded-full bg-brand-black flex items-center justify-center text-white shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer relative z-50 border-0 outline-none"
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-6 flex flex-col items-center justify-center">
              <motion.span
                animate={{
                  rotate: isOpen ? 45 : 0,
                  y: isOpen ? 0 : -6
                }}
                className="absolute w-5 h-0.5 bg-white rounded-full"
              />
              <motion.span
                animate={{
                  opacity: isOpen ? 0 : 1
                }}
                className="absolute w-5 h-0.5 bg-white rounded-full"
              />
              <motion.span
                animate={{
                  rotate: isOpen ? -45 : 0,
                  y: isOpen ? 0 : 6
                }}
                className="absolute w-5 h-0.5 bg-white rounded-full"
              />
            </div>
          </button>
        </div>

        {/* Chat Button (Right) */}
        <button
          onClick={() => {
            handleNavClick('contact');
            setIsOpen(false);
          }}
          className="p-3 text-brand-black/60 hover:text-brand-black active:scale-90 transition-transform bg-transparent border-0 outline-none flex items-center justify-center cursor-pointer"
          aria-label="Go to contact"
        >
          <MessageSquare className="w-5.5 h-5.5" />
        </button>
      </nav>
    </>
  );
}
