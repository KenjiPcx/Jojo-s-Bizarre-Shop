'use client';

import { useState, useEffect, useRef } from 'react';
import { playMenacing, initializeAudio, playRandomJojoCatchphrase, playToBeContinued, stopAllAudio, setMasterVolume } from '@/lib/audio';
import { dioQuotes, standEncounters } from '@/data/products';

interface FloatingMenacingProps {
  count: number;
}

function FloatingMenacing({ count }: FloatingMenacingProps) {
  const [symbols, setSymbols] = useState<Array<{ id: number; x: number; y: number; rotation: number; size: number; color: string; symbol: string; velocity: { x: number; y: number }; life: number }>>([]);

  useEffect(() => {
    const menacingSymbols = ['ゴ', 'ド', 'ォ', 'ン', 'ゴゴ', 'ドド', 'ゴゴゴ', 'ドドド', 'ォォォ', 'ンンン'];
    const colors = ['text-red-500', 'text-purple-500', 'text-yellow-500', 'text-pink-500', 'text-orange-500', 'text-cyan-500', 'text-green-500', 'text-blue-500'];
    
    // Generate MORE aggressive symbols with movement
    const newSymbols = Array.from({ length: count * 2 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      rotation: Math.random() * 360,
      size: 20 + Math.random() * 60, // Bigger range
      color: colors[Math.floor(Math.random() * colors.length)],
      symbol: menacingSymbols[Math.floor(Math.random() * menacingSymbols.length)],
      velocity: {
        x: (Math.random() - 0.5) * 2,
        y: (Math.random() - 0.5) * 2
      },
      life: 100 + Math.random() * 200
    }));
    setSymbols(newSymbols);
    
    // Animate the symbols
    const interval = setInterval(() => {
      setSymbols(prev => prev.map(symbol => ({
        ...symbol,
        x: (symbol.x + symbol.velocity.x + 100) % 100,
        y: (symbol.y + symbol.velocity.y + 100) % 100,
        rotation: symbol.rotation + 3,
        life: symbol.life - 1
      })).filter(symbol => symbol.life > 0));
    }, 50);
    
    return () => clearInterval(interval);
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none z-30">
      {symbols.map((symbol) => (
        <div
          key={symbol.id}
          className={`absolute ${symbol.color} font-bold select-none drop-shadow-lg`}
          style={{
            left: `${symbol.x}%`,
            top: `${symbol.y}%`,
            fontSize: `${symbol.size}px`,
            transform: `rotate(${symbol.rotation}deg)`,
            animation: `menacingFloat 2s ease-in-out infinite ${symbol.id * 0.15}s, menacingPulse 1.5s ease-in-out infinite ${symbol.id * 0.1}s`
          }}
        >
          {symbol.symbol}
        </div>
      ))}
      
      {/* Additional floating effects */}
      {Array.from({ length: 3 }, (_, i) => (
        <div
          key={`extra-${i}`}
          className="absolute text-6xl text-gold-400 opacity-30 select-none"
          style={{
            left: `${20 + i * 30}%`,
            top: `${30 + i * 20}%`,
            animation: `menacingSpiral 4s linear infinite ${i * 1.5}s`
          }}
        >
          ゴゴゴ
        </div>
      ))}
    </div>
  );
}

interface SpeedLinesProps {
  active: boolean;
}

function SpeedLines({ active }: SpeedLinesProps) {
  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-20">
      {/* Horizontal speed lines */}
      {Array.from({ length: 15 }, (_, i) => (
        <div
          key={`h-${i}`}
          className="absolute bg-gradient-to-r from-transparent via-yellow-300 to-transparent opacity-60"
          style={{
            width: '100vw',
            height: '3px',
            top: `${10 + i * 6}%`,
            transform: 'skewX(-20deg)',
            animation: `speedLineHorizontal 0.3s ease-out ${i * 0.02}s`
          }}
        />
      ))}
      
      {/* Vertical speed lines */}
      {Array.from({ length: 20 }, (_, i) => (
        <div
          key={`v-${i}`}
          className="absolute bg-gradient-to-b from-transparent via-white to-transparent opacity-40"
          style={{
            width: '2px',
            height: '100vh',
            left: `${i * 5}%`,
            transform: 'skewX(-15deg)',
            animation: `speedLineVertical 0.4s ease-out ${i * 0.03}s`
          }}
        />
      ))}
      
      {/* Diagonal speed lines for extra effect */}
      {Array.from({ length: 8 }, (_, i) => (
        <div
          key={`d-${i}`}
          className="absolute bg-gradient-to-r from-transparent via-purple-300 to-transparent opacity-50"
          style={{
            width: '150vw',
            height: '4px',
            top: `${20 + i * 10}%`,
            left: '-25vw',
            transform: 'rotate(-30deg)',
            animation: `speedLineDiagonal 0.6s ease-out ${i * 0.04}s`
          }}
        />
      ))}
    </div>
  );
}

export function JoJoEffects() {
  const [showMenacing, setShowMenacing] = useState(false);
  const [showSpeedLines, setShowSpeedLines] = useState(false);
  const [currentQuote, setCurrentQuote] = useState('');
  const [showQuote, setShowQuote] = useState(false);
  const [standEncounter, setStandEncounter] = useState('');
  const [showEncounter, setShowEncounter] = useState(false);
  const [toBeContinued, setToBeContinued] = useState(false);
  const audioInitialized = useRef(false);

  // Initialize audio on first user interaction
  useEffect(() => {
    const handleFirstInteraction = async () => {
      if (!audioInitialized.current) {
        await initializeAudio();
        audioInitialized.current = true;
        console.log('🎵 JoJo audio system initialized!');
      }
    };

    document.addEventListener('click', handleFirstInteraction, { once: true });
    document.addEventListener('keydown', handleFirstInteraction, { once: true });

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };
  }, []);

  // Visual effects timer - no audio spam since main audio system handles that
  useEffect(() => {
    const interval = setInterval(() => {
      // Just show menacing effect periodically for visual flair
      if (Math.random() < 0.5) {
        setShowMenacing(true);
        setTimeout(() => setShowMenacing(false), 3000);
      }
    }, 120000); // Every 2 minutes

    return () => clearInterval(interval);
  }, []);

  // Random DIO quotes
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.3) {
        const quote = dioQuotes[Math.floor(Math.random() * dioQuotes.length)];
        setCurrentQuote(quote);
        setShowQuote(true);
        
        setTimeout(() => setShowQuote(false), 4000);
      }
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Random Stand encounters
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.2) {
        const encounter = standEncounters[Math.floor(Math.random() * standEncounters.length)];
        setStandEncounter(encounter);
        setShowEncounter(true);
        playRandomJojoCatchphrase();
        
        setTimeout(() => setShowEncounter(false), 5000);
      }
    }, 45000); // Every 45 seconds

    return () => clearInterval(interval);
  }, []);

  // Scroll-triggered effects
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;
    let lastTimestamp = Date.now();

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const currentTimestamp = Date.now();
      const timeDelta = currentTimestamp - lastTimestamp;
      const scrollDelta = Math.abs(currentScrollY - lastScrollY);
      
      // Calculate scroll velocity
      scrollVelocity = scrollDelta / timeDelta;

      // AGGRESSIVE: Reduced threshold for speed lines
      if (scrollDelta > 20) {
        setShowSpeedLines(true);
        setTimeout(() => setShowSpeedLines(false), 1200);
      }
      
      // AGGRESSIVE: Lower threshold for menacing symbols
      if (scrollDelta > 50 || scrollVelocity > 1) {
        setShowMenacing(true);
        setTimeout(() => setShowMenacing(false), 3500);
        
        // More frequent sound effects
        if (Math.random() < 0.3) {
          playRandomJojoCatchphrase();
        }
        
        // Add screen shake for intense scrolling
        if (scrollVelocity > 3) {
          document.body.style.animation = 'screenShakeLight 0.3s ease-in-out';
          setTimeout(() => {
            document.body.style.animation = '';
          }, 300);
        }
      }

      // AGGRESSIVE: More symbols for any scroll movement
      if (scrollDelta > 10) {
        const symbolCount = Math.min(Math.floor(scrollDelta / 20), 20); // More symbols
        setShowMenacing(true);
        setTimeout(() => setShowMenacing(false), 2000);
      }

      lastScrollY = currentScrollY;
      lastTimestamp = currentTimestamp;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // To Be Continued effect on page leave
  useEffect(() => {
    let mouseLeaveTimeout: NodeJS.Timeout;
    
    const handleMouseLeave = (e: MouseEvent) => {
      // Detect if mouse is moving towards the close button or address bar
      if (e.clientY <= 0 || e.clientX <= 0 || e.clientX >= window.innerWidth) {
        mouseLeaveTimeout = setTimeout(() => {
          triggerToBeContinuedEffect();
        }, 500); // Small delay to avoid false positives
      }
    };
    
    const handleMouseEnter = () => {
      // Clear timeout if mouse returns to page
      if (mouseLeaveTimeout) {
        clearTimeout(mouseLeaveTimeout);
      }
    };

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      triggerToBeContinuedEffect();
      e.preventDefault();
      e.returnValue = '';
    };

    // Add both mouse leave detection and beforeunload
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      if (mouseLeaveTimeout) {
        clearTimeout(mouseLeaveTimeout);
      }
    };
  }, []);

  // Proper To Be Continued effect with audio timing
  const triggerToBeContinuedEffect = () => {
    console.log('🎵 Triggering To Be Continued effect...');
    
    // Step 1: Quiet all other sounds and prepare for the meme
    const originalVolume = 0.5; // Store current volume
    setMasterVolume(0.2); // Lower all other audio
    
    // Step 2: Start playing the To Be Continued music
    playToBeContinued();
    
    // Step 3: After 7 seconds (when the iconic part hits), show the visual effect
    setTimeout(() => {
      setToBeContinued(true);
      console.log('📺 To Be Continued visual effect activated!');
      
      // Step 4: Show effect for 5 seconds then hide and restore audio
      setTimeout(() => {
        setToBeContinued(false);
        setMasterVolume(originalVolume); // Restore original volume
        console.log('🔊 Audio restored, effect complete');
      }, 5000);
    }, 5500); // Wait 7 seconds for the music buildup
  };

  return (
    <>
      {/* Floating Menacing Symbols */}
      {showMenacing && <FloatingMenacing count={16} />}

      {/* Speed Lines */}
      <SpeedLines active={showSpeedLines} />

      {/* DIO Quote Popup */}
      {showQuote && (
        <div className="fixed top-4 right-4 z-50 max-w-sm bg-gradient-to-r from-yellow-500 to-orange-500 text-black p-4 rounded-lg shadow-2xl border-4 border-red-500 animate-bounce">
          <div className="font-bold text-lg mb-2">DIO SAYS:</div>
          <div className="text-sm italic">{currentQuote}</div>
          <div className="absolute -top-2 -left-2 text-4xl">😈</div>
        </div>
      )}

      {/* Stand Encounter Popup */}
      {showEncounter && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-gradient-to-r from-purple-900 to-black p-6 rounded-lg border-4 border-yellow-400 shadow-2xl animate-pulse">
          <div className="text-center">
            <div className="text-3xl mb-4">⚡ STAND ENCOUNTER! ⚡</div>
            <div className="text-yellow-400 font-bold text-lg">{standEncounter}</div>
            <div className="mt-4 text-red-500 text-sm animate-bounce">
              ゴゴゴゴ MENACING ゴゴゴゴ
            </div>
          </div>
        </div>
      )}

      {/* To Be Continued Effect */}
      {toBeContinued && (
        <div className="fixed inset-0 z-[100] overflow-hidden">
          {/* Sepia/grayscale freeze frame overlay */}
          <div 
            className="absolute inset-0 transition-all duration-1000"
            style={{
              filter: 'sepia(100%) saturate(50%) hue-rotate(30deg) brightness(0.8) contrast(1.2)',
              background: 'radial-gradient(circle, rgba(139,69,19,0.3) 0%, rgba(160,82,45,0.5) 50%, rgba(101,67,33,0.7) 100%)'
            }}
          >
            {/* Frozen screen effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-900/40 via-yellow-800/30 to-orange-900/50"></div>
          </div>
          
          {/* Main "To Be Continued" content */}
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-yellow-400/90 via-orange-500/90 to-red-500/90">
            <div className="text-center text-black relative">
              {/* Background Japanese text effect */}
              <div className="absolute -z-10 text-9xl opacity-10 font-bold transform -rotate-12">
                つづく
              </div>
              
              <div className="text-6xl md:text-8xl font-bold mb-8 animate-pulse tracking-wider">
                TO BE CONTINUED
              </div>
              
              {/* Stylized arrow */}
              <div className="flex items-center justify-center mb-8">
                <div className="relative">
                  {/* Arrow body */}
                  <div className="w-32 h-3 bg-black transform skew-x-12"></div>
                  {/* Arrow head */}
                  <div className="absolute -right-2 top-1/2 transform -translate-y-1/2">
                    <div className="w-0 h-0 border-l-8 border-l-black border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
                  </div>
                  {/* Arrow decoration */}
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-orange-300 opacity-50 transform skew-x-12"></div>
                </div>
              </div>
              
              <div className="mt-8 text-xl md:text-2xl italic font-semibold">
                "Your bizarre shopping adventure will continue..."
              </div>
              
              {/* JoJo style sound effect text */}
              <div className="mt-4 text-lg font-bold text-purple-900 animate-bounce">
                ゴゴゴゴゴゴゴゴ
              </div>
            </div>
          </div>
          
          {/* Vintage film effect lines */}
          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={i}
              className="absolute bg-black/20 animate-pulse"
              style={{
                width: '100%',
                height: '1px',
                top: `${i * 5}%`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: '2s'
              }}
            />
          ))}
          
          {/* Film grain effect */}
          <div className="absolute inset-0 opacity-30 animate-pulse bg-gradient-to-br from-transparent via-black/10 to-transparent"></div>
        </div>
      )}

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes menacingFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-10px) rotate(5deg); }
          50% { transform: translateY(-5px) rotate(-5deg); }
          75% { transform: translateY(-15px) rotate(3deg); }
        }
        
        @keyframes menacingPulse {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        
        @keyframes menacingSpiral {
          0% { transform: rotate(0deg) translateX(50px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(50px) rotate(-360deg); }
        }
        
        @keyframes speedLineHorizontal {
          0% { transform: translateX(-100vw) skewX(-20deg); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(100vw) skewX(-20deg); opacity: 0; }
        }
        
        @keyframes speedLineVertical {
          0% { transform: translateY(-100vh) skewX(-15deg); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(100vh) skewX(-15deg); opacity: 0; }
        }
        
        @keyframes speedLineDiagonal {
          0% { transform: translateX(-100vw) rotate(-30deg); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(100vw) rotate(-30deg); opacity: 0; }
        }
        
        @keyframes speedLineCard {
          0% { transform: translateX(-100%) skewX(-25deg); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(100%) skewX(-25deg); opacity: 0; }
        }
        
        @keyframes slideIn {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes screenShakeLight {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-2px) translateY(1px); }
          50% { transform: translateX(2px) translateY(-1px); }
          75% { transform: translateX(-1px) translateY(1px); }
        }
      `}</style>
    </>
  );
}