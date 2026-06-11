import React, { useRef } from 'react';

export default function PremiumButton({ 
  as: Component = 'button', 
  href, 
  onClick, 
  className = '', 
  style = {},
  defaultText = "Let's go", 
  hoverText = "View Plans & Pricing",
  ...props 
}) {
  const buttonRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    buttonRef.current.style.setProperty("--mouse-x", `${x}%`);
    buttonRef.current.style.setProperty("--mouse-y", `${y}%`);
  };

  return (
    <Component
      ref={buttonRef}
      href={href}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      className={`morph-btn ${className}`}
      style={style}
      {...props}
    >
      <span className="text-wrap">
        <span className="text-primary">
          {defaultText}
        </span>
        <span className="text-secondary">
          {hoverText}
        </span>
      </span>
    </Component>
  );
}
