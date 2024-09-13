'use client'

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';

export default function AnimatedNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const checkScreenSize = useCallback(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, [checkScreenSize]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="p-4 md:p-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 backdrop-blur-lg shadow-lg fixed w-full z-10"
    >
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <motion.a 
          href="#" 
          className="text-2xl md:text-3xl font-bold text-white font-playfair"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Porfolio Miagiste
        </motion.a>
        
        <motion.button
          className="md:hidden text-white"
          onClick={toggleMenu}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </motion.button>

        <AnimatePresence>
          {(isMenuOpen || !isMobile) && (
            <motion.ul 
              className="flex flex-col md:flex-row w-full md:w-auto mt-4 md:mt-0 space-y-2 md:space-y-0 md:space-x-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, staggerChildren: 0.1 }}
            >
              {["Projets", "Compétences", "Expérience", "Contact"].map((item) => (
                <motion.li 
                  key={item} 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                >
                  <a 
                    href={`#${item.toLowerCase()}`} 
                    className="block text-base md:text-lg font-medium text-white hover:text-yellow-300 transition-colors duration-300 py-2 px-4 rounded-full hover:bg-white/10"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}