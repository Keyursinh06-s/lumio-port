import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import PremiumButton from '../ui/PremiumButton';

const plans = {
  standard: {
    title: 'Standard',
    description: 'Perfect for Individuals & Small Teams',
    highlight: 'Get everything you need to kickstart your project with a high-quality design solution.',
    price: '$1500',
    period: '/ project',
    features: [
      '1 Active Request at a Time',
      '3-4 Days Turnaround',
      'Unlimited Design Requests',
      'Up to 60 Hours of Design Work Each Month',
      'Project Updates via Slack & Email',
      'Basic Project Management Support',
      'Feedback via Async & Loom',
    ],
  },
  enterprise: {
    title: 'Enterprise',
    description: 'For Businesses & Scaling Teams',
    highlight: 'Get everything you need to kickstart your project with a high-quality design solution.',
    price: '$3500',
    period: '/ project',
    features: [
      '2 Active Requests at a Time',
      '2 Days Turnaround',
      'Unlimited Design Requests',
      'Up to 120 Hours of Design Work Each Month',
      'Communication via Async, Slack, Loom & Meetings',
      'Expert Project Management',
      'Weekly Progress Meetings',
    ],
  },
};

export default function PricingSection() {
  const [selectedPlan, setSelectedPlan] = useState('standard');

  const activePlan = plans[selectedPlan];

  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="pricing" className="w-full py-24 px-4 flex flex-col items-center justify-start text-center relative z-10">
      {/* Pricing Header */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={headerVariants}
        className="mb-12"
      >
        <span className="inline-block bg-brand-black text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4 shadow-sm">
          Pricings
        </span>
        <h2 className="text-3xl sm:text-5xl font-medium text-brand-black mb-4 font-heading tracking-tight" style={{ lineHeight: '0.9em' }}>
          Tailored Plans for Every Ambition
        </h2>
        <p className="text-[#707070] text-base max-w-xl mx-auto font-normal font-body" style={{ lineHeight: '22px' }}>
          Choose a plan that fits your goals and scales with your success.
        </p>
      </motion.div>

      {/* Plan Switcher */}
      <div className="bg-[#fcfcfc] border border-brand-border-gray/30 p-1.5 rounded-full shadow-[0px_4px_12px_rgba(0,0,0,0.03)] flex items-center justify-between mb-12 relative w-[280px] h-[52px] select-none">
        <motion.div
          className="absolute top-1 bottom-1 left-1 w-[134px] bg-white rounded-full shadow-[0_3px_10px_rgba(0,0,0,0.08)] border border-brand-border-gray/25"
          animate={{ x: selectedPlan === 'standard' ? 0 : 138 }}
          transition={{ type: 'spring', stiffness: 350, damping: 28 }}
        />
        <button
          onClick={() => setSelectedPlan('standard')}
          className={`flex-1 text-center text-sm font-semibold z-10 py-2 transition-colors duration-300 ${
            selectedPlan === 'standard' ? 'text-brand-black' : 'text-brand-gray hover:text-brand-black'
          }`}
        >
          Standard
        </button>
        <button
          onClick={() => setSelectedPlan('enterprise')}
          className={`flex-1 text-center text-sm font-semibold z-10 py-2 transition-colors duration-300 ${
            selectedPlan === 'enterprise' ? 'text-brand-black' : 'text-brand-gray hover:text-brand-black'
          }`}
        >
          Enterprise
        </button>
      </div>

      {/* Plan Card */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-xl"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedPlan}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="bg-brand-white border border-brand-border-gray/30 rounded-[32px] p-6 sm:p-10 shadow-sm flex flex-col text-left relative overflow-hidden"
          >
            {/* Plan Meta */}
            <div className="mb-6">
              <h3 className="text-2xl sm:text-3xl font-medium text-brand-black mb-1">
                {activePlan.title}
              </h3>
              <p className="text-brand-gray text-xs sm:text-sm font-semibold">
                {activePlan.description}
              </p>
            </div>

            {/* Highlight Box */}
            <div className="bg-brand-bg-gray/50 border border-brand-border-gray/20 rounded-2xl p-4 mb-8">
              <p className="text-brand-black text-xs sm:text-sm font-medium leading-relaxed">
                {activePlan.highlight}
              </p>
            </div>

            {/* Features List */}
            <ul className="flex flex-col gap-4 mb-10 border-t border-brand-border-gray/20 pt-6">
              {activePlan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-brand-black text-xs sm:text-sm font-semibold border-b border-brand-border-gray/10 pb-3 last:border-0 last:pb-0">
                  <div className="w-5 h-5 rounded-full bg-brand-bg-gray flex items-center justify-center text-brand-black flex-shrink-0">
                    <Check className="w-3 h-3 stroke-[2.5]" />
                  </div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            {/* Price & Action Row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-t border-brand-border-gray/20 pt-6 mt-auto">
              <div>
                <span className="text-3xl sm:text-4xl font-medium text-brand-black tracking-tight">
                  {activePlan.price}
                </span>
                <span className="text-brand-gray text-sm font-semibold ml-1">
                  {activePlan.period}
                </span>
              </div>
              <PremiumButton hoverText="Get Started Today" />
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
