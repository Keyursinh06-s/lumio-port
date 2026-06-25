import React, { useState } from 'react';
import { motion } from 'framer-motion';
import VelocityScrollItem from '../ui/VelocityScrollItem';



export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) return;

    setStatus('sending');
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '' });
      setTimeout(() => setStatus('idle'), 4000);
    }, 1500);
  };


  return (
    <section id="contact" className="w-full pt-8 pb-24 sm:pb-24 px-4 flex flex-col items-center justify-start text-center relative z-10">
      <VelocityScrollItem>
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="bg-brand-white border border-brand-border-gray/30 rounded-[32px] p-6 sm:p-10 shadow-sm max-w-xl w-full flex flex-col items-center relative overflow-hidden"
      >
        {/* Contact Badge */}
        <span className="inline-block bg-brand-black text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4 shadow-sm">
          Contact
        </span>
        
        <h2 className="text-3xl sm:text-4xl font-medium text-brand-black mb-2 font-heading tracking-tight" style={{ lineHeight: '0.9em' }}>
          Get in Touch
        </h2>
        <p className="text-[#707070] text-xs sm:text-sm font-normal font-body mb-8" style={{ lineHeight: '22px' }}>
          Have a project in mind? I’ll respond within 6 hours.
        </p>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 mb-8">
          <input
            type="text"
            placeholder="Enter your name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full rounded-full border border-brand-border-gray/30 px-6 py-4 text-brand-black placeholder:text-brand-light-gray font-semibold text-sm focus:outline-none focus:border-brand-black shadow-sm bg-brand-white transition-all duration-300"
          />
          <input
            type="email"
            placeholder="Enter your email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full rounded-full border border-brand-border-gray/30 px-6 py-4 text-brand-black placeholder:text-brand-light-gray font-semibold text-sm focus:outline-none focus:border-brand-black shadow-sm bg-brand-white transition-all duration-300"
          />
          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full bg-brand-black text-white rounded-full py-4 text-center font-bold hover:bg-brand-black/90 active:scale-95 transition-all duration-200 shadow-lg mt-2 text-sm disabled:opacity-50"
          >
            {status === 'idle' && 'Send message'}
            {status === 'sending' && 'Sending...'}
            {status === 'success' && 'Message sent! ✓'}
          </button>
        </form>

        {/* Let's Connect */}
        <div className="flex flex-col items-center border-t border-brand-border-gray/20 pt-6 w-full">
          <p className="text-brand-gray text-xs font-semibold mb-2">Let’s Connect</p>
          <a
            href="tel:+123456789010"
            className="text-brand-black font-medium text-sm sm:text-base hover:underline mb-1"
          >
            +12 3456789010
          </a>
          <a
            href="mailto:hello@keyursinh.com"
            className="text-brand-black font-black text-lg sm:text-xl md:text-2xl hover:underline mb-6 tracking-tight"
          >
            hello@keyursinh.com
          </a>
        </div>
      </motion.div>
      </VelocityScrollItem>

      {/* Footer Logo & Copyright */}
      <div className="flex flex-col items-center gap-2 mt-10">
        <img 
          src="/logo.png" 
          alt="lumio logo" 
          className="h-6 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity duration-200" 
        />
        <p className="text-brand-gray text-xs font-semibold">
          © Copyright 2026 Keyursinh. All Rights Reserved.
        </p>
      </div>
    </section>
  );
}
