import React from 'react';
import { motion } from 'framer-motion';
import InteractiveBackground from './InteractiveBackground';

const AuthLayout = ({ children, title, subtitle, showBackButton = false, onBackClick }) => {
  return (
    <div className="min-h-screen bg-cute-gradient relative overflow-hidden">
      <InteractiveBackground />
      
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="w-full max-w-md"
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="text-center mb-8"
          >
            {showBackButton && (
              <motion.button
                onClick={onBackClick}
                className="absolute left-0 top-0 text-baby-pink-600 hover:text-baby-pink-700 transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>
            )}
            
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
              className="text-4xl font-bold mb-2 text-gray-800"
            >
              <span className="gradient-text">{title}</span>
            </motion.h1>
            
            {subtitle && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
                className="text-baby-pink-600 text-lg font-medium"
              >
                {subtitle}
              </motion.p>
            )}
          </motion.div>

          {/* Auth Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
            className="form-container"
          >
            {children}
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
            className="text-center mt-8 text-baby-pink-500 text-sm font-medium"
          >
            <p>Secure • Fast • Beautiful</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthLayout;
