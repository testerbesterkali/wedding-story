import { motion } from 'framer-motion';

const Lantern = ({ x, delay, size }) => {
  return (
    <motion.div
      initial={{ y: '120%', opacity: 0 }}
      animate={{ 
        y: ['120%', '-30%'],
        opacity: [0, 0.9, 1, 0.9, 0],
        x: [0, Math.sin(delay) * 30, 0]
      }}
      transition={{
        duration: 12 + Math.random() * 8,
        delay: delay,
        repeat: Infinity,
        ease: "linear"
      }}
      style={{ 
        left: `${x}%`,
      }}
      className="absolute z-[50] pointer-events-none"
    >
      <div 
        className="relative rounded-sm shadow-[0_0_25px_rgba(255,165,0,0.8)]"
        style={{
          width: `${size}px`,
          height: `${size * 1.5}px`,
          background: 'linear-gradient(to bottom, #FFD700, #FF8C00)',
          animation: 'flicker 2s infinite alternate'
        }}
      >
        <div className="absolute top-0 w-full h-[1px] bg-black/10" />
        <div className="absolute inset-0 bg-white/20 blur-[1px]" />
      </div>
    </motion.div>
  );
};

const Lanterns = () => {
  const lanterns = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 10,
    size: 8 + Math.random() * 12,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {lanterns.map((lantern) => (
        <Lantern 
          key={lantern.id} 
          x={lantern.x} 
          delay={lantern.delay} 
          size={lantern.size}
        />
      ))}
    </div>
  );
};

export default Lanterns;
