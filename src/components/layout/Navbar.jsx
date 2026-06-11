import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import PremiumButton from '../ui/PremiumButton';
import { Home, Layers, Briefcase, MessageSquare, Zap, ShieldQuestion } from 'lucide-react';

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
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav 
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-white/70 backdrop-blur-dock border border-black/5 rounded-full px-1.5 sm:px-4 py-2 shadow-2xl flex items-center gap-0.5 sm:gap-2 max-w-[95vw] md:max-w-2xl h-[58px] sm:h-[64px] overflow-visible"
    >
      <div className="flex items-center gap-0.5 sm:gap-2 pr-0.5 sm:pr-2 border-r border-black/10 h-full overflow-visible">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <DockIcon
              key={item.id}
              mouseX={mouseX}
              onClick={() => handleNavClick(item.id)}
              label={item.label}
            >
              <Icon className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
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
  );
}
