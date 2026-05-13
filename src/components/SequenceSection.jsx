import React from 'react';
import { motion } from 'framer-motion';
import Countdown from './Countdown';
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
    <section className="relative w-full bg-white pt-0 pb-0 px-6">
      <div className="max-w-md mx-auto flex flex-col items-center w-full px-4 relative z-10 space-y-0">

        {/* Memory Sequence */}
        {images.map((img, i) => (
          <MemoryCard key={i} src={img} delay={i * 0.2} />
        ))}

        {/* Final Text Message & Countdown */}
        {textImage && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-full flex flex-col items-center pt-0 pb-12"
          >
            <img
              src={textImage.startsWith('/') ? `${import.meta.env.BASE_URL}${textImage.slice(1)}` : `${import.meta.env.BASE_URL}${textImage}`}
              className="w-full h-auto object-contain px-2"
              alt="Closing Message"
            />
            
            <div className="w-full -mt-16">
              <Countdown targetDate="2026-06-21T00:00:00" />
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default SequenceSection;
