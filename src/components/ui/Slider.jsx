import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Emily Carter',
    role: 'Founder, Luxe Interiors',
    image: 'https://framerusercontent.com/images/QfNceFUxWgH3y9ILTvFqZbeg15s.png',
    text: "Keyursinh completely redefined our digital presence. From the first conversation to the final design, the process was seamless and professional. The website now reflects the luxury and sophistication of our brand, with an intuitive user experience that keeps clients engaged. The attention to detail, from typography to subtle animations, is truly remarkable. We've received countless compliments, and I couldn't be happier!",
    rating: 5,
  },
  {
    name: 'James Reynolds',
    role: 'CEO, TechNova Solutions',
    image: 'https://framerusercontent.com/images/Nxtk6CxdWWttPY9LfiUhDyF9s.jpg',
    text: '"I was blown away by the creativity and efficiency of Keyursinh. The website not only looks incredible but also functions flawlessly. The animations, responsiveness, and overall design have elevated our brand, leading to increased engagement and conversions!"',
    rating: 5,
  },
  {
    name: 'Sophia Martinez',
    role: 'Marketing Director, Elevate Agency',
    image: 'https://framerusercontent.com/images/HllViW8rE8Id8c20Q059nWey7ck.png',
    text: "Keyursinh delivered a website that exceeded all our expectations. The design is not just visually appealing but strategically structured for maximum impact. Our brand now has a digital presence that truly stands out, making it easier to connect with our audience. The communication throughout the project was excellent, and every revision was handled with precision and care. Truly a five-star experience!",
    rating: 5,
  },
  {
    name: 'Michael Thompson',
    role: 'Co-Founder, FitPro Gear',
    image: 'https://framerusercontent.com/images/fyfIz5kF0SZptIxKsUwkCMV6uZo.jpg',
    text: '"Working with Keyursinh was an absolute game-changer. The website design is not just visually stunning but also strategically built to drive results. Our customer experience has improved dramatically, and we’ve seen a noticeable boost in sales!"',
    rating: 5,
  },
  {
    name: 'Olivia Bennett',
    role: 'Creative Director, Visionary Studios',
    image: 'https://framerusercontent.com/images/nJJulDQPnkB9bUDvfeq7oOtU.png',
    text: '"Keyursinh\'s work is nothing short of extraordinary. From concept to execution, every element was carefully crafted to ensure both aesthetics and usability were top-notch. The final result was a sleek, high-performing website that perfectly captured our creative vision. I appreciated the collaborative approach and the innovative ideas they brought to the table. Looking forward to working together again!"',
    rating: 5,
  },
];

export default function Slider() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const handlePrev = () => {
    setDirection(-1);
    setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  const current = testimonials[index];

  return (
    <div className="w-full max-w-2xl mx-auto bg-brand-white border border-brand-border-gray/30 rounded-[32px] px-6 py-8 sm:px-10 sm:py-10 shadow-sm relative overflow-hidden flex flex-col items-center">
      <div className="w-full min-h-[300px] sm:min-h-[260px] relative">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={index}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex flex-col items-start text-left"
          >
            {/* Header info */}
            <div className="flex items-center gap-4 mb-6">
              <img
                src={current.image}
                alt={current.name}
                className="w-14 h-14 rounded-full object-cover border border-black/5"
              />
              <div>
                <h4 className="font-semibold text-base sm:text-lg text-brand-black">
                  {current.name}
                </h4>
                <p className="text-brand-gray text-xs sm:text-sm">
                  {current.role}
                </p>
              </div>
            </div>

            {/* Testimonial body */}
            <blockquote className="text-brand-black text-sm sm:text-base leading-relaxed mb-6 font-medium italic">
              {current.text}
            </blockquote>

            {/* Stars */}
            <div className="flex gap-1 text-black">
              {Array.from({ length: current.rating }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-black stroke-black" />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation arrows */}
      <div className="flex items-center gap-4 mt-6">
        <button
          onClick={handlePrev}
          className="w-10 h-10 rounded-full bg-brand-black text-white hover:bg-brand-black/90 active:scale-95 transition-all flex items-center justify-center shadow-md"
          aria-label="Previous testimonial"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <button
          onClick={handleNext}
          className="w-10 h-10 rounded-full bg-brand-black text-white hover:bg-brand-black/90 active:scale-95 transition-all flex items-center justify-center shadow-md"
          aria-label="Next testimonial"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
