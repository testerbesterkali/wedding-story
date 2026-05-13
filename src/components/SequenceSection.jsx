import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

const MemoryCard = ({ src, delay = 0, className }) => {
  const baseUrl = import.meta.env.BASE_URL;
  const imagePath = src.startsWith('/') ? `${baseUrl}${src.slice(1)}` : `${baseUrl}${src}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: 1.2,
          ease: [0.22, 1, 0.36, 1],
          delay: delay
        }
      }}
      viewport={{ once: true, margin: "-10%" }}
      className={cn(
        "relative w-full overflow-hidden rounded-[1.2rem] shadow-md bg-white/5",
        className
      )}
    >
      {/* 
          Using h-auto and w-full with object-contain to ensure NO CLIPPING.
          The image will maintain its original aspect ratio perfectly.
      */}
      <img
        src={imagePath}
        alt="Memory"
        className="w-full h-auto block object-contain"
      />
    </motion.div>
  );
};

const SequenceSection = ({ images, textImage }) => {
  return (
    <section className="relative w-full bg-white py-12 px-6">
      {/* 
          Restricting max-width to 'max-w-md' (approx 450px) to keep them "properly sized" 
          and prevent them from feeling too big on desktop screens.
      */}
      <div className="max-w-md mx-auto flex flex-col items-center space-y-10 relative z-10">

        {/* Memory Sequence */}
        {images.map((img, i) => (
          <MemoryCard key={i} src={img} delay={i * 0.2} />
        ))}

        {/* Final Text Message */}
        {textImage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { duration: 1.5, delay: 0.6 }
            }}
            viewport={{ once: true }}
            className="pt-0 pb-0 flex justify-center w-full overflow-hidden"
          >
            <img
              src={textImage.startsWith('/') ? `${import.meta.env.BASE_URL}${textImage.slice(1)}` : `${import.meta.env.BASE_URL}${textImage}`}
              className="w-full h-[20vh] object-cover object-bottom drop-shadow-sm"
              alt="Closing Message"
            />
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default SequenceSection;
