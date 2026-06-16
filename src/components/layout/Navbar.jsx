import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import PremiumButton from '../ui/PremiumButton';
import Magnetic from '../ui/Magnetic';
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
      className="p-1.5 sm:p-3 rounded-full bg-transparent border-0 outline-none hover:bg-black/5 text-black/60 hover:text-black transition-colors duration-200 relative group flex items-center justify-center origin-bottom"
      aria-label={label}
    >
      {children}
      <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
        {label}
      </span>
    </motion.button>
  );
}function MobileFanNav({ currentPath, onNavigate }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('work'); // 'blog' | 'about' | 'work' | 'services' | 'contact'
  const pointerStartY = useRef(null);
  const ignoreNextHubClick = useRef(false);

  // Observer to track section scroll visibility
  useEffect(() => {
    const sectionIds = ['blog', 'process', 'projects', 'services', 'contact', 'hero'];
    const observerOptions = {
      root: null,
      rootMargin: '-35% 0px -35% 0px',
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          if (id === 'hero') setActiveSection('home');
          else if (id === 'blog') setActiveSection('blog');
          else if (id === 'process') setActiveSection('about');
          else if (id === 'projects') setActiveSection('work');
          else if (id === 'services') setActiveSection('services');
          else if (id === 'contact') setActiveSection('contact');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Listen to hashchange to sync initial active section on page load / hash jump
  const syncHashRoute = useCallback(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#/section/')) {
      const sectionId = hash.replace('#/section/', '');
      if (sectionId === 'hero') setActiveSection('home');
      else if (sectionId === 'blog') setActiveSection('blog');
      else if (sectionId === 'process') setActiveSection('about');
      else if (sectionId === 'projects') setActiveSection('work');
      else if (sectionId === 'services') setActiveSection('services');
      else if (sectionId === 'contact') setActiveSection('contact');
    }
  }, []);

  useEffect(() => {
    syncHashRoute();
    window.addEventListener('hashchange', syncHashRoute);
    return () => window.removeEventListener('hashchange', syncHashRoute);
  }, [syncHashRoute]);

  // Global escape key listener to close menu
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        const hubEl = document.getElementById('lumioHub');
        if (hubEl) hubEl.focus();
      }
    };
    document.addEventListener('keydown', handleGlobalKeyDown);
    return () => document.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isOpen]);

  const handleNavClick = (route) => {
    let sectionId = 'hero';
    if (route === '#blog') sectionId = 'blog';
    else if (route === '#about') sectionId = 'process';
    else if (route === '#work') sectionId = 'projects';
    else if (route === '#services') sectionId = 'services';
    else if (route === '#contact') sectionId = 'contact';
    else if (route === '#home') sectionId = 'hero';
    else if (route === '#chat') sectionId = 'contact';

    if (currentPath !== 'home') {
      onNavigate('home', sectionId);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }

    setTimeout(() => {
      setIsOpen(false);
    }, 120);
  };

  const handleHubClick = () => {
    if (ignoreNextHubClick.current) {
      ignoreNextHubClick.current = false;
      return;
    }
    setIsOpen(!isOpen);
  };

  const handleHubKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen(!isOpen);
    } else if (e.key === 'ArrowUp' && !isOpen) {
      e.preventDefault();
      setIsOpen(true);
      setTimeout(() => {
        const activePetal = document.querySelector('.petal[aria-current="page"]');
        if (activePetal) {
          activePetal.focus();
        } else {
          const workPetal = document.querySelector('.petal.work');
          if (workPetal) workPetal.focus();
        }
      }, 360);
    } else if (e.key === 'ArrowDown' && isOpen) {
      e.preventDefault();
      setIsOpen(false);
    }
  };

  const handlePetalKeyDown = (e, index) => {
    if (!isOpen) return;

    const petals = document.querySelectorAll('.petal');
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevIdx = (index - 1 + petals.length) % petals.length;
      petals[prevIdx]?.focus({ preventScroll: true });
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      const nextIdx = (index + 1) % petals.length;
      petals[nextIdx]?.focus({ preventScroll: true });
    } else if (e.key === 'ArrowDown' || e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
      const hubEl = document.getElementById('lumioHub');
      if (hubEl) hubEl.focus();
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const route = e.currentTarget.getAttribute('data-route');
      handleNavClick(route);
    }
  };

  const handlePointerDown = (e) => {
    pointerStartY.current = e.clientY;
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const handlePointerUp = (e) => {
    if (pointerStartY.current === null) return;
    const deltaY = e.clientY - pointerStartY.current;
    pointerStartY.current = null;

    if (Math.abs(deltaY) >= 24) {
      ignoreNextHubClick.current = true;
      if (deltaY < 0) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    }
  };

  const handlePointerCancel = () => {
    pointerStartY.current = null;
  };

  return (
    <>
      <div 
        className="lumio-scrim" 
        id="lumioScrim" 
        aria-hidden={!isOpen} 
        data-visible={isOpen ? "true" : "false"}
        onClick={() => setIsOpen(false)}
      />

      <nav 
        className="lumio-fan-nav" 
        id="lumioFanNav" 
        data-open={isOpen ? "true" : "false"} 
        aria-label="Primary mobile navigation"
      >
        <svg viewBox="0 0 846 517" role="img" aria-labelledby="lumioNavTitle lumioNavDesc">
          <title id="lumioNavTitle">Expandable premium glass fan navigation</title>
          <desc id="lumioNavDesc">A bottom glass dock that opens into five fan-shaped navigation items.</desc>

          <defs>
            {/* Exact clips for true per-panel backdrop blur. */}
            <clipPath id="clipBlog"><path d="M342 399H62C28 399 3 384 1 354C-2 316 18 269 55 243C83 222 112 220 140 237L359 365C380 378 368 399 342 399Z"/></clipPath>
            <clipPath id="clipAbout"><path d="M367 366L132 222C105 205 108 169 119 139C134 99 171 73 211 70C246 67 274 84 289 116L390 334C398 351 385 367 367 366Z"/></clipPath>
            <clipPath id="clipWork"><path d="M389 341L314 90C304 57 324 25 356 13C391 0 440 0 476 13C508 25 528 57 518 90L443 341C440 351 434 357 423 357H409C398 357 392 351 389 341Z"/></clipPath>
            <clipPath id="clipServices"><path d="M465 366L700 222C727 205 724 169 713 139C698 99 661 73 621 70C586 67 558 84 543 116L442 334C434 351 447 367 465 366Z"/></clipPath>
            <clipPath id="clipContact"><path d="M490 399H770C804 399 829 384 831 354C834 316 814 269 777 243C749 222 720 220 692 237L473 365C452 378 464 399 490 399Z"/></clipPath>

            <linearGradient id="petalTint" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#ffffff" stopOpacity=".50"/>
              <stop offset=".46" stopColor="#ffffff" stopOpacity=".25"/>
              <stop offset="1" stopColor="#dce5ec" stopOpacity=".30"/>
            </linearGradient>
            <linearGradient id="activePetalTint" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#ffffff" stopOpacity=".75"/>
              <stop offset=".48" stopColor="#f8fcff" stopOpacity=".45"/>
              <stop offset="1" stopColor="#dcebf5" stopOpacity=".40"/>
            </linearGradient>
            <linearGradient id="dockTint" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#ffffff" stopOpacity=".15"/>
              <stop offset="1" stopColor="#ffffff" stopOpacity=".05"/>
            </linearGradient>
            <linearGradient id="hubRing" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#ffffff"/>
              <stop offset=".55" stopColor="#f4f7f9"/>
              <stop offset="1" stopColor="#dfe6eb"/>
            </linearGradient>
            <radialGradient id="hubCore" cx="34%" cy="25%" r="82%">
              <stop offset="0" stopColor="#20252c"/>
              <stop offset=".48" stopColor="#101318"/>
              <stop offset="1" stopColor="#050609"/>
            </radialGradient>

            <filter id="petalShadow" x="-28%" y="-28%" width="156%" height="184%">
              <feDropShadow dx="0" dy="13" stdDeviation="15" floodColor="#5f6b77" floodOpacity=".17"/>
              <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#ffffff" floodOpacity=".84"/>
            </filter>
            <filter id="petalShadowHover" x="-32%" y="-32%" width="164%" height="194%">
              <feDropShadow dx="0" dy="16" stdDeviation="18" floodColor="#48545f" floodOpacity=".23"/>
              <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#ffffff" floodOpacity="1"/>
            </filter>
            <filter id="activeGlow" x="-34%" y="-34%" width="168%" height="196%">
              <feDropShadow dx="0" dy="12" stdDeviation="17" floodColor="#b5d8ee" floodOpacity=".42"/>
            </filter>
            <filter id="dockShadow" x="-18%" y="-65%" width="136%" height="250%">
              <feDropShadow dx="0" dy="14" stdDeviation="19" floodColor="#53606c" floodOpacity=".19"/>
              <feDropShadow dx="0" dy="1" stdDeviation="1.2" floodColor="#ffffff" floodOpacity=".9"/>
            </filter>
            <filter id="hubAmbientShadow" x="-70%" y="-70%" width="240%" height="240%">
              <feGaussianBlur stdDeviation="9"/>
            </filter>
            <filter id="hubRingShadow" x="-65%" y="-65%" width="230%" height="230%">
              <feDropShadow dx="0" dy="9" stdDeviation="12" floodColor="#46515d" floodOpacity=".29"/>
              <feDropShadow dx="0" dy="-1" stdDeviation="2" floodColor="#ffffff" floodOpacity=".75"/>
            </filter>
            <filter id="hubCoreShadow" x="-70%" y="-70%" width="240%" height="240%">
              <feDropShadow dx="0" dy="7" stdDeviation="8" floodColor="#000000" floodOpacity=".35"/>
            </filter>
          </defs>

          <g aria-label="Fan menu" transform="translate(7 13) scale(1 1.04) translate(0 -13)">
            {/* Blog */}
            <g 
              className="petal blog" 
              tabIndex={0} 
              role="link" 
              data-route="#blog" 
              aria-label="Blog"
              aria-current={activeSection === 'blog' ? 'page' : undefined}
              onClick={() => handleNavClick('#blog')}
              onKeyDown={(e) => handlePetalKeyDown(e, 0)}
            >
              <path className="petal-hit" d="M342 399H62C28 399 3 384 1 354C-2 316 18 269 55 243C83 222 112 220 140 237L359 365C380 378 368 399 342 399Z"/>
              <foreignObject className="glass-fo" x="0" y="0" width="846" height="517" clipPath="url(#clipBlog)">
                <div xmlns="http://www.w3.org/1999/xhtml" className="glass-surface"></div>
              </foreignObject>
              <path className="petal-tint" d="M342 399H62C28 399 3 384 1 354C-2 316 18 269 55 243C83 222 112 220 140 237L359 365C380 378 368 399 342 399Z"/>
              <path className="petal-stroke" d="M342 399H62C28 399 3 384 1 354C-2 316 18 269 55 243C83 222 112 220 140 237L359 365C380 378 368 399 342 399Z"/>
              <path className="petal-highlight" d="M57 244C84 223 112 223 138 239L354 365"/>
              <g className="petal-content">
                <g className="petal-icon" transform="translate(87 284)">
                  <path d="M0 2c6-2 11-1 16 3v25c-5-4-10-5-16-3V2Z"/>
                  <path d="M32 2c-6-2-11-1-16 3v25c5-4 10-5 16-3V2Z"/>
                  <path d="M16 5v26"/>
                </g>
                <text className="petal-label" x="103" y="349" textAnchor="middle">Blog</text>
                <circle className="petal-dot" cx="103" cy="370" r="5.2"/>
              </g>
            </g>

            {/* About */}
            <g 
              className="petal about" 
              tabIndex={0} 
              role="link" 
              data-route="#about" 
              aria-label="About"
              aria-current={activeSection === 'about' ? 'page' : undefined}
              onClick={() => handleNavClick('#about')}
              onKeyDown={(e) => handlePetalKeyDown(e, 1)}
            >
              <path className="petal-hit" d="M367 366L132 222C105 205 108 169 119 139C134 99 171 73 211 70C246 67 274 84 289 116L390 334C398 351 385 367 367 366Z"/>
              <foreignObject className="glass-fo" x="0" y="0" width="846" height="517" clipPath="url(#clipAbout)">
                <div xmlns="http://www.w3.org/1999/xhtml" className="glass-surface"></div>
              </foreignObject>
              <path className="petal-tint" d="M367 366L132 222C105 205 108 169 119 139C134 99 171 73 211 70C246 67 274 84 289 116L390 334C398 351 385 367 367 366Z"/>
              <path className="petal-stroke" d="M367 366L132 222C105 205 108 169 119 139C134 99 171 73 211 70C246 67 274 84 289 116L390 334C398 351 385 367 367 366Z"/>
              <path className="petal-highlight" d="M122 139C137 101 172 77 211 74C244 72 270 87 284 117"/>
              <g className="petal-content">
                <g className="petal-icon" transform="translate(205 140) scale(.86)">
                  <circle cx="14" cy="11" r="8.2"/>
                  <path d="M1 36c1-12 6-17 13-17s12 5 13 17"/>
                </g>
                <text className="petal-label" x="217" y="205" textAnchor="middle">About</text>
                <circle className="petal-dot" cx="217" cy="226" r="5.2"/>
              </g>
            </g>

            {/* Work */}
            <g 
              className="petal work" 
              tabIndex={0} 
              role="link" 
              data-route="#work" 
              aria-label="Work"
              aria-current={activeSection === 'work' ? 'page' : undefined}
              onClick={() => handleNavClick('#work')}
              onKeyDown={(e) => handlePetalKeyDown(e, 2)}
            >
              <path className="petal-hit" d="M389 341L314 90C304 57 324 25 356 13C391 0 440 0 476 13C508 25 528 57 518 90L443 341C440 351 434 357 423 357H409C398 357 392 351 389 341Z"/>
              <foreignObject className="glass-fo" x="0" y="0" width="846" height="517" clipPath="url(#clipWork)">
                <div xmlns="http://www.w3.org/1999/xhtml" className="glass-surface active"></div>
              </foreignObject>
              <path className="petal-tint" d="M389 341L314 90C304 57 324 25 356 13C391 0 440 0 476 13C508 25 528 57 518 90L443 341C440 351 434 357 423 357H409C398 357 392 351 389 341Z"/>
              <path className="petal-stroke" d="M389 341L314 90C304 57 324 25 356 13C391 0 440 0 476 13C508 25 528 57 518 90L443 341C440 351 434 357 423 357H409C398 357 392 351 389 341Z"/>
              <path className="petal-highlight" d="M318 89C309 59 328 30 358 18C391 6 439 6 473 18"/>
              <g className="petal-content">
                <g className="petal-icon" transform="translate(395 55) scale(1 .93)">
                  <rect x="0" y="0" width="17" height="17" rx="2.5"/>
                  <rect x="24" y="0" width="17" height="17" rx="2.5"/>
                  <rect x="0" y="24" width="17" height="17" rx="2.5"/>
                  <rect x="24" y="24" width="17" height="17" rx="2.5"/>
                </g>
                <text className="petal-label" x="416" y="134" textAnchor="middle">Work</text>
                <circle className="petal-dot" cx="416" cy="156" r="5.6"/>
              </g>
            </g>

            {/* Services */}
            <g 
              className="petal services" 
              tabIndex={0} 
              role="link" 
              data-route="#services" 
              aria-label="Services"
              aria-current={activeSection === 'services' ? 'page' : undefined}
              onClick={() => handleNavClick('#services')}
              onKeyDown={(e) => handlePetalKeyDown(e, 3)}
            >
              <path className="petal-hit" d="M465 366L700 222C727 205 724 169 713 139C698 99 661 73 621 70C586 67 558 84 543 116L442 334C434 351 447 367 465 366Z"/>
              <foreignObject className="glass-fo" x="0" y="0" width="846" height="517" clipPath="url(#clipServices)">
                <div xmlns="http://www.w3.org/1999/xhtml" className="glass-surface"></div>
              </foreignObject>
              <path className="petal-tint" d="M465 366L700 222C727 205 724 169 713 139C698 99 661 73 621 70C586 67 558 84 543 116L442 334C434 351 447 367 465 366Z"/>
              <path className="petal-stroke" d="M465 366L700 222C727 205 724 169 713 139C698 99 661 73 621 70C586 67 558 84 543 116L442 334C434 351 447 367 465 366Z"/>
              <path className="petal-highlight" d="M548 117C562 87 588 72 621 74C660 77 695 101 710 139"/>
              <g className="petal-content">
                <g className="petal-icon" transform="translate(599 142) scale(.9)">
                  <path d="M0 8 15 0l15 8-15 8L0 8Z"/>
                  <path d="m0 18 15 8 15-8"/>
                  <path d="m0 27 15 8 15-8"/>
                </g>
                <text className="petal-label" x="612" y="205" textAnchor="middle">Services</text>
                <circle className="petal-dot" cx="612" cy="226" r="5.2"/>
              </g>
            </g>

            {/* Contact */}
            <g 
              className="petal contact" 
              tabIndex={0} 
              role="link" 
              data-route="#contact" 
              aria-label="Contact"
              aria-current={activeSection === 'contact' ? 'page' : undefined}
              onClick={() => handleNavClick('#contact')}
              onKeyDown={(e) => handlePetalKeyDown(e, 4)}
            >
              <path className="petal-hit" d="M490 399H770C804 399 829 384 831 354C834 316 814 269 777 243C749 222 720 220 692 237L473 365C452 378 464 399 490 399Z"/>
              <foreignObject className="glass-fo" x="0" y="0" width="846" height="517" clipPath="url(#clipContact)">
                <div xmlns="http://www.w3.org/1999/xhtml" className="glass-surface"></div>
              </foreignObject>
              <path className="petal-tint" d="M490 399H770C804 399 829 384 831 354C834 316 814 269 777 243C749 222 720 220 692 237L473 365C452 378 464 399 490 399Z"/>
              <path className="petal-stroke" d="M490 399H770C804 399 829 384 831 354C834 316 814 269 777 243C749 222 720 220 692 237L473 365C452 378 464 399 490 399Z"/>
              <path className="petal-highlight" d="M475 365L694 239C720 223 748 223 775 244"/>
              <g className="petal-content">
                <g className="petal-icon" transform="translate(713 284) scale(.86)">
                  <path d="M0 13 35 0 23 35 15 20 0 13Z"/>
                  <path d="M15 20 35 0"/>
                </g>
                <text className="petal-label" x="728" y="349" textAnchor="middle">Contact</text>
                <circle className="petal-dot" cx="728" cy="370" r="5.2"/>
              </g>
            </g>
          </g>

          {/* Bottom dock */}
          <g transform="translate(7 16)">
            <foreignObject className="glass-fo" x="25" y="380" width="783" height="116">
              <div xmlns="http://www.w3.org/1999/xhtml" className="dock-glass"></div>
            </foreignObject>
            <rect className="dock-tint" x="25" y="380" width="783" height="116" rx="58"/>
            <rect className="dock-stroke" x="25" y="380" width="783" height="116" rx="58"/>
            <path className="dock-highlight" d="M69 382H764C782 382 796 391 803 405"/>

            {/* Home Action */}
            <g transform="translate(132 420)">
              <g 
                className="dock-action" 
                tabIndex={0} 
                role="link" 
                data-route="#home" 
                aria-label="Home" 
                aria-current={activeSection === 'home' ? 'page' : undefined}
                onClick={() => handleNavClick('#home')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleNavClick('#home');
                  }
                }}
              >
                <path d="M1 18 17 3l16 15"/>
                <path d="M5 16v20h24V16"/>
                <path d="M13 36V24h8v12"/>
                <circle className="dock-dot" cx="17" cy="48" r="4.5" />
              </g>
            </g>

            {/* Chat Action */}
            <g transform="translate(605 420)">
              <g 
                className="dock-action" 
                tabIndex={0} 
                role="link" 
                data-route="#chat" 
                aria-label="Chat" 
                aria-current={activeSection === 'contact' ? 'page' : undefined}
                onClick={() => handleNavClick('#chat')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleNavClick('#chat');
                  }
                }}
              >
                <path d="M1 1h34v26H15L3 37V27H1V1Z"/>
                <circle className="dock-dot" cx="18" cy="48" r="4.5" />
              </g>
            </g>

            {/* Premium hub */}
            <g 
              className="hub" 
              id="lumioHub" 
              tabIndex={0} 
              role="button" 
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"} 
              aria-expanded={isOpen}
              onClick={handleHubClick}
              onKeyDown={handleHubKeyDown}
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerCancel}
            >
              <circle className="hub-shadow-disc" cx="416" cy="399" r="71"/>
              <circle className="hub-outer" cx="416" cy="389" r="74"/>
              <circle className="hub-mid-ring" cx="416" cy="389" r="66"/>
              <circle className="hub-core" cx="416" cy="389" r="56"/>
              <path className="hub-core-highlight" d="M384 361A45 45 0 0 1 418 344"/>
              <circle className="lumio-focus-ring" cx="416" cy="389" r="80"/>
              <g className="hamburger">
                <line x1="394" y1="371" x2="438" y2="371"/>
                <line x1="394" y1="389" x2="438" y2="389"/>
                <line x1="394" y1="407" x2="438" y2="407"/>
              </g>
              <g className="closemark">
                <line x1="396" y1="369" x2="436" y2="409"/>
                <line x1="436" y1="369" x2="396" y2="409"/>
              </g>
            </g>
          </g>
        </svg>
      </nav>
    </>
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
        className="desktop-nav-dock hidden md:flex fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-white/90 backdrop-blur-dock border border-black/5 rounded-full px-5 py-2.5 shadow-2xl items-center gap-3.5 max-w-3xl h-[78px] overflow-visible"
      >
        <div className="flex items-center gap-3.5 pr-3 border-r border-black/10 h-full overflow-visible">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Magnetic key={item.id} range={28}>
                <DockIcon
                  mouseX={mouseX}
                  onClick={() => handleNavClick(item.id)}
                  label={item.label}
                >
                  <Icon className="w-[22px] h-[22px]" />
                </DockIcon>
              </Magnetic>
            );
          })}
        </div>
        <Magnetic range={35}>
          <PremiumButton
            onClick={() => handleNavClick('pricing')}
            className="nav-premium-btn"
            style={{ transform: 'scale(0.95)', transformOrigin: 'right center' }}
            defaultText="Let's go"
            hoverText="Pricing"
          />
        </Magnetic>
      </nav>

      {/* Mobile SVG Fan Navigation — NEW */}
      <div className="block md:hidden">
        <MobileFanNav currentPath={currentPath} onNavigate={onNavigate} />
      </div>
    </>
  );
}
