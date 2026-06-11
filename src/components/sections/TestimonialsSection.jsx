import React from 'react';
import { motion } from 'framer-motion';
import Slider from '../ui/Slider';
import VelocityScrollItem from '../ui/VelocityScrollItem';

export default function TestimonialsSection() {
  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="testimonials" className="w-full py-24 px-4 flex flex-col items-center justify-start text-center relative z-10">
      {/* Testimonials Header */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={headerVariants}
        className="mb-16"
      >
        <span className="inline-block bg-brand-black text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4 shadow-sm">
          Testimonials
        </span>
        <h2 className="text-3xl sm:text-5xl font-medium text-brand-black mb-4 font-heading tracking-tight" style={{ lineHeight: '0.9em' }}>
          Voices of Trust & Success
        </h2>
        <p className="text-[#707070] text-base max-w-xl mx-auto font-normal font-body" style={{ lineHeight: '22px' }}>
          Feedback from clients who turned their ideas into success with my expertise
        </p>
      </motion.div>

      {/* Slider Carousel */}
      <VelocityScrollItem>
        <Slider />
      </VelocityScrollItem>
    </section>
  );
}
