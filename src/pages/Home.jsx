import React from 'react';
import HeroSection from '../components/sections/HeroSection';
import ServicesSection from '../components/sections/ServicesSection';
import ProjectsSection from '../components/sections/ProjectsSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import ProcessSection from '../components/sections/ProcessSection';
import PricingSection from '../components/sections/PricingSection';
import ToolkitSection from '../components/sections/ToolkitSection';
import NewsletterSection from '../components/sections/NewsletterSection';
import FAQSection from '../components/sections/FAQSection';
import ContactSection from '../components/sections/ContactSection';

export default function Home({ onProjectClick, activeProjectId }) {
  return (
    <div className="w-full flex flex-col items-center">
      {/* Sections stacking */}
      <HeroSection />
      
      <ServicesSection />
      
      <ProjectsSection onProjectClick={onProjectClick} activeProjectId={activeProjectId} />
      
      <TestimonialsSection />
      
      <ProcessSection />
      
      <PricingSection />
      
      <ToolkitSection />
      
      <NewsletterSection />
      
      <FAQSection />
      
      <ContactSection />
    </div>
  );
}
