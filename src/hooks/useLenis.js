import { useEffect } from 'react';
import Lenis from 'lenis';

export default function useLenis() {
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,          // scroll duration in seconds
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // ease-out-expo
      smoothWheel: true,     // smooth wheel scrolling
      syncTouch: false,      // preserve native touch scroll physics on mobile devices
    });

    // Request Animation Frame loop for Lenis
    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // Intercept clicks on links that are anchors and animate them smoothly
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (!target) return;

      const href = target.getAttribute('href');
      if (href === '#' || href.startsWith('#/')) return; // ignore routing hashes

      try {
        const el = document.querySelector(href);
        if (el) {
          e.preventDefault();
          lenis.scrollTo(el, { duration: 1.2 });
        }
      } catch (err) {
        // Safe fallback for invalid selectors
      }
    };

    document.addEventListener('click', handleAnchorClick);

    // Clean up
    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('click', handleAnchorClick);
      lenis.destroy();
    };
  }, []);
}
