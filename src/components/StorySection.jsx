import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '../utils/cn';

const ParallaxLayer = ({ layer, scrollYProgress, index }) => {
  const y = useTransform(scrollYProgress, [0, 1], layer.y || ["-5%", "5%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], layer.scale || [1, 1, 1]);
  
  return (
    <motion.div 
      style={{ y, scale, ...(layer.style || {}) }}
      className={`absolute inset-0 z-10 ${layer.className || ''}`}
    >
      <img 
        src={layer.src} 
        alt={`Layer ${index}`}
        className={`w-full h-full ${layer.objectFit || 'object-cover'} ${layer.objectPosition || 'object-center'} ${layer.imgClassName || ''}`}
      />
    </motion.div>
  );
};

const StorySection = ({ image, layers, children, overlays, scratch, className, index }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 1.05]);

  return (
    <section 
      ref={containerRef}
      className={cn("relative h-[100svh] w-full overflow-hidden", className)}
    >
      {/* Background Layers or Single Image */}
      {layers ? (
        layers.map((layer, i) => (
          <ParallaxLayer 
            key={i} 
            layer={layer} 
            scrollYProgress={scrollYProgress} 
            index={i} 
          />
        ))
      ) : (
        <motion.div 
          style={{ 
            y: useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]), 
            scale: useTransform(scrollYProgress, [0, 0.5, 1], [1.02, 1, 1.02])
          }}
          className="absolute inset-0 z-10"
        >
          <img 
            src={image} 
            alt={`Section ${index + 1}`}
            className="w-full h-full object-cover object-center"
          />
        </motion.div>
      )}

      {/* Full-section overlays (Lanterns, Firecrackers, etc.) */}
      {overlays && (
        <div className="absolute inset-0 z-[45] pointer-events-none overflow-hidden">
          {overlays}
        </div>
      )}

      {/* Scratch-to-reveal layer - rendered directly, with pointer events */}
      {scratch && (
        <div className="absolute inset-0 z-[55]">
          {scratch}
        </div>
      )}

      {/* Interactive Content Overlay - Positioned at bottom */}
      <motion.div 
        style={{ opacity }}
        className="absolute bottom-12 left-0 right-0 z-[50] px-6 flex flex-col items-center"
      >
        {children}
      </motion.div>
    </section>
  );
};

export default StorySection;
