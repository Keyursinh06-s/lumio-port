import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import projectsData from '../assets/projects_data.json';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import PremiumButton from '../components/ui/PremiumButton';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 85,
      damping: 16,
    },
  },
};

export default function ProjectDetail({ projectId, onNavigate, onProjectClick }) {
  // Scroll to top on mount or project change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [projectId]);

  // Find active project details
  const project = projectsData.find((p) => p.slug === projectId);

  if (!project) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center text-center p-8">
        <h2 className="text-2xl font-medium text-brand-black mb-4">Project not found</h2>
        <button
          onClick={() => onNavigate('home')}
          className="bg-brand-black text-white px-6 py-2.5 rounded-full text-sm font-semibold"
        >
          Back to home
        </button>
      </div>
    );
  }

  // Parse images from list
  const logoUrl = project.images[4];
  const heroImageUrl = project.images[5];
  const detailImages = project.images.slice(6, 10);
  const nextHeroImageUrl = project.images[10];
  const nextLogoUrl = project.images[11];

  const handleBackToHome = (e) => {
    e.preventDefault();
    onNavigate('home', 'projects');
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full pt-28 pb-32 px-4 flex flex-col items-center justify-start relative z-10"
    >
      <div className="w-full max-w-4xl">
        {/* Back Link */}
        <motion.button
          variants={itemVariants}
          onClick={handleBackToHome}
          className="flex items-center gap-2 text-brand-gray hover:text-brand-black text-sm font-bold mb-8 transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to home</span>
        </motion.button>

        {/* Top Header Card */}
        <motion.div
          variants={itemVariants}
          className="bg-brand-white border border-brand-border-gray/30 rounded-[32px] p-6 sm:p-10 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-[20px] bg-brand-black border border-black/5 flex items-center justify-center overflow-hidden flex-shrink-0 shadow-sm">
              <img
                src={logoUrl}
                alt={`${project.title} logo`}
                className="w-10 h-10 object-contain"
              />
            </div>
            <div className="text-left">
              <h1 className="text-2xl sm:text-3xl font-medium text-brand-black font-heading tracking-tight mb-1">
                {project.title}
              </h1>
              <p className="text-[#707070] text-xs sm:text-sm font-normal font-body">
                {project.subtitle}
              </p>
            </div>
          </div>
          
          <PremiumButton 
            onClick={() => window.open('#', '_blank')} 
            style={{ width: '180px', height: '48px', transform: 'scale(0.85)' }}
            hoverText="Live Preview" 
          />
        </motion.div>

        {/* Project Hero Mockup */}
        <motion.div
          variants={itemVariants}
          className="w-full bg-gradient-to-b from-[#1c1c1e] to-[#0f0f10] rounded-[32px] overflow-hidden p-6 sm:p-12 mb-8 shadow-md aspect-[16/10] flex items-center justify-center"
        >
          <img
            src={heroImageUrl}
            alt={`${project.title} Hero Showcase`}
            className="w-full h-full object-contain"
          />
        </motion.div>

        {/* Project Metadata Details */}
        <motion.div
          variants={itemVariants}
          className="bg-brand-white border border-brand-border-gray/30 rounded-[32px] p-6 sm:p-10 shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-6 text-left mb-8"
        >
          <div>
            <span className="block text-brand-light-gray text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-1">
              Client
            </span>
            <span className="text-brand-black text-sm sm:text-base font-medium">
              {project.client}
            </span>
          </div>
          <div>
            <span className="block text-brand-light-gray text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-1">
              Service
            </span>
            <span className="text-brand-black text-sm sm:text-base font-medium">
              {project.service}
            </span>
          </div>
          <div>
            <span className="block text-brand-light-gray text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-1">
              Date
            </span>
            <span className="text-brand-black text-sm sm:text-base font-medium">
              {project.date}
            </span>
          </div>
        </motion.div>

        {/* Overview Section */}
        <motion.div
          variants={itemVariants}
          className="bg-brand-white border border-brand-border-gray/30 rounded-[32px] p-6 sm:p-10 shadow-sm text-left mb-8 flex flex-col gap-6"
        >
          <div>
            <h2 className="text-lg sm:text-xl font-medium text-brand-black mb-3 font-heading">
              Overview:
            </h2>
            <p className="text-[#707070] text-sm sm:text-base font-normal font-body" style={{ lineHeight: '22px' }}>
              {project.overview}
            </p>
          </div>

          <div className="border-t border-brand-border-gray/20 pt-6">
            <h3 className="text-base sm:text-lg font-medium text-brand-black mb-4 font-heading">
              {project.whyTitle}
            </h3>
            <ul className="flex flex-col gap-3.5 mb-6">
              {project.points.map((pt, i) => (
                <li key={i} className="text-brand-gray text-xs sm:text-sm font-semibold flex items-start gap-2.5">
                  <span className="flex-shrink-0 mt-0.5">{pt.split(' ')[0]}</span>
                  <span>{pt.split(' ').slice(1).join(' ')}</span>
                </li>
              ))}
            </ul>
            <p className="text-brand-gray text-sm sm:text-base leading-relaxed font-semibold mb-4">
              {project.closingText}
            </p>
            <p className="text-brand-black text-sm sm:text-base font-medium">
              {project.ctaText}
            </p>
          </div>
        </motion.div>

        {/* Detailed Screenshots Section */}
        <motion.div
          variants={containerVariants}
          className="flex flex-col gap-6 mb-16"
        >
          {detailImages.map((imgUrl, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="w-full bg-[#1c1c1e] rounded-[32px] overflow-hidden p-4 sm:p-8 shadow-sm flex items-center justify-center aspect-[16/10]"
            >
              <img
                src={imgUrl}
                alt={`${project.title} detail ${idx + 1}`}
                className="w-full h-full object-contain"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Next Project Footer Card */}
        <motion.div
          variants={itemVariants}
          className="bg-brand-white border border-brand-border-gray/30 rounded-[32px] p-6 sm:p-10 shadow-sm text-left flex flex-col gap-6"
        >
          <div>
            <span className="inline-block bg-brand-bg-gray text-brand-gray text-[10px] sm:text-xs font-bold px-3.5 py-1 rounded-full mb-3 shadow-inner">
              Next Project
            </span>
            <p className="text-brand-gray text-xs sm:text-sm font-semibold max-w-sm mb-6">
              Get a sneak peek at what’s coming next—innovation in the making
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-t border-brand-border-gray/20 pt-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-[16px] bg-brand-black border border-black/5 flex items-center justify-center overflow-hidden flex-shrink-0 shadow-sm">
                <img
                  src={nextLogoUrl}
                  alt={`${project.nextTitle} logo`}
                  className="w-9 h-9 object-contain"
                />
              </div>
              <div>
                <h4 className="font-medium text-brand-black text-sm sm:text-base">
                  {project.nextTitle}
                </h4>
                <p className="text-brand-gray text-[11px] sm:text-xs font-semibold truncate max-w-[50vw]">
                  {project.nextSubtitle}
                </p>
              </div>
            </div>

            <PremiumButton 
              onClick={() => onProjectClick(project.nextSlug)} 
              style={{ width: '180px', height: '48px', transform: 'scale(0.85)' }}
              hoverText="View Project" 
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
