import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  loading = false,
  onClick, 
  className = '',
  type = 'button',
  fullWidth = false,
  icon: Icon,
  ...props 
}) => {
  const baseClasses = 'relative inline-flex items-center justify-center font-semibold rounded-2xl transition-all duration-300 transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none';
  
  const variants = {
    primary: 'bg-pink-button hover:scale-105 hover:shadow-lg hover:shadow-baby-pink-500/30 text-white',
    secondary: 'bg-gradient-to-r from-peach-200 to-lavender-200 hover:from-lavender-200 hover:to-peach-200 text-gray-700 hover:scale-105 hover:shadow-lg hover:shadow-peach-200/30',
    outline: 'border-2 border-baby-pink-400 text-baby-pink-600 hover:bg-baby-pink-50 hover:scale-105',
    ghost: 'text-baby-pink-600 hover:bg-baby-pink-50 hover:scale-105',
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <motion.button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
      whileHover={{ scale: disabled || loading ? 1 : 1.05 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.95 }}
      {...props}
    >
      {loading ? (
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          <span>Loading...</span>
        </div>
      ) : (
        <div className="flex items-center space-x-2">
          {Icon && <Icon className="w-4 h-4" />}
          {children}
        </div>
      )}
    </motion.button>
  );
};

export default Button;
