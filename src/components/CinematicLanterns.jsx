import React, { useMemo } from 'react';
import { motion, useTransform } from 'framer-motion';

const CinematicLanterns = ({ scrollYProgress }) => {
  const lanterns = useMemo(() => {
    return Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage
      startY: 110 + (Math.random() * 50), // start below screen
      endY: -20 - (Math.random() * 100), // end above screen
      size: 20 + Math.random() * 40,
      blur: Math.random() * 2,
      speed: 0.5 + Math.random() * 1.5,
      drift: (Math.random() - 0.5) * 40,
      delay: Math.random() * 0.5,
      opacity: 0.4 + Math.random() * 0.6,
      flickerDuration: 2 + Math.random() * 2
    }));
  }, []);

  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      {lanterns.map((lantern) => {
        // Individualized scroll transforms
        const y = useTransform(
          scrollYProgress, 
          [0, 1], 
          [`${lantern.startY}%`, `${lantern.endY}%`]
        );
        
        const xDrift = useTransform(
          scrollYProgress,
          [0, 1],
          [`${lantern.x}%`, `${lantern.x + lantern.drift}%`]
        );

        const opacity = useTransform(
          scrollYProgress,
          [0, 0.1, 0.8, 1],
          [0, lantern.opacity, lantern.opacity, 0]
        );

        return (
          <motion.div
            key={lantern.id}
            style={{
              position: 'absolute',
              top: 0,
              left: xDrift,
              y,
              opacity,
              width: lantern.size,
              height: lantern.size * 1.3,
              filter: `blur(${lantern.blur}px)`,
            }}
          >
            {/* The Lantern Asset - Using a stylized glow */}
            <motion.div 
              animate={{ 
                scale: [1, 1.05, 1],
                filter: [
                  'brightness(1) drop-shadow(0 0 5px rgba(255, 180, 50, 0.5))',
                  'brightness(1.3) drop-shadow(0 0 15px rgba(255, 180, 50, 0.9))',
                  'brightness(1) drop-shadow(0 0 5px rgba(255, 180, 50, 0.5))'
                ]
              }}
              transition={{ 
                duration: lantern.flickerDuration, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
              className="w-full h-full relative"
            >
              {/* Lantern Shape (Simplified for vector feel or use an image if available) */}
              <div className="w-full h-full bg-gradient-to-b from-[#ffdb7e] via-[#ff9d2e] to-[#ff4d00] rounded-sm shadow-lg opacity-90" 
                   style={{ borderRadius: '2px 2px 4px 4px' }} />
              
              {/* Internal Flame Glow */}
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1/2 h-1/2 bg-white blur-md rounded-full opacity-40" />
              
              {/* Decorative Lines (Optional) */}
              <div className="absolute inset-x-0 top-1/4 h-[1px] bg-black/20" />
              <div className="absolute inset-x-0 top-2/4 h-[1px] bg-black/20" />
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default CinematicLanterns;
