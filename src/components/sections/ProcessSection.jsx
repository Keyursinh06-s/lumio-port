import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const steps = [
  {
    step: 'Step #1',
    title: 'Choose Your Plan',
    description: 'Find the perfect plan tailored to your needs, offering the right balance of features, flexibility, and value to help you achieve your goals effortlessly.',
  },
  {
    step: 'Step #2',
    title: 'Submit Your Request',
    description: 'Easily submit your design requirements through our private design portal, ensuring a seamless process where your vision is understood, refined, and brought to life with precision and creativity.',
  },
  {
    step: 'Step #3',
    title: 'Project Delivered with Excellence!',
    description: 'As a dedicated freelancer, I ensure your project is completed with precision and delivered within 2-3 days. With a keen eye for detail and a passion for quality, I bring your vision to life—on time and beyond expectations.',
  },
];

function StepCard({ step, idx, isEven }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-30% 0px -30% 0px' });

  return (
    <div
      ref={ref}
      className={`w-full flex flex-col md:flex-row items-start md:items-center relative ${
        isEven ? 'md:flex-row-reverse' : ''
      }`}
    >
      {/* Pulse ring when reached */}
      {isInView && (
        <motion.div
          initial={{ scale: 0.6, opacity: 0.8 }}
          animate={{ scale: 2.2, opacity: 0 }}
          style={{ x: "-50%", y: "-50%" }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: "easeOut"
          }}
          className="absolute left-[30px] top-8 md:left-1/2 md:top-1/2 w-5 h-5 rounded-full bg-brand-black/20 z-10 pointer-events-none"
        />
      )}

      {/* Timeline Dot */}
      <motion.div
        animate={{ 
          backgroundColor: isInView ? '#000000' : '#c5c6c8',
          scale: isInView ? 1.15 : 1,
        }}
        style={{ x: "-50%", y: "-50%" }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="absolute left-[30px] top-8 md:left-1/2 md:top-1/2 w-5 h-5 rounded-full border-4 border-[#ebeced] flex-shrink-0 z-20"
      />

      {/* Card Container */}
      <div className="w-full md:w-[47%] pl-14 md:pl-0">
        <motion.div
          initial={{ opacity: 0, x: isEven ? 60 : -60, y: 20 }}
          animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: isEven ? 60 : -60, y: 20 }}
          transition={{
            type: 'spring',
            stiffness: 60,
            damping: 14,
            delay: 0.1,
          }}
          className="bg-brand-white border border-brand-border-gray/30 rounded-[24px] p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow duration-300 text-left"
        >
          <span className="text-xs font-bold text-brand-gray bg-brand-bg-gray px-3 py-1 rounded-full inline-block mb-3">
            {step.step}
          </span>
          <h3 className="font-semibold text-lg sm:text-xl text-brand-black mb-3">
            {step.title}
          </h3>
          <p className="text-[#707070] text-sm sm:text-base font-normal font-body" style={{ lineHeight: '22px' }}>
            {step.description}
          </p>
        </motion.div>
      </div>

      {/* Empty spacer (for Desktop layout balancing) */}
      <div className="hidden md:block w-[47%]" />
    </div>
  );
}

export default function ProcessSection() {
  const timelineRef = useRef(null);
  const [fillProgress, setFillProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;
      const rect = timelineRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      
      // Calculate how much of the timeline container has been scrolled through
      const totalHeight = rect.height;
      const scrolledPast = windowH * 0.5 - rect.top;
      const progress = Math.min(Math.max(scrolledPast / totalHeight, 0), 1);
      setFillProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="process"
      className="w-full py-8 sm:py-24 px-4 flex flex-col items-center justify-start text-center relative z-10"
    >
      {/* Process Header */}
      <div className="mb-6 sm:mb-20">
        <span className="inline-block bg-brand-black text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4 shadow-sm">
          Process
        </span>
        <h2 className="text-3xl sm:text-5xl font-medium text-brand-black mb-4 font-heading tracking-tight" style={{ lineHeight: '0.9em' }}>
          Getting your projects done has never been easier
        </h2>
        <p className="text-[#707070] text-base max-w-xl mx-auto font-normal font-body" style={{ lineHeight: '22px' }}>
          Say goodbye to outdated hiring methods and experience the difference firsthand
        </p>
      </div>

      {/* Timeline Container */}
      <div ref={timelineRef} className="w-full max-w-4xl relative flex flex-col items-center">
        {/* Background gray line */}
        <div className="absolute left-[30px] md:left-1/2 -translate-x-1/2 top-4 bottom-4 w-0.5 bg-black/10 z-0" />
        
        {/* Animated black fill line — grows with scroll */}
        <div 
          className="absolute left-[30px] md:left-1/2 top-4 bottom-4 w-0.5 bg-brand-black z-[1] origin-top"
          style={{ 
            transform: `translateX(-50%) scaleY(${fillProgress})`,
            transition: 'transform 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        />

        {/* Steps */}
        <div className="w-full flex flex-col gap-12 relative z-10">
          {steps.map((step, idx) => (
            <StepCard
              key={idx}
              step={step}
              idx={idx}
              isEven={idx % 2 === 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
