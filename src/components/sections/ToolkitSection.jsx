import React from 'react';
import { motion } from 'framer-motion';
import VelocityScrollItem from '../ui/VelocityScrollItem';

const tools = [
  {
    name: 'Figma',
    desc: 'Designing intuitive with seamless collaboration',
    percentage: 90,
    icon: 'https://framerusercontent.com/images/CQXNjahUzpgM2PkGW8SjXpIJVuE.svg',
  },
  {
    name: 'Framer',
    desc: 'Building high-performance websites with animations',
    percentage: 85,
    icon: 'https://framerusercontent.com/images/Fm4HTnDiAfTAPGdv6ev7IIY33Gg.svg',
  },
  {
    name: 'Adobe Photoshop',
    desc: 'Enhancing visuals and creating stunning graphics.',
    percentage: 70,
    icon: 'https://framerusercontent.com/images/LrS6m2E45k3KAX4bIQzaYXDRE.svg',
  },
  {
    name: 'Adobe Illustrator',
    desc: 'Crafting crisp vector illustrations and branding assets',
    percentage: 65,
    icon: 'https://framerusercontent.com/images/HXQLiEPMTN2leugfK9g55OkrbBc.svg',
  },
  {
    name: 'Slack',
    desc: 'Streamlining communication for project workflows',
    percentage: 60,
    icon: 'https://framerusercontent.com/images/wc4L6wT5EbVghZmJAt7WBGhMOE.svg',
  },
  {
    name: 'Lemonsqueezy',
    desc: 'Managing payments, subscriptions, and sales',
    percentage: 58,
    icon: 'https://framerusercontent.com/images/sf3en99HLvaRdiY5N3Vq3TAZXSw.svg',
  },
];

export default function ToolkitSection() {
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
      }
    }
  };

  const toolVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 80, damping: 15 }
    }
  };

  return (
    <section
      id="toolkit"
      className="w-full py-8 sm:py-24 px-4 flex flex-col items-center justify-start text-center relative z-10"
    >
      {/* Toolkit Header */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={headerVariants}
        className="mb-6 sm:mb-16"
      >
        <span className="inline-block bg-brand-black text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4 shadow-sm">
          Toolkit
        </span>
        <h2 className="text-3xl sm:text-5xl font-medium text-brand-black mb-4 font-heading tracking-tight" style={{ lineHeight: '0.9em' }}>
          Powerful Tools, Exceptional Results
        </h2>
        <p className="text-[#707070] text-base max-w-xl mx-auto font-normal font-body" style={{ lineHeight: '22px' }}>
          Leverage cutting-edge tools and skills to bring your ideas to life with precision and impact
        </p>
      </motion.div>

      {/* Progress Bars list */}
      <VelocityScrollItem>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="w-full max-w-3xl flex flex-col gap-4"
      >
        {tools.map((tool, index) => (
          <motion.div
            key={index}
            variants={toolVariants}
            whileHover={{ scale: 1.015 }}
            className="w-full relative overflow-hidden bg-brand-white border border-brand-border-gray/30 rounded-[20px] p-3 shadow-sm flex items-center justify-between z-10 cursor-default"
          >
            {/* Animated Black Progress Bar Background */}
            <motion.div
              variants={{
                hidden: { width: 0 },
                visible: { 
                  width: `${tool.percentage}%`,
                  transition: {
                    type: 'spring',
                    stiffness: 45,
                    damping: 15,
                  }
                }
              }}
              className="absolute top-0 left-0 bottom-0 bg-brand-black rounded-l-[19px] z-0"
              style={{
                borderRadius: tool.percentage === 100 ? '19px' : '19px 0 0 19px',
              }}
            />

            {/* Left Content (Avatar Icon + Text) - Positioned over background */}
            <div className="relative z-10 flex items-center gap-4 pl-1 mix-blend-difference">
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center border border-black/5 flex-shrink-0 shadow-sm">
                <img src={tool.icon} alt={tool.name} className="w-7 h-7 object-contain" loading="lazy" decoding="async" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-sm sm:text-base text-white">
                  {tool.name}
                </h3>
                <p className="text-[10px] sm:text-xs text-white/70 max-w-[45vw] sm:max-w-md truncate font-medium">
                  {tool.desc}
                </p>
              </div>
            </div>

            {/* Right Content (Percentage Bubble) */}
            <div className="relative z-10 pr-2">
              <div className="w-12 h-10 sm:w-14 sm:h-11 rounded-full bg-brand-bg-gray flex items-center justify-center text-brand-gray border border-black/5 font-extrabold text-xs sm:text-sm shadow-inner">
                {tool.percentage}%
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
      </VelocityScrollItem>
    </section>
  );
}
