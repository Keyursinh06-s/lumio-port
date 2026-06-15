import React, { useState, useId, useRef, useEffect } from 'react';
import { useInView } from 'framer-motion';
import useMediaQuery from '../../hooks/useMediaQuery';

export default function FolderCard({ title, images = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const id = useId();
  const ref = useRef(null);
  const isMobile = useMediaQuery('(max-width: 767px)');
  const inView = useInView(ref, { once: false, margin: "-35% 0px -35% 0px" });

  useEffect(() => {
    if (isMobile) {
      setIsOpen(inView);
    } else {
      setIsOpen(false);
    }
  }, [inView, isMobile]);

  const backGradId = `backGrad${id}`;
  const frontGradId = `frontGrad${id}`;

  const isVertical = title.toLowerCase().includes('app');
  const rootClass = `folder-root${isOpen ? ' open' : ''}`;

  return (
    <div className="folder-wrapper" ref={ref}>
      <div
        className={rootClass}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onClick={() => setIsOpen((prev) => !prev)}
        data-cursor="folder"
      >
        {/* Cards with images */}
        <div className="cards">
          <div className={`card ${isVertical ? 'card-vertical' : 'card-horizontal'} card-3`}>
            {images[2] && (
              <img src={images[2]} alt={`${title} preview 3`} className="card-img" loading="lazy" decoding="async" />
            )}
          </div>
          <div className={`card ${isVertical ? 'card-vertical' : 'card-horizontal'} card-2`}>
            {images[1] && (
              <img src={images[1]} alt={`${title} preview 2`} className="card-img" loading="lazy" decoding="async" />
            )}
          </div>
          <div className={`card ${isVertical ? 'card-vertical' : 'card-horizontal'} card-1`}>
            {images[0] && (
              <img src={images[0]} alt={`${title} preview 1`} className="card-img" loading="lazy" decoding="async" />
            )}
          </div>
        </div>

        {/* Folder Back */}
        <div className="folder-back">
          <div className="folder-back-wrap">
            <svg width="180" height="147" viewBox="0 0 180 147" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 20 Q0 8 12 8 L68 8 Q74 8 77 14 L84 24 Q87 30 93 30 L168 30 Q180 30 180 42 L180 135 Q180 147 168 147 L12 147 Q0 147 0 135 Z" fill={`url(#${backGradId})`} />
              <defs>
                <linearGradient id={backGradId} x1="90" y1="0" x2="90" y2="147" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#c8c8c8" />
                  <stop offset="100%" stopColor="#b8b8b8" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Folder Front */}
        <div className="folder-front">
          <svg width="180" height="120" viewBox="0 0 180 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="0" width="180" height="120" rx="12" fill={`url(#${frontGradId})`} />
            <line x1="14" y1="6" x2="166" y2="6" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" strokeLinecap="round" />
            <defs>
              <linearGradient id={frontGradId} x1="90" y1="0" x2="90" y2="120" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#f8f8f8" />
                <stop offset="54%" stopColor="#fafafa" />
                <stop offset="100%" stopColor="#ebebeb" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      <div className="folder-label">{title}</div>
    </div>
  );
}
