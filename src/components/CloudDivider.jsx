import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const CloudDivider = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const y2 = useTransform(scrollYProgress, [0, 1], [15, -50]);
  const y3 = useTransform(scrollYProgress, [0, 1], [40, -20]);
  const x1 = useTransform(scrollYProgress, [0, 1], [-15, 15]);
  const x2 = useTransform(scrollYProgress, [0, 1], [10, -10]);

  return (
    <div 
      ref={ref}
      className="relative pointer-events-none overflow-visible"
      style={{ 
        height: '16rem',
        marginTop: '-8rem', 
        marginBottom: '-8rem',
        zIndex: 60,
        width: '120%',
        left: '-10%',
      }}
    >
      {/* Back cloud layer - large, slow, blurred */}
      <motion.div
        style={{ y: y1, x: x1 }}
        className="absolute inset-0 flex items-center justify-center overflow-visible"
      >
        <img 
          src="/images/cloud.png" 
          alt=""
          style={{
            width: '300%',
            maxWidth: 'none',
            height: '100%',
            objectFit: 'fill',
            opacity: 0.6,
            filter: 'blur(6px)',
            transform: 'scaleX(-1)',
          }}
        />
      </motion.div>

      {/* Middle cloud layer - dense, main coverage */}
      <motion.div
        style={{ y: y2 }}
        className="absolute inset-0 flex items-center justify-center overflow-visible"
      >
        <img 
          src="/images/cloud.png" 
          alt=""
          style={{
            width: '300%',
            maxWidth: 'none',
            height: '100%',
            objectFit: 'fill',
            opacity: 1,
          }}
        />
      </motion.div>

      {/* Front cloud layer - offset, faster parallax */}
      <motion.div
        style={{ y: y3, x: x2 }}
        className="absolute inset-0 flex items-center justify-center overflow-visible"
      >
        <img 
          src="/images/cloud.png" 
          alt=""
          style={{
            width: '250%',
            maxWidth: 'none',
            height: '90%',
            objectFit: 'fill',
            opacity: 0.7,
            filter: 'blur(3px)',
            transform: 'scaleX(-1) scaleY(0.9)',
          }}
        />
      </motion.div>
    </div>
  );
};

export default CloudDivider;
