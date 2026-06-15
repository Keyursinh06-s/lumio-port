import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import CustomCursor from './components/ui/CustomCursor';
import useLenis from './hooks/useLenis';
import './App.css';

export default function App() {
  useLenis();
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'project'
  const [activeProjectId, setActiveProjectId] = useState(null);

  // Parse location hash for routing
  const parseHashRoute = () => {
    const hash = window.location.hash;
    
    if (hash.startsWith('#/project/')) {
      const id = hash.replace('#/project/', '');
      setCurrentPage('project');
      setActiveProjectId(id);
    } else if (hash.startsWith('#/section/')) {
      const sectionId = hash.replace('#/section/', '');
      setCurrentPage('home');
      setActiveProjectId(null);
      // Wait for DOM to render and scroll
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // Default to homepage
      setCurrentPage('home');
      setActiveProjectId(null);
      
      // If there's an anchor like #projects, scroll to it
      if (hash && hash.startsWith('#')) {
        const cleanHash = hash.substring(1);
        setTimeout(() => {
          const el = document.getElementById(cleanHash);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    }
  };

  useEffect(() => {
    // Initial routing
    parseHashRoute();

    // Listen for hash changes (browser back/forward or manual hash updates)
    window.addEventListener('hashchange', parseHashRoute);
    return () => window.removeEventListener('hashchange', parseHashRoute);
  }, []);

  // Navigation handler
  const handleNavigate = (page, sectionId = null) => {
    if (page === 'home') {
      if (sectionId) {
        window.location.hash = `#/section/${sectionId}`;
      } else {
        window.location.hash = '#/';
      }
    } else if (page === 'project') {
      window.location.hash = `#/project/${sectionId}`;
    }
  };

  // Handler for clicking a project card
  const handleProjectClick = (projectId) => {
    handleNavigate('project', projectId);
  };

  return (
    <div className="min-h-screen w-full relative flex flex-col items-center">
      {/* 1. Fixed Silk Mesh Background Layers */}
      <div className="fixed inset-0 bg-[#ebeced] -z-20 pointer-events-none" />
      <div 
        className="fixed inset-0 bg-[url('https://framerusercontent.com/images/CC0JINKmEAhG7PuLwqAk8MhTQw.webp')] bg-cover bg-center opacity-[0.08] pointer-events-none -z-10" 
        style={{ mixBlendMode: 'multiply' }}
      />
      {/* Ambient Film Grain Overlay */}
      <div className="grain-overlay" />

      {/* Premium Custom Cursor (Context-Aware) */}
      <CustomCursor />

      {/* 2. Main Page Render with Frosted Page Transitions */}
      <main className="w-full flex-grow overflow-visible">
        <AnimatePresence mode="wait">
          {currentPage === 'home' ? (
            <motion.div
              key="home-page"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{ width: '100%' }}
            >
              <Home onProjectClick={handleProjectClick} />
            </motion.div>
          ) : (
            <motion.div
              key={`detail-${activeProjectId}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{ width: '100%' }}
            >
              <ProjectDetail 
                projectId={activeProjectId} 
                onNavigate={handleNavigate}
                onProjectClick={handleProjectClick}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* 3. Floating Bottom Dock Navigation */}
      <Navbar currentPath={currentPage} onNavigate={handleNavigate} />
    </div>
  );
}
