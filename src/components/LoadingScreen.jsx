import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 20);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-wedding-charcoal"
    >
      <div className="relative w-48 h-48 flex items-center justify-center">
        {/* Animated Mandala/Floral Pattern */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border-2 border-wedding-gold/20 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute inset-4 border-2 border-wedding-gold/40 rounded-full border-dashed"
        />
        
        <div className="text-center z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-script text-4xl text-wedding-gold glow-gold mb-2"
          >
            L & Y
          </motion.h2>
          <div className="text-wedding-ivory/60 text-xs tracking-widest uppercase">
            Loading Experience
          </div>
        </div>
      </div>

      <div className="mt-8 w-40 h-[1px] bg-wedding-gold/20 relative overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className="absolute inset-0 bg-wedding-gold"
        />
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
