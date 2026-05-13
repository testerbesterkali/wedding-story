import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const LoadingScreen = ({ onComplete }) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Artificial delay to ensure background loads or just immediate if assets cached
    const timer = setTimeout(() => setIsReady(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        scale: 1.1,
        transition: { duration: 1, ease: "easeIn" }
      }}
      onClick={onComplete}
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black overflow-hidden cursor-pointer"
    >
      {/* Background Image - Full Opacity */}
      <div className="absolute inset-0 z-0">
        <img 
          src={`${import.meta.env.BASE_URL}Pop Up.png`}
          alt="Invitation Cover"
          className="w-full h-full object-cover"
        />
      </div>

    </motion.div>
  );
};

export default LoadingScreen;
