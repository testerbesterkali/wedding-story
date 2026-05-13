import { useState, useRef, useEffect } from 'react';
import { Music, Music2, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => console.log("Audio play blocked:", err));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-[8vh] right-[6vw] z-[9999]">
      <audio
        ref={audioRef}
        loop
        src="https://cdn.pixabay.com/audio/2022/08/02/audio_884fe92c21.mp3" // Calm Piano for Wedding
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
      
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-full right-0 mb-4 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full text-[9px] text-white/80 whitespace-nowrap tracking-[0.2em] uppercase border border-white/10"
          >
            Calm Piano
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MusicPlayer;
