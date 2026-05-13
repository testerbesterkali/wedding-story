import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import CinematicLanterns from './CinematicLanterns';
import { cn } from '../utils/cn';

const IntroSection = () => {
  const containerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Normal scroll parallax (not sticky)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Smooth scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Parallax offsets - subtle for a single viewport height
  const skyY = useTransform(smoothProgress, [0, 1], ["0%", "15%"]);
  const buildingY = useTransform(smoothProgress, [0, 1], ["0%", "8%"]);
  const coupleY = useTransform(smoothProgress, [0, 1], ["0%", "-4%"]);
  const lanternsY = useTransform(smoothProgress, [0, 1], ["0%", "-30%"]);
  const textYParallax = useTransform(smoothProgress, [0, 1], ["0%", "-10%"]);

  const baseUrl = import.meta.env.BASE_URL;
  const getPath = (name) => `${baseUrl}images/intro/${name}`;

  return (
    <section ref={containerRef} className="relative h-[100svh] w-full bg-[#0a0a1f] overflow-hidden left-0">
      <div className="relative h-full w-full overflow-hidden">

        {/* 1. Background Sky */}
        <motion.div
          style={{ y: skyY }}
          className="absolute inset-0 z-0"
        >
          <img src={getPath('Background.png')} className="w-full h-full object-cover object-bottom" alt="" />
        </motion.div>

        {/* 2. Hotel / Middle Background */}
        <motion.div
          style={{ y: buildingY }}
          className="absolute inset-0 z-10"
        >
          <img src={getPath('Background copy.png')} className="w-full h-full object-cover object-bottom" alt="" />
        </motion.div>

        {/* 3. Cinematic Lantern Layers (Far, Mid, Near) */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          {/* Procedural background lanterns */}


          {/* LAYER 1: Far Lanterns (Small & Slow) */}
          <motion.img
            style={{ y: useTransform(smoothProgress, [0, 1], ["0%", "-20%"]) }}
            initial={{ y: "80%", opacity: 0 }}
            animate={{ y: 0, opacity: 0.4 }}
            transition={{ duration: 4, delay: 0.2 }}
            src={getPath('Lanterns.png')}
            className="w-full h-full object-contain absolute inset-0 scale-75 blur-[1px]"
            alt=""
          />

          {/* LAYER 2: Mid Lanterns (Normal) */}
          <motion.img
            style={{ y: useTransform(smoothProgress, [0, 1], ["0%", "-40%"]) }}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 0.8 }}
            transition={{ duration: 3, delay: 0.5 }}
            src={getPath('Lanterns.png')}
            className="w-full h-full object-contain absolute inset-0"
            alt=""
          />

          {/* LAYER 3: Near Lanterns (Very Big & Fast) */}
          <motion.img
            style={{ y: useTransform(smoothProgress, [0, 1], ["0%", "-200%"]) }}
            initial={{ y: "200%", opacity: 0 }}
            animate={{ y: 0, opacity: 0.7 }}
            transition={{ duration: 2.2, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            src={getPath('Lanterns.png')}
            className="w-full h-full object-contain absolute inset-0 scale-[1.8] brightness-125 saturate-150"
            alt=""
          />
        </div>

        {/* 4. Main Text - Animating up on load */}
        <motion.div
          style={{ y: textYParallax }}
          initial={{ opacity: 0, y: 100 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 2.5, delay: 1, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none"
        >
          <img src={getPath('Text.png')} className="w-full max-w-[90%] md:max-w-[70%] h-auto object-contain" alt="Wedding Invitation" />
        </motion.div>

        {/* 5. Couple (Parallax Layer) */}
        <motion.div
          style={{ y: coupleY }}
          className="absolute inset-0 z-40 flex items-end justify-center pointer-events-none"
        >
          <div className="relative w-full h-full flex items-end justify-center">
            <img src={getPath('Couplea.png')} className="w-auto h-[60%] md:h-[75%] object-contain" alt="" />
          </div>
        </motion.div>

        {/* 6. Static Foreground (Candles ONLY) */}
        <div
          className="absolute inset-0 z-50 flex items-end justify-center pointer-events-none"
          style={{ transform: 'none' }}
        >
          <img
            src={getPath('Candles.png')}
            className="absolute bottom-0 w-full h-[25%] object-contain object-bottom"
            style={{ transform: 'none' }}
            alt=""
          />
        </div>

        {/* 7. Foreground Parallax (Trees & Railing) - Moving with background speed */}
        <motion.div
          style={{ y: buildingY }}
          className="absolute inset-0 z-[45] flex items-end justify-center pointer-events-none"
        >
          {/* Tree Layers */}
          <img
            src={getPath('Lights on Trees.png')}
            className="absolute inset-0 w-full h-full object-cover object-bottom opacity-80"
            alt=""
          />
          <img
            src={getPath('Flower On trees.png')}
            className="absolute inset-0 w-full h-full object-cover object-bottom"
            alt=""
          />

          {/* Railing */}
          <img
            src={getPath('flowers on railing.png')}
            className="w-full h-[30%] object-cover object-bottom"
            alt=""
          />
        </motion.div>

        {/* Subtle Vignette */}
        <div className="absolute inset-0 z-[60] shadow-[inset_0_0_150px_rgba(0,0,0,0.5)] pointer-events-none" />
      </div>
    </section>
  );
};

export default IntroSection;
