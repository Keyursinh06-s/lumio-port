import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Accordion from '../ui/Accordion';
import PremiumButton from '../ui/PremiumButton';

const faqs = [
  {
    id: 'process',
    question: 'How does the design process work?',
    answer: 'Once you submit a request, our team reviews it, begins the design process, and delivers within the promised timeline. You can provide feedback for revisions as needed.',
  },
  {
    id: 'revisions',
    question: 'What if I need more revisions?',
    answer: 'No problem! We offer unlimited revisions to ensure your design is exactly how you envision it.',
  },
  {
    id: 'timeline',
    question: 'How long does it take to complete a request?',
    answer: 'Turnaround time depends on the complexity of the request. Standard designs take 2–3 days, while more detailed projects may require additional time.',
  },
  {
    id: 'plans',
    question: "What's the difference between the Standard and Enterprise plans?",
    answer: 'The Standard plan is great for individuals and small teams, while the Enterprise plan offers more designers, faster turnaround, and additional support for growing businesses.',
  },
  {
    id: 'communication',
    question: 'How do we communicate throughout the project?',
    answer: 'We use Slack, Async, Loom, and scheduled meetings to ensure smooth communication and keep you updated on progress.',
  },
  {
    id: 'cancel',
    question: 'Can I pause or cancel my subscription anytime?',
    answer: 'Yes! You have full control over your subscription and can pause or cancel anytime based on your needs.',
  },
];

export default function FAQSection() {
  // We initialize the first two as open to match the exact visual representation in the screenshots
  const [openItems, setOpenItems] = useState({
    process: true,
    revisions: true,
  });

  const handleToggle = (id) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 80, damping: 15 }
    }
  };

  return (
    <section id="faq" className="w-full py-8 sm:py-24 px-4 flex flex-col items-center justify-start text-center relative z-10">
      {/* FAQ Header */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={headerVariants}
        className="mb-6 sm:mb-16"
      >
        <span className="inline-block bg-brand-black text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4 shadow-sm">
          FAQ
        </span>
        <h2 className="text-3xl sm:text-5xl font-medium text-brand-black mb-4 font-heading tracking-tight" style={{ lineHeight: '0.9em' }}>
          Frequently Asked Questions
        </h2>
        <p className="text-[#707070] text-base max-w-xl mx-auto font-normal font-body" style={{ lineHeight: '22px' }}>
          Everything you need to know before getting started
        </p>
      </motion.div>

      {/* FAQ Accordions List */}
      <motion.div
        variants={listVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="w-full max-w-2xl flex flex-col gap-4 mb-12"
      >
        {faqs.map((faq) => (
          <motion.div key={faq.id} variants={itemVariants}>
            <Accordion
              question={faq.question}
              answer={faq.answer}
              isOpen={!!openItems[faq.id]}
              onToggle={() => handleToggle(faq.id)}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* CTA Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center gap-2"
      >
        <p className="text-brand-gray text-sm font-semibold">Can’t find your answer?</p>
        <PremiumButton 
          as="a" 
          href="mailto:hello@keyursinh.com" 
          style={{ width: '220px', height: '56px', transform: 'scale(0.85)' }}
          hoverText="Send me an email" 
        />
      </motion.div>
    </section>
  );
}
