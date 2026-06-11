import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '../store/useStore';

export default function WelcomeSplash() {
  const [isVisible, setIsVisible] = useState(true);
  const lang = useStore(state => state.lang);

  useEffect(() => {
    // Only show once per session
    const hasSeenSplash = sessionStorage.getItem('hasSeenSplash');
    
    if (hasSeenSplash) {
      setIsVisible(false);
      return;
    }

    // Hide splash screen after 1.2 seconds to make it super-fast
    const timer = setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem('hasSeenSplash', 'true');
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-b from-green-50 to-white pt-10"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex flex-col items-center text-center p-8 max-w-md w-full"
          >
            {/* Logo */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-8 relative"
            >
              <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl transform scale-150"></div>
              <img 
                src="/logo.png" 
                alt="Aam Bahar Logo" 
                className="h-64 md:h-72 w-auto object-contain relative z-10" 
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling!.classList.remove('hidden');
                }}
              />
              <div className="hidden relative z-10 text-primary">
                <span className="text-7xl">🥭</span>
              </div>
            </motion.div>

            {/* Slogan */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="space-y-6 w-full"
            >
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#1a2e20] leading-snug">
                “ মিষ্টতার নামই — আম বাহার ✨ ”
              </h1>
              
              <div className="space-y-3 pt-6 border-t border-primary/20">
                <motion.p 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="text-lg font-medium text-gray-700 flex items-center justify-center gap-2"
                >
                  <span>Premium Seasonal Mangoes</span>
                  <span className="text-xl">🥭</span>
                </motion.p>
                
                <motion.p 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.0, duration: 0.5 }}
                  className="text-lg font-medium text-gray-700 flex items-center justify-center gap-2"
                >
                  <span>Fresh From Orchard</span>
                  <span className="text-primary"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></span>
                </motion.p>
                
                <motion.p 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                  className="text-lg font-medium text-gray-700 flex items-center justify-center gap-2"
                >
                  <span>Delivery All Over Bangladesh</span>
                  <span className="text-xl">🚚</span>
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
