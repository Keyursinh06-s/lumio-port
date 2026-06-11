import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

export default function Accordion({ question, answer, isOpen, onToggle }) {
  return (
    <div className="bg-brand-white border border-brand-border-gray/30 rounded-[24px] px-6 py-5 shadow-sm transition-all duration-300 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center text-left focus:outline-none"
      >
        <span className="font-semibold text-base sm:text-lg text-brand-black pr-4">
          {question}
        </span>
        <div className="w-8 h-8 rounded-full bg-brand-bg-gray flex items-center justify-center text-brand-black flex-shrink-0">
          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: 'auto', opacity: 1, marginTop: 12 }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-brand-gray text-sm sm:text-base leading-relaxed border-t border-brand-border-gray/20 pt-4">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
