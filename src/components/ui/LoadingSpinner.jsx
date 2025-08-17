import React from 'react';

const LoadingSpinner = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <div className="relative w-full h-full">
        <div className="absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-r from-primary-from to-primary-to animate-spin">
          <div className="absolute inset-1 rounded-full bg-background"></div>
        </div>
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-accent-from animate-ping"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
