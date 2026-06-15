import React from 'react';
import { motion } from 'framer-motion';
import FolderCard from '../ui/FolderCard';
import VelocityScrollItem from '../ui/VelocityScrollItem';

const services = [
  {
    title: 'Website Design',
    images: [
      'https://images.unsplash.com/photo-1507238692062-5409e584d84a?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop',
    ],
  },
  {
    title: 'App Design',
    images: [
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1526498460520-4c246339dccb?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?q=80&w=600&auto=format&fit=crop',
    ],
  },
  {
    title: 'Framer Development',
    images: [
      'https://images.unsplash.com/photo-1618788372246-ce5f4ef0f6d2?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=600&auto=format&fit=crop',
    ],
  },
  {
    title: 'Branding',
    images: [
      'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1557683311-eac922347aa1?q=80&w=600&auto=format&fit=crop',
    ],
  },
  {
    title: 'Pitch Decks',
    images: [
      'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop',
    ],
  },
  {
    title: 'Logos',
    images: [
      'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=600&auto=format&fit=crop',
    ],
  },
];

export default function ServicesSection() {
  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 15,
      },
    },
  };

  return (
    <section
      id="services"
      className="w-full py-10 sm:py-24 px-4 flex flex-col items-center justify-start text-center relative z-10"
    >
      {/* Services Header */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={headerVariants}
        className="mb-8 sm:mb-16"
      >
        <span className="inline-block bg-brand-black text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4 shadow-sm">
          Services
        </span>
        <h2 className="text-3xl sm:text-5xl font-medium text-brand-black mb-4 font-heading tracking-tight" style={{ lineHeight: '0.9em' }}>
          Tailored Solutions, Impactful Result
        </h2>
        <p className="text-[#707070] text-base max-w-xl mx-auto font-normal font-body" style={{ lineHeight: '22px' }}>
          Delivering innovative, results-driven solutions that elevate your brand and business
        </p>
      </motion.div>

      {/* Grid of Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
      >
        {services.map((service, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{ y: -6 }}
            className="flex justify-center"
          >
            <VelocityScrollItem>
              <FolderCard title={service.title} images={service.images} />
            </VelocityScrollItem>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
