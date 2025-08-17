import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useMousePosition } from '../../hooks/useMousePosition';

const InteractiveBackground = () => {
  const mousePosition = useMousePosition();
  const backgroundRef = useRef(null);

  useEffect(() => {
    if (backgroundRef.current) {
      const { x, y } = mousePosition;
      const { width, height } = backgroundRef.current.getBoundingClientRect();
      
      // Update CSS custom properties for mouse position
      backgroundRef.current.style.setProperty('--mouse-x', `${x}px`);
      backgroundRef.current.style.setProperty('--mouse-y', `${y}px`);
      backgroundRef.current.style.setProperty('--mouse-x-percent', `${(x / width) * 100}%`);
      backgroundRef.current.style.setProperty('--mouse-y-percent', `${(y / height) * 100}%`);
    }
  }, [mousePosition]);

  const particles = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 6 + 3,
    delay: Math.random() * 2,
    duration: Math.random() * 4 + 3,
    color: ['#f9a8d4', '#fed7aa', '#e9d5ff'][Math.floor(Math.random() * 3)],
  }));

  const geometricShapes = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    rotation: Math.random() * 360,
    scale: Math.random() * 0.6 + 0.4,
    delay: Math.random() * 2,
    color: ['#fbcfe8', '#fed7aa', '#e9d5ff'][Math.floor(Math.random() * 3)],
  }));

  return (
    <div 
      ref={backgroundRef}
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{
        '--mouse-x': '0px',
        '--mouse-y': '0px',
        '--mouse-x-percent': '50%',
        '--mouse-y-percent': '50%',
      }}
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-cute-gradient">
        <div 
          className="absolute inset-0 opacity-40 transition-all duration-1000 ease-out"
          style={{
            background: `
              radial-gradient(
                circle at var(--mouse-x-percent) var(--mouse-y-percent),
                rgba(236, 72, 153, 0.3) 0%,
                rgba(249, 168, 212, 0.2) 25%,
                rgba(233, 213, 255, 0.1) 50%,
                transparent 100%
              )
            `,
          }}
        />
      </div>

      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: particle.color,
          }}
          animate={{
            y: [0, -25, 0],
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Geometric shapes */}
      {geometricShapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="geometric-shape"
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            transform: `rotate(${shape.rotation}deg) scale(${shape.scale})`,
          }}
          animate={{
            rotate: [shape.rotation, shape.rotation + 360],
            scale: [shape.scale, shape.scale * 1.3, shape.scale],
          }}
          transition={{
            duration: 10,
            delay: shape.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {shape.id % 4 === 0 ? (
            <div 
              className="w-10 h-10 border-2 border-baby-pink-300 rounded-full"
              style={{ borderColor: shape.color }}
            />
          ) : shape.id % 4 === 1 ? (
            <div 
              className="w-8 h-8 bg-gradient-to-br from-peach-200 to-lavender-200 transform rotate-45"
              style={{ background: `linear-gradient(45deg, ${shape.color}, ${shape.color}80)` }}
            />
          ) : shape.id % 4 === 2 ? (
            <div 
              className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-b-[25px]"
              style={{ borderBottomColor: shape.color }}
            />
          ) : (
            <div 
              className="w-6 h-6 border-2 border-baby-pink-200 rounded-lg"
              style={{ borderColor: shape.color }}
            />
          )}
        </motion.div>
      ))}

      {/* Mouse-following gradient orb */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-30 blur-3xl pointer-events-none"
        style={{
          left: 'var(--mouse-x)',
          top: 'var(--mouse-y)',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.4) 0%, rgba(249, 168, 212, 0.2) 50%, rgba(233, 213, 255, 0.1) 100%)',
        }}
        animate={{
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(236, 72, 153, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(236, 72, 153, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>
    </div>
  );
};

export default InteractiveBackground;
