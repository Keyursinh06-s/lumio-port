import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import VelocityScrollItem from '../ui/VelocityScrollItem';

const projects = [
  {
    id: 'sienna',
    title: 'Sienna',
    description: 'A Timeless Portfolio for a Visionary Photographer',
    image: 'https://framerusercontent.com/images/6sb1JjYXS6TV4Lk4wuybSLhLYvA.png',
    logo: 'https://framerusercontent.com/images/qPDvMqjz7jsJRjTb3AzYMAxqtQA.svg',
    bgClass: 'bg-gradient-to-b from-[#1c1c1e] to-[#0f0f10]',
  },
  {
    id: 'growly',
    title: 'Growly',
    description: 'Empower Your Vision with a Modern, Streamlined Design.',
    image: 'https://framerusercontent.com/images/lGU6LhhlX7UVolkKorteot0QMI.png',
    logo: 'https://framerusercontent.com/images/LLGE1p1zXKMIhiXJxukmJOqn94.svg',
    bgClass: 'bg-gradient-to-b from-[#0e241c] to-[#07130e]',
  },
  {
    id: 'glidex',
    title: 'Glidex',
    description: 'Elevating Videography with Stunning Digital Experiences',
    image: 'https://framerusercontent.com/images/CLZhCPMlL2EPY75pz7qo4vhGGzw.png',
    logo: 'https://framerusercontent.com/images/3UBhuourpwlCeqx03V6QWYkok.svg',
    bgClass: 'bg-gradient-to-b from-[#0d2235] to-[#07121c]',
  },
  {
    id: 'aether-studio',
    title: 'Aether Studio',
    description: 'Where Architecture Meets Digital Excellence',
    image: 'https://framerusercontent.com/images/EVgp4FfBKeWyGi51Bui2IUDZsG0.png',
    logo: 'https://framerusercontent.com/images/gYoAsCKXdkDg7dbQ7ETRorhhA0.svg',
    bgClass: 'bg-gradient-to-b from-[#212224] to-[#111112]',
  },
  {
    id: 'vaultx',
    title: 'VaultX',
    description: 'The Future of Blockchain & Web3 Experiences',
    image: 'https://framerusercontent.com/images/6WFXJKIrqOV3OI4Ic0ghq3vf0fw.png',
    logo: 'https://framerusercontent.com/images/zRnuXrGDox7dVChfMCVhCEI6bZA.svg',
    bgClass: 'bg-gradient-to-b from-[#221038] to-[#11081c]',
  },
];

export default function ProjectsSection({ onProjectClick }) {
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
        staggerChildren: 0.15,
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
        stiffness: 70,
        damping: 15,
      },
    },
  };

  return (
    <section
      id="projects"
      className="w-full py-8 sm:py-24 px-4 flex flex-col items-center justify-start text-center relative z-10"
    >
      {/* Projects Header */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={headerVariants}
        className="mb-6 sm:mb-16"
      >
        <span className="inline-block bg-brand-black text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4 shadow-sm">
          Projects
        </span>
        <h2 className="text-3xl sm:text-5xl font-medium text-brand-black mb-4 font-heading tracking-tight" style={{ lineHeight: '0.9em' }}>
          Crafted to Impress, Built to Perform
        </h2>
        <p className="text-[#707070] text-base max-w-xl mx-auto font-normal font-body" style={{ lineHeight: '22px' }}>
          Explore a showcase of designs that blend creativity, strategy, and seamless execution
        </p>
      </motion.div>

      {/* Projects List */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="w-full max-w-4xl flex flex-col gap-10"
      >
        {projects.map((project, index) => (
          <VelocityScrollItem key={project.id}>
            <motion.div
              variants={cardVariants}
              onClick={() => onProjectClick(project.id)}
              className={`w-full aspect-[16/10] sm:aspect-[16/9.5] rounded-[32px] overflow-hidden relative group cursor-pointer shadow-md ${project.bgClass}`}
            >
              {/* Project Image Wrapper (Laptop) */}
              <div className="w-full h-full flex items-center justify-center p-4 sm:p-12 pb-20 sm:pb-24 group-hover:scale-[1.03] transition-transform duration-700 ease-out">
                <img
                  src={project.image}
                  alt={`${project.title} Desktop UI`}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Float Bottom Details Dock */}
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 bg-white/95 backdrop-blur-md border border-white/20 shadow-xl rounded-full p-3 sm:p-4 flex items-center justify-between gap-2 sm:gap-4 z-20 opacity-100 translate-y-0 pointer-events-auto sm:opacity-0 sm:translate-y-8 sm:pointer-events-none sm:group-hover:opacity-100 sm:group-hover:translate-y-0 sm:group-hover:pointer-events-auto transition-all duration-500 ease-out">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <img
                    src={project.logo}
                    alt={`${project.title} logo`}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border border-black/5 bg-black"
                  />
                  <div className="text-left">
                    <h4 className="font-semibold text-brand-black text-xs sm:text-base">
                      {project.title}
                    </h4>
                    <p className="text-[9px] sm:text-xs text-brand-gray truncate max-w-[30vw] sm:max-w-md font-medium">
                      {project.description}
                    </p>
                  </div>
                </div>
                <button
                  className="bg-brand-bg-gray text-brand-black text-[10px] sm:text-sm font-semibold px-3 sm:px-4 py-2 sm:py-2.5 rounded-full hover:bg-brand-black hover:text-white transition-all duration-300 flex items-center gap-1 flex-shrink-0"
                  aria-label={`View ${project.title} project details`}
                >
                  <span>View Project</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </VelocityScrollItem>
        ))}
      </motion.div>
    </section>
  );
}
