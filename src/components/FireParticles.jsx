import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const FireParticles = ({ count = 15 }) => {
  const particles = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      size: Math.random() * 3 + 2,
      x: (Math.random() - 0.5) * 30,
      duration: Math.random() * 2 + 1.5,
      delay: Math.random() * 3,
      color: Math.random() > 0.4 ? '#ff6a00' : '#ffcc00',
    }));
  }, [count]);

  return (
    <div className="absolute bottom-[8%] left-1/2 -translate-x-1/2 pointer-events-none z-[100]">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            filter: 'blur(0.1px) brightness(1.7)',
            boxShadow: `0 0 6px ${p.color}`,
          }}
          initial={{
            opacity: 0,
            y: 0,
            x: p.x,
            scale: 1
          }}
          animate={{
            opacity: [0, 0.6, 0.4, 0],
            y: [0, -30, -70],
            x: [p.x, p.x + (Math.random() - 0.5) * 40],
            scale: [1, 1.2, 0.3],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeOut"
          }}
        />
      ))}

      {/* Subtle glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-16 h-16 bg-orange-500/20 blur-[30px] rounded-full"
      />
    </div>
  );
};

export default FireParticles;
