import { useState, useRef, useEffect } from 'react';
import { Music, Music2, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    const startAudio = () => {
      if (isPlaying && audioRef.current) {
        audioRef.current.play().catch(() => {
          // Still blocked, will try again on next interaction
        });
      }
    };

    window.addEventListener('click', startAudio, { once: true });
    window.addEventListener('touchstart', startAudio, { once: true });
    window.addEventListener('scroll', startAudio, { once: true });

    return () => {
      window.removeEventListener('click', startAudio);
      window.removeEventListener('touchstart', startAudio);
      window.removeEventListener('scroll', startAudio);
    };
  }, [isPlaying]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => console.log("Audio play blocked:", err));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-[4vh] right-[6vw] z-[9999]">
      <audio
        ref={audioRef}
        loop
        src={`${import.meta.env.BASE_URL}music.mp3`}
      />
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={togglePlay}
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-black/30 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all hover:border-wedding-gold/50 focus:outline-none"
      >
        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.div
              key="playing"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <Volume2 className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="paused"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <VolumeX className="w-6 h-6 text-white/50" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Subtle spinning glow when playing */}
        {isPlaying && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[-2px] rounded-full border border-t-wedding-gold/50 border-r-transparent border-b-wedding-gold/50 border-l-transparent"
          />
        )}
      </motion.button>
    </div>
  );
};

export default MusicPlayer;
