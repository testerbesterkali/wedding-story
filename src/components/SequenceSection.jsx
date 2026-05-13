import React from 'react';
import { motion } from 'framer-motion';
import Countdown from './Countdown';
import { cn } from '../utils/cn';

const MemoryCard = ({ src, delay = 0, direction = 'right', className }) => {
  const baseUrl = import.meta.env.BASE_URL;
  const imagePath = src.startsWith('/') ? `${baseUrl}${src.slice(1)}` : `${baseUrl}${src}`;

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: direction === 'right' ? 80 : -80,
        y: 20
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
          duration: 1.4,
          ease: [0.22, 1, 0.36, 1],
          delay: delay
        }
      }}
      viewport={{ once: true, margin: "-5%" }}
      className={cn(
        "relative w-full overflow-hidden",
        className
      )}
    >
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
    <section className="relative w-full bg-white pt-16 pb-2 px-2">
      <div className="max-w-2xl mx-auto flex flex-col items-center w-full px-0 relative z-10 space-y-3">

        {/* Memory Sequence */}
        {images.map((img, i) => (
          <MemoryCard
            key={i}
            src={img}
            delay={0.1}
            direction={i % 2 === 0 ? 'right' : 'left'}
          />
        ))}

        {/* Final Text Message & Countdown */}
        {textImage && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-full flex flex-col items-center pt-2 pb-2"
          >
            <img
              src={textImage.startsWith('/') ? `${import.meta.env.BASE_URL}${textImage.slice(1)}` : `${import.meta.env.BASE_URL}${textImage}`}
              className="w-full h-auto object-contain mb-2"
              alt="Closing Message"
            />

            <div className="w-full">
              <Countdown targetDate="2026-06-21T00:00:00" />
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default SequenceSection;
