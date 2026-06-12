import React, { useState } from 'react';
import { motion } from 'framer-motion';

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

  const socialLinks = [
    { icon: Twitter, url: 'https://x.com/zaidkhan3419', label: 'Twitter' },
    { icon: Instagram, url: 'https://www.instagram.com/frontendzaid', label: 'Instagram' },
    { icon: Linkedin, url: 'https://www.linkedin.com/in/zaidkhan3419/', label: 'LinkedIn' },
  ];

  return (
    <section id="contact" className="w-full pt-24 pb-32 sm:pb-24 px-4 flex flex-col items-center justify-start text-center relative z-10">
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

          {/* Social Icons */}
          <div className="flex items-center gap-2">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-brand-bg-gray border border-brand-border-gray/20 flex items-center justify-center text-brand-black/60 hover:text-black hover:shadow-sm active:scale-95 transition-all duration-200"
                  aria-label={social.label}
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>
        </div>
      </motion.div>

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
