import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Phone, Heart } from 'lucide-react';
import LoadingScreen from './components/LoadingScreen';
import StorySection from './components/StorySection';
import MusicPlayer from './components/MusicPlayer';
import Particles from './components/Particles';
import Firecrackers from './components/Firecrackers';
import Lanterns from './components/Lanterns';
import ScratchReveal from './components/ScratchReveal';
import FallingFlowers from './components/FallingFlowers';
import { useLenis } from './hooks/useLenis';

const sections = [
  { 
    id: '1', 
    layers: [
      { src: '/images/section1/Background.png', y: ["0%", "0%"] },
      { src: '/images/section1/Lights on Trees.png', y: ["-2%", "8%"] },
      { src: '/images/section1/Flower On trees.png', y: ["-2%", "8%"] },
      { src: '/images/section1/Couplea.png', y: ["-5%", "12%"] },
      { src: '/images/section1/Candles.png', y: ["-8%", "15%"] },
      { src: '/images/section1/Lanterns.png', y: ["-25%", "5%"], scale: [0.85, 1.15], imgClassName: 'animate-float animate-sparkle' },
      { src: '/images/section1/Lanterns.png', y: ["-10%", "15%"], scale: [0.95, 1.05], imgClassName: 'animate-float-flipped animate-sparkle opacity-80' },
      { src: '/images/section1/flowers on railing.png', y: ["-12%", "20%"] },
      { src: '/images/section1/Text.png', y: ["0%", "-5%"] }
    ]
  },
  { 
    id: '2', 
    layers: [
      { src: '/images/section2/Background.png', y: ["0%", "0%"] },
      { src: '/images/section2/Tree.png', y: ["-5%", "10%"] },
      { src: '/images/section2/tree up.png', y: ["-8%", "12%"] },
      { src: '/images/section2/Parents details.png', y: ["-2%", "2%"], scale: [0.98, 1.02, 1.02] }
    ]
  },
  { 
    id: '3', 
    layers: [
      { src: '/images/section3/Background.png', y: ["0%", "0%"] },
      { src: '/images/section3/Lights.png', y: ["-2%", "8%"], className: 'animate-sparkle' },
      { src: '/images/section3/Tree.png', y: ["-5%", "10%"] },
      { src: '/images/section3/couple.png', y: ["0%", "0%"] },
      { src: '/images/section3/text.png', y: ["-2%", "5%"] }
    ]
  },
  { 
    id: '4', 
    layers: [
      { src: '/images/section4/Background.png', y: ["0%", "0%"] },
      { src: '/images/section4/Fan.png', y: ["-2%", "6%"] },
      { src: '/images/section4/Treeup.png', y: ["-5%", "8%"] },
      { src: '/images/section4/couple.png', y: ["0%", "0%"] }, // keeping couple static per previous request logic
      { src: '/images/section4/Hanging flower.png', y: ["-10%", "15%"] },
      { src: '/images/section4/Text.png', y: ["0%", "0%"], objectFit: 'object-contain', objectPosition: 'object-top' }
    ]
  },
  { 
    id: '5', 
    layers: [
      { src: '/images/section5/Background.png', y: ["0%", "0%"] },
      { src: '/images/section5/lantern.png', y: ["0%", "0%"], className: 'animate-sparkle' },
      { src: '/images/section5/Couple.png', y: ["0%", "0%"] }, // static couple
      { src: '/images/section5/Text.png', y: ["0%", "0%"], objectFit: 'object-contain', objectPosition: 'object-top' }
    ]
  },
  { 
    id: '6', 
    layers: [
      { src: '/images/section6/Background.png', y: ["0%", "0%"] },
      { src: '/images/section6/Couple.png', y: ["0%", "0%"] }, // static couple
      { src: '/images/section6/text.png', y: ["0%", "0%"], objectFit: 'object-contain', objectPosition: 'object-top' }
    ]
  },
  { 
    id: '7', 
    layers: [
      { src: '/images/section7/Background.png', y: ["0%", "0%"] },
      { src: '/images/section7/Text.png', y: ["0%", "0%"], objectFit: 'object-contain', objectPosition: 'object-top' }
    ]
  }
];

function App() {
  const [isLoading, setIsLoading] = useState(true);
  useLenis();

  return (
    <main className="bg-wedding-charcoal min-h-screen selection:bg-wedding-gold selection:text-wedding-charcoal">
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <Particles />
      <MusicPlayer />

      {!isLoading && (
        <div className="relative">
          {sections.map((section, index) => (
            <React.Fragment key={section.id}>
              <StorySection
                index={index}
                image={section.image}
                layers={section.layers}
                overlays={
                  <>
                    {section.id === '4' && <FallingFlowers />}
                    {section.id === '5' && <Firecrackers />}
                  </>
                }
                scratch={section.id === '2' ? <ScratchReveal /> : null}
              >
              </StorySection>
              {index < sections.length - 1 && (
                <div 
                  className="relative pointer-events-none w-[110vw] -ml-[5vw]"
                  style={{
                    height: '3rem',
                    marginTop: '-1.5rem',
                    marginBottom: '-1.5rem',
                    zIndex: 70,
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    maskImage: 'linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)',
                    WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)',
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      )}
    </main>
  );
}

export default App;
