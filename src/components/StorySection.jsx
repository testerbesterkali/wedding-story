import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '../utils/cn';

const ParallaxLayer = ({ layer, scrollYProgress, index, revealOpacity, revealY }) => {
  const y = useTransform(scrollYProgress, layer.range || [0, 1], layer.y || ["-5%", "5%"]);
  const x = useTransform(scrollYProgress, layer.range || [0, 1], layer.x || ["0%", "0%"]);
  const scale = useTransform(scrollYProgress, layer.range || [0, 0.5, 1], layer.scale || [1, 1, 1]);
  
  // Resolve the image path using Vite's BASE_URL
  const baseUrl = import.meta.env.BASE_URL;
  const src = layer.src.startsWith('http') || layer.src.startsWith('data:') 
    ? layer.src 
    : `${baseUrl}${layer.src.startsWith('/') ? layer.src.slice(1) : layer.src}`;

  const isNatural = layer.natural;

  return (
    <motion.div 
      initial={!layer.reveal ? { y: layer.initialY || 50, opacity: 0 } : false}
      whileInView={!layer.reveal ? { y: 0, opacity: 1 } : false}
      viewport={{ once: true }}
      transition={{ 
        duration: 2, 
        delay: index * 0.2,
        ease: [0.22, 1, 0.36, 1]
      }}
      style={{ 
        y: layer.reveal ? revealY : y, 
        x,
        scale,
        opacity: layer.reveal ? revealOpacity : undefined,
        ...(layer.style || {}) 
      }}
      className={cn(
        "absolute z-10 moving-layer",
        isNatural ? "inset-x-0" : "inset-0",
        layer.className || ''
      )}
    >
      <img
        src={src}
        alt={`Layer ${index}`}
        className={cn(
          "w-full h-full",
          layer.objectFit || (isNatural ? 'object-contain' : 'object-cover'),
          layer.objectPosition || 'object-center',
          layer.imgClassName || ''
        )}
      />
    </motion.div>
  );
};

const StorySection = ({ image, layers, children, overlays, scratch, className, index, stickyBg = true }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Global reveal-on-scroll logic for text & scratch
  const revealOpacity = useTransform(scrollYProgress, [0.1, 0.35, 0.65, 0.9], [0, 1, 1, 0]);
  const revealY = useTransform(scrollYProgress, [0.1, 0.35], [40, 0]);
  const isRevealSection = layers && layers.some(l => l.reveal);

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={containerRef}
      className={cn(
        "relative h-[200vh] w-full overflow-hidden",
        className
      )}
    >
      {/* Background Content (Natural) */}
      {image && !stickyBg && (
        <div className="absolute inset-0 z-0">
          <img
            src={image.startsWith('/') ? `${import.meta.env.BASE_URL}${image.slice(1)}` : `${import.meta.env.BASE_URL}${image}`}
            alt="Natural Background"
            className="w-full h-full object-cover object-top"
          />
        </div>
      )}

      {/* Sticky Viewport Container */}
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        {/* Parallax & Reveal Layers */}
        {layers && layers.map((layer, i) => (
          <ParallaxLayer
            key={`${layer.src}-${i}`}
            layer={layer}
            scrollYProgress={scrollYProgress}
            index={i}
            revealOpacity={revealOpacity}
            revealY={revealY}
          />
        ))}

        {/* Sticky Background (Alternative mode) */}
        {image && stickyBg && !layers && (
          <motion.div
            style={{
              y: useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]),
              scale: useTransform(scrollYProgress, [0, 0.5, 1], [1.02, 1, 1.02])
            }}
            className="absolute inset-0 z-10"
          >
            <img
              src={image.startsWith('/') ? `${import.meta.env.BASE_URL}${image.slice(1)}` : `${import.meta.env.BASE_URL}${image}`}
              alt="Sticky Background"
              className="w-full h-full object-cover object-center"
            />
          </motion.div>
        )}

        {/* Full-section overlays */}
        {overlays && (
          <div className="absolute inset-0 z-[45] pointer-events-none overflow-hidden">
            {overlays}
          </div>
        )}

        {/* Scratch-to-reveal layer */}
        {scratch && (
          <motion.div
            initial={!isRevealSection ? { opacity: 0, y: 40 } : false}
            whileInView={!isRevealSection ? { opacity: 1, y: 0 } : false}
            viewport={{ once: true }}
            transition={{ duration: 1.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              opacity: isRevealSection ? revealOpacity : undefined,
              y: isRevealSection ? revealY : undefined
            }}
            className="absolute inset-0 z-[55]"
          >
            <motion.div
              style={{
                y: useTransform(scrollYProgress, [0, 1], ["-2%", "2%"]),
                scale: useTransform(scrollYProgress, [0, 0.5, 1], [0.98, 1, 0.98])
              }}
              className="absolute inset-0 pointer-events-none"
            >
              <div className="absolute inset-0 pointer-events-auto">
                {scratch}
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Interactive Content Overlay */}
        <motion.div
          style={{ opacity }}
          className="absolute bottom-12 left-0 right-0 z-[50] px-6 flex flex-col items-center"
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
};

export default StorySection;
