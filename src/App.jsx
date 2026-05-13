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
import IntroSection from './components/IntroSection';
import SequenceSection from './components/SequenceSection';
import { useLenis } from './hooks/useLenis';

const sections = [
  {
    id: '1',
    image: 'images/section1/Group 1027.png',
    stickyBg: false,
    layers: [
      {
        src: 'images/section1/Text.png',
        natural: true,
        className: "top-[15%] h-[30vh]",
        y: ["100%", "0%"],
        scale: [0.8, 0.9],
        objectFit: 'contain'
      },
      {
        src: 'images/section1/Lanterns.png',
        natural: true,
        className: "top-[5%] h-[70vh]",
        y: ["100%", "0%"],
        scale: [0.6, 0.8],
        imgClassName: 'animate-float opacity-70'
      },
      {
        src: 'images/section1/Couplea.png',
        natural: true,
        className: "bottom-[8%] h-[50vh]",
        y: ["100%", "0%"],
        scale: [1.1, 1.2],
        objectFit: 'contain'
      },
      {
        src: 'images/section1/Candles.png',
        natural: true,
        className: "bottom-[5%] h-[30vh]",
        y: ["100%", "0%"],
        scale: [1, 1.1],
        objectFit: 'contain'
      },
      {
        src: 'images/section1/flowers on railing.png',
        natural: true,
        className: "bottom-[2%] h-[25vh]",
        y: ["100%", "0%"],
        scale: [1, 1.05],
        objectFit: 'contain'
      },
    ],
  },
  {
    id: '2',
    layers: [
      { src: 'images/section2/Background.png', y: ["0%", "0%"] },
      { src: 'images/section2/Tree.png', y: ["-5%", "10%"] },
      { src: 'images/section2/tree up.png', y: ["-8%", "12%"] },
      { src: 'images/section2/Parents details.png', y: ["-2%", "2%"], scale: [0.98, 1.02, 1.02], initialY: 60 }
    ]
  },
  {
    id: '3',
    layers: [
      { src: 'images/section3/Background.png', y: ["0%", "0%"] },
      { src: 'images/section3/Lights.png', y: ["-2%", "8%"], className: 'animate-sparkle' },
      { src: 'images/section3/Tree.png', y: ["-5%", "10%"] },
      { src: 'images/section3/couple.png', y: ["0%", "0%"] },
      { src: 'images/section3/text.png', y: ["-2%", "5%"] }
    ]
  },
  {
    id: '4',
    layers: [
      { src: 'images/section4/Background.png', y: ["0%", "0%"] },
      { src: 'images/section4/Fan.png', y: ["-2%", "6%"] },
      { src: 'images/section4/Treeup.png', y: ["-5%", "8%"] },
      { src: 'images/section4/couple.png', y: ["0%", "0%"] },
      { src: 'images/section4/Hanging flower.png', y: ["-10%", "15%"] },
      { src: 'images/section4/Text.png', y: ["7%", "0%"], objectFit: 'object-contain', objectPosition: 'object-top' }
    ]
  },
  {
    id: '5',
    layers: [
      { src: 'images/section5/Background.png', y: ["0%", "0%"] },
      { src: 'images/section5/lantern.png', y: ["0%", "0%"], className: 'animate-sparkle' },
      { src: 'images/section5/Couple.png', y: ["0%", "0%"] },
      { src: 'images/section5/Text.png', y: ["10%", "0%"], objectFit: 'object-contain', objectPosition: 'object-top' }
    ]
  },
  {
    id: '6',
    layers: [
      { src: 'images/section6/Background.png', y: ["0%", "0%"] },
      { src: 'images/section6/Couple.png', y: ["0%", "0%"] },
      { src: 'images/section6/text.png', y: ["10%", "0%"], objectFit: 'object-contain', objectPosition: 'object-top' }
    ]
  },
  {
    id: '7',
    layers: [
      { src: 'images/section7/Background.png', y: ["0%", "0%"] },
      { src: 'images/section7/Text_v2.png', y: ["15%", "0%"], objectFit: 'object-contain', objectPosition: 'object-top' }
    ]
  }
];


function App() {
  const [isLoading, setIsLoading] = useState(true);
  useLenis();

  const section1 = sections.find(s => s.id === '1');

  return (
    <main className="bg-wedding-charcoal min-h-screen selection:bg-wedding-gold selection:text-wedding-charcoal">
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <Particles />
      <MusicPlayer />

      {!isLoading && (
        <div className="relative">
          <IntroSection />

          <div
            className="relative pointer-events-none w-full"
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

          {sections.slice(1).map((section, index) => (
            <React.Fragment key={section.id}>
              <StorySection
                index={index + 1}
                className={'h-[100svh]'}
                image={section.image}
                layers={section.layers}
                stickyBg={section.stickyBg}
                overlays={
                  <>
                    {section.id === '4' && <FallingFlowers />}
                    {section.id === '5' && <Firecrackers />}
                  </>
                }
                scratch={section.id === '2' ? <ScratchReveal className="top-[51%] left-[15%] w-[70%] h-[5%] rounded-full shadow-2xl" /> : null}
              >
              </StorySection>
              {index < sections.length - 2 && (
                <div
                  className="relative pointer-events-none w-full"
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

          {/* Final Sequence Section - Focused Content */}
          <SequenceSection
            images={[
              'images/last/Image - 1.png',
              'images/last/Image - 2.png',
              'images/last/Image - 3.png'
            ]}
            textImage="images/last/Text.png"
          />
        </div>
      )}
    </main>
  );
}

export default App;
