import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const FirecrackerBurst = ({ x, y, delay }) => {
  const [tick, setTick] = useState(0);
  const particles = Array.from({ length: 30 });
  const colors = ['#FFFF00', '#FFF300', '#CC0000', '#FF4500', '#FF6347', '#FFD700'];
  
  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setTick(t => t + 1);
      }, 4000 + Math.random() * 2000);
      return () => clearInterval(interval);
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div 
      className="absolute z-30"
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      <AnimatePresence>
        {tick > 0 && (
          <motion.div key={tick} className="relative">
            {/* Double Burst Logic */}
            {[0, 0.2].map((stagger) => (
              <motion.div key={stagger} initial="hidden" animate="visible" className="absolute">
                {/* Instant Flash */}
                <motion.div
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: 4, opacity: 0 }}
                  transition={{ duration: 0.6, delay: stagger, ease: "easeOut" }}
                  className="absolute w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white blur-lg"
                />

                {/* Exploding Particles */}
                {particles.map((_, i) => {
                  const color = colors[i % colors.length];
                  const angle = (i * (360 / particles.length)) * (Math.PI / 180);
                  const distance = 25 + Math.random() * 55;
                  const size = 1 + Math.random() * 1.5;
                  const duration = 1.2 + Math.random() * 1;
                  
                  return (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, opacity: 1, x: 0, y: 0 }}
                      animate={{
                        scale: [0, 1.2, 0.8, 0],
                        opacity: [1, 1, 0.7, 0],
                        x: Math.cos(angle) * distance,
                        y: [0, Math.sin(angle) * distance, Math.sin(angle) * distance + 30],
                      }}
                      transition={{
                        duration: duration,
                        delay: stagger,
                        ease: "easeOut"
                      }}
                      className="absolute rounded-full"
                      style={{ 
                        backgroundColor: color, 
                        boxShadow: `0 0 ${size * 3}px ${color}`,
                        width: size, 
                        height: size,
                      }}
                    />
                  );
                })}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Firecrackers = () => {
  // Positions matching the fireworks in the image 5.png
  const positions = [
    { x: 20, y: 15, delay: 0 },
    { x: 80, y: 15, delay: 0.5 },
    { x: 15, y: 45, delay: 1.2 },
    { x: 85, y: 45, delay: 0.8 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {positions.map((pos, index) => (
        <FirecrackerBurst 
          key={index}
          x={pos.x}
          y={pos.y}
          delay={pos.delay}
        />
      ))}
    </div>
  );
};

export default Firecrackers;
