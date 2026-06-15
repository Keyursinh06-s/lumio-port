import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import PremiumButton from '../ui/PremiumButton';

const Twitter = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
  </svg>
);

const Instagram = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Linkedin = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const mockups = [
  {
    src: 'https://framerusercontent.com/images/S99DJAeZh2BALqWKamKdo2Kn6DQ.png',
    alt: 'AI Cosmetology Mockup',
  },
  {
    src: 'https://framerusercontent.com/images/rIcP3eFPlA8GRDhBau8zj5ApmI.webp',
    alt: 'Reeline Productivity Mockup',
  },
  {
    src: 'https://framerusercontent.com/images/31INRFd8CO7VXvGsdzUMFHO4.webp',
    alt: 'Solomaze Mental Health Mockup',
  },
];

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const socialLinks = [
    { icon: Twitter, url: 'https://x.com/zaidkhan3419', label: 'Twitter' },
    { icon: Instagram, url: 'https://www.instagram.com/frontendzaid', label: 'Instagram' },
    { icon: Linkedin, url: 'https://www.linkedin.com/in/zaidkhan3419/', label: 'LinkedIn' },
  ];

  const handlePlansClick = () => {
    const element = document.getElementById('pricing');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Double the mockups for seamless infinite scroll
  const scrollMockups = [...mockups, ...mockups];

  return (
    <section id="hero" className="w-full min-h-fit sm:min-h-screen pt-8 sm:pt-28 pb-6 sm:pb-16 px-4 flex flex-col items-center justify-start text-center relative z-10 overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-4xl flex flex-col items-center"
      >
        {/* Top Status & Social Row */}
        <motion.div
          variants={itemVariants}
          className="flex flex-row items-center gap-2.5 sm:gap-4 bg-white/40 backdrop-blur-sm px-3.5 py-2 sm:px-6 sm:py-3 rounded-full border border-black/5 shadow-sm mb-3 sm:mb-8 w-auto max-w-[95vw] sm:max-w-none"
        >
          {/* Avatar & Name */}
          <div className="flex items-center gap-2.5">
            <img
              src="/logo.png"
              alt="lumio logo"
              className="h-5 sm:h-6 w-auto object-contain"
            />
            <div className="text-left">
              <h3 className="font-semibold text-brand-black text-xs sm:text-sm">Keyursinh</h3>
              <p className="text-[9px] sm:text-[11px] text-brand-gray">Web Designer, developer</p>
            </div>
          </div>
          
          <div className="h-4 sm:h-6 w-px bg-black/10" />
          
          {/* Availability Status */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] sm:text-xs font-semibold text-brand-black">3 Open slots</span>
          </div>

          <div className="hidden sm:block h-6 w-px bg-black/10" />

          {/* Social Icons (Desktop only) */}
          <div className="hidden sm:flex items-center gap-2">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-white border border-brand-border-gray/30 flex items-center justify-center text-brand-black/60 hover:text-black hover:shadow-sm active:scale-95 transition-all duration-200"
                  aria-label={social.label}
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>
        </motion.div>

        {/* Rating Badge */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-2 bg-white px-4 py-1.5 rounded-full border border-brand-border-gray/20 shadow-sm mb-6 sm:mb-6"
        >
          <div className="flex gap-0.5 text-black">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-black stroke-black" />
            ))}
          </div>
          <span className="text-xs font-bold text-brand-black">100+ Satisfied Customers</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-6xl md:text-[64px] font-medium text-brand-black tracking-tight mb-3 sm:mb-6 max-w-3xl font-heading"
          style={{ lineHeight: '0.9em' }}
        >
          I craft websites that hustle as hard as you do
        </motion.h1>

        {/* Subtext */}
        <motion.p
          variants={itemVariants}
          className="text-base text-[#707070] max-w-2xl mb-3 sm:mb-8 font-normal font-body"
          style={{ lineHeight: '22px' }}
        >
          I design innovative solutions that captivate audiences, and every interaction inspires action.
        </motion.p>

        {/* CTA Button — Premium with label morph */}
        <motion.div variants={itemVariants} className="mb-3 sm:mb-16">
          <PremiumButton onClick={handlePlansClick} hoverText="View Plans & Pricing" />
        </motion.div>
      </motion.div>

      {/* Full-width Mockup Marquee — Large cards with 3D tilt */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-full overflow-hidden relative mt-0 sm:mt-4"
        style={{ perspective: '1200px' }}
      >
        <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,black_8%,black_92%,transparent_100%)]">
          <div className="animate-hero-marquee flex gap-8 items-center">
            {scrollMockups.map((mockup, index) => (
              <div
                key={`mockup-${index}`}
                className="flex-shrink-0 w-[280px] sm:w-[480px] md:w-[560px] bg-white rounded-[20px] border border-black/5 shadow-2xl overflow-hidden"
                style={{
                  transform: 'rotateY(-2deg) rotateX(2deg)',
                  transformStyle: 'preserve-3d',
                }}
              >
                <img
                  src={mockup.src}
                  alt={mockup.alt}
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
