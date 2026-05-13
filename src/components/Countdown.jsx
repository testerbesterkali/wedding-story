import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Countdown = ({ targetDate = "2026-06-21T00:00:00" }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      let newTimeLeft = {};

      if (difference > 0) {
        newTimeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        };
      } else {
        newTimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      setTimeLeft(newTimeLeft);
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();

    return () => clearInterval(timer);
  }, [targetDate]);

  const TimeUnit = ({ value, label, isSeconds }) => (
    <div className="flex flex-col items-center mx-3 md:mx-6">
      <motion.div 
        key={isSeconds ? value : 'static'}
        initial={isSeconds ? { opacity: 0.5, scale: 0.95 } : false}
        animate={isSeconds ? { 
          opacity: [1, 0.4, 1],
          scale: [1, 1.05, 1],
        } : { opacity: 1, scale: 1 }}
        transition={isSeconds ? {
          duration: 1,
          repeat: Infinity,
          ease: "easeInOut"
        } : { duration: 0 }}
        className="text-4xl md:text-6xl font-light text-[#B8860B]"
      >
        {value.toString().padStart(2, '0')}
      </motion.div>
      <div className="text-[12px] md:text-sm font-medium uppercase tracking-[0.2em] text-[#666] mt-2">
        {label}
      </div>
    </div>
  );

  return (
    <div className="w-full flex flex-col items-center justify-center py-8">
      <motion.h3 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-[#888] mb-10 font-bold"
      >
        Counting Down to the Big Day
      </motion.h3>
      
      <div className="flex items-center justify-center">
        <TimeUnit value={timeLeft.days} label="Days" />
        <div className="h-10 w-[1px] bg-[#B8860B]/30 mx-1 md:mx-2 self-start mt-2" />
        <TimeUnit value={timeLeft.hours} label="Hours" />
        <div className="h-10 w-[1px] bg-[#B8860B]/30 mx-1 md:mx-2 self-start mt-2" />
        <TimeUnit value={timeLeft.minutes} label="Minutes" />
        <div className="h-10 w-[1px] bg-[#B8860B]/30 mx-1 md:mx-2 self-start mt-2" />
        <TimeUnit value={timeLeft.seconds} label="Seconds" isSeconds />
      </div>

      <motion.div 
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
        className="w-32 h-[1px] bg-gradient-to-r from-transparent via-[#B8860B] to-transparent mt-12"
      />
    </div>
  );
};

export default Countdown;
