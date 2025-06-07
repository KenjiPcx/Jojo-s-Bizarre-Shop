'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { playKonoDioDa, playWryyy, playToBeContinued, playIlVentoDoro, playMudaMuda, playOraOra } from '@/lib/audio';

interface PopupAd {
  id: string;
  title: string;
  content: string;
  image: string;
  cta: string;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
  style: 'dio' | 'jotaro' | 'giorno' | 'kira' | 'joseph';
}

const jojoAds: PopupAd[] = [
  {
    id: '1',
    title: 'DIO\'S SPECIAL OFFER!',
    content: 'You thought it was a normal ad, but it was me, DIO! Get 50% off all vampire-related merchandise!',
    image: '🧛‍♂️',
    cta: 'EMBRACE IMMORTALITY',
    position: 'center',
    style: 'dio'
  },
  {
    id: 'wryyy1',
    title: 'WRYYY!',
    content: 'WRYYYYY! These deals are so good they make vampires scream! Buy now or face THE WORLD!',
    image: '😈',
    cta: 'WRYYY BUY NOW',
    position: 'top-left',
    style: 'dio'
  },
  {
    id: 'mudamuda1',
    title: 'MUDAMUDAMUDA!',
    content: 'MUDA MUDA MUDA! It\'s useless to resist these incredible prices! Golden Experience awaits!',
    image: '👊',
    cta: 'MUDA MUDA BUY',
    position: 'bottom-right',
    style: 'giorno'
  },
  {
    id: 'oraora1',
    title: 'ORA ORA ORA!',
    content: 'ORA ORA ORA! Star Platinum approves these deals! Time to stop hesitating and start buying!',
    image: '⭐',
    cta: 'ORA ORA PURCHASE',
    position: 'top-right',
    style: 'jotaro'
  },
  {
    id: 'yare1',
    title: 'YARE YARE DAZE...',
    content: 'Yare yare daze... Good grief, these prices are so low it\'s annoying. Just buy something already.',
    image: '🙄',
    cta: 'YARE YARE BUY',
    position: 'bottom-left',
    style: 'jotaro'
  },
  {
    id: '2',
    title: 'STAR PLATINUM SAYS...',
    content: 'ORA ORA ORA! These deals are so good, they stop time! Limited time offer on Stand figures!',
    image: '⭐',
    cta: 'ORA ORA BUY NOW',
    position: 'top-right',
    style: 'jotaro'
  },
  {
    id: '3',
    title: 'GIORNO\'S GOLDEN EXPERIENCE',
    content: 'I, Giorno Giovanna, have a dream... and that dream is for you to buy our premium manga collection!',
    image: '🌟',
    cta: 'ACHIEVE YOUR DREAM',
    position: 'bottom-left',
    style: 'giorno'
  },
  {
    id: '4',
    title: 'KILLER QUEEN\'S EXPLOSIVE DEALS',
    content: 'BITE ZA DUSTO! These prices have already been touched by Killer Queen and will explode soon!',
    image: '💀',
    cta: 'DETONATE SAVINGS',
    position: 'top-left',
    style: 'kira'
  },
  {
    id: '5',
    title: 'JOSEPH\'S NEXT LINE IS...',
    content: '"I need to buy everything in this store!" - That\'s what you were going to say, wasn\'t it?',
    image: '🔮',
    cta: 'PREDICT AND PURCHASE',
    position: 'bottom-right',
    style: 'joseph'
  },
  {
    id: '6',
    title: 'SPEEDWAGON FOUNDATION ALERT',
    content: 'Even Speedwagon is afraid... of missing these incredible deals on JoJo merchandise!',
    image: '🎩',
    cta: 'DON\'T BE AFRAID, BUY!',
    position: 'center',
    style: 'joseph'
  },
  {
    id: '7',
    title: '🎵 TO BE CONTINUED... 🎵',
    content: 'Your shopping journey will continue with ROUNDABOUT playing! Don\'t miss out on these BIZARRE deals!',
    image: '▶️',
    cta: 'CONTINUE THE ADVENTURE',
    position: 'center',
    style: 'dio'
  },
  {
    id: '8',
    title: 'IL VENTO D\'ORO SALE!',
    content: 'MUDA MUDA MUDA! These prices are USELESS compared to what you\'ll save! Experience the Golden Wind of savings!',
    image: '🌪️',
    cta: 'MUDA MUDA BUY NOW',
    position: 'top-left',
    style: 'giorno'
  },
  {
    id: '9',
    title: 'ULTIMATE STAND RUSH!',
    content: 'ORA ORA ORA vs MUDA MUDA MUDA! Which side will you choose? Both sides have incredible merchandise!',
    image: '👊',
    cta: 'JOIN THE RUSH',
    position: 'bottom-right',
    style: 'jotaro'
  }
];

export function JoJoPopupAds() {
  const [activeAds, setActiveAds] = useState<PopupAd[]>([]);
  const [closedAds, setClosedAds] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Popup timer - appears every 60 seconds
    const interval = setInterval(() => {
      // Guarantee a popup appears every minute (don't rely on random chance)
      if (activeAds.length < 3) {
        const availableAds = jojoAds.filter(ad => !closedAds.has(ad.id) && !activeAds.find(active => active.id === ad.id));
        
        if (availableAds.length > 0) {
          const randomAd = availableAds[Math.floor(Math.random() * availableAds.length)];
          setActiveAds(prev => [...prev, randomAd]);
          
          // Play appropriate sound based on ad content
          if (randomAd.id === '7') { // To Be Continued ad
            playToBeContinued();
          } else if (randomAd.id === '8') { // Il Vento D'Oro ad
            playIlVentoDoro();
          } else if (randomAd.id === '9') { // Stand Rush ad
            if (Math.random() < 0.5) {
              playOraOra();
            } else {
              playMudaMuda();
            }
          } else if (randomAd.style === 'dio') {
            playKonoDioDa();
          } else if (randomAd.style === 'jotaro') {
            playOraOra();
          } else if (randomAd.style === 'giorno') {
            playMudaMuda();
          } else {
            playWryyy();
          }
          
          // Auto-close after 10 seconds
          setTimeout(() => {
            setActiveAds(prev => prev.filter(ad => ad.id !== randomAd.id));
          }, 10000);
        }
      }
    }, 20000 + Math.random() * 10000); // Every 20-30 seconds - ULTRA FREQUENT

    return () => clearInterval(interval);
  }, [activeAds, closedAds]);

  const closeAd = (adId: string) => {
    setActiveAds(prev => prev.filter(ad => ad.id !== adId));
    setClosedAds(prev => new Set([...prev, adId]));
  };

  const getAdStyles = (ad: PopupAd) => {
    const baseStyles = "fixed z-40 bg-gradient-to-r p-4 rounded-lg border-4 shadow-2xl max-w-sm";
    
    // Enhanced dramatic animations based on ad type
    const animationClass = ad.id === '7' ? 'animate-pulse' : 
                          ad.id === '8' ? 'animate-spin' : 
                          ad.id === '9' ? 'animate-bounce' : 'animate-bounce';
    
    const positionStyles = {
      'top-left': 'top-4 left-4',
      'top-right': 'top-4 right-4',
      'bottom-left': 'bottom-4 left-4',
      'bottom-right': 'bottom-4 right-4',
      'center': 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
    };

    // Special styling for YARE YARE DAZE popup
    if (ad.id === 'yare1') {
      return `${baseStyles} yare-yare-modal ${positionStyles[ad.position]}`;
    }

    const styleVariants = {
      dio: 'from-yellow-400 via-orange-500 to-red-600 border-red-500 text-black',
      jotaro: 'from-blue-500 via-purple-600 to-indigo-700 border-white text-white',
      giorno: 'from-yellow-300 via-yellow-500 to-green-500 border-green-500 text-black',
      kira: 'from-pink-400 via-purple-500 to-black border-black text-white',
      joseph: 'from-green-400 via-blue-400 to-teal-500 border-brown-500 text-black'
    };

    return `${baseStyles} ${animationClass} ${positionStyles[ad.position]} ${styleVariants[ad.style]}`;
  };

  return (
    <>
      {activeAds.map((ad) => (
        <div key={ad.id} className={getAdStyles(ad)}>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => closeAd(ad.id)}
            className="absolute top-0 right-0 h-4 w-4 p-0 hover:bg-red-500 hover:text-white text-xs opacity-70 hover:opacity-100 transform hover:scale-110 transition-all animate-pulse"
            style={{
              transform: `translate(${Math.sin(Date.now() / 1000) * 2}px, ${Math.cos(Date.now() / 1000) * 2}px)`,
              fontSize: '8px'
            }}
          >
            <X className="h-2 w-2" />
          </Button>

          <div className="text-center">
            <div className="text-4xl mb-2">{ad.image}</div>
            <div className="font-bold text-lg mb-2">{ad.title}</div>
            <div className="text-sm mb-4 leading-relaxed">{ad.content}</div>
            
            <Button 
              className={`w-full font-bold text-sm ${
                ad.id === 'yare1' ? 'yare-yare-button' :
                ad.style === 'dio' ? 'bg-red-600 hover:bg-red-700 text-white' :
                ad.style === 'jotaro' ? 'bg-white hover:bg-gray-200 text-black' :
                ad.style === 'giorno' ? 'bg-green-600 hover:bg-green-700 text-white' :
                ad.style === 'kira' ? 'bg-black hover:bg-gray-800 text-white' :
                'bg-orange-500 hover:bg-orange-600 text-white'
              }`}
              onClick={() => closeAd(ad.id)}
            >
              {ad.cta}
            </Button>
          </div>

          {/* Character-specific effects */}
          {ad.style === 'dio' && (
            <div className="absolute -top-2 -right-2 text-2xl animate-spin">
              ⚡
            </div>
          )}
          
          {ad.style === 'jotaro' && ad.id === 'yare1' && (
            <>
              <div className="absolute -top-3 -left-3 text-lg text-yellow-400 animate-pulse opacity-80">
                ゴ
              </div>
              <div className="absolute -top-2 -right-4 text-lg text-yellow-400 animate-pulse opacity-80" style={{ animationDelay: '0.3s' }}>
                ゴ
              </div>
              <div className="absolute -bottom-3 -left-4 text-lg text-yellow-400 animate-pulse opacity-80" style={{ animationDelay: '0.6s' }}>
                ゴ
              </div>
              <div className="absolute -bottom-2 -right-3 text-lg text-yellow-400 animate-pulse opacity-80" style={{ animationDelay: '0.9s' }}>
                ゴ
              </div>
              <div className="absolute top-1/2 -left-5 text-lg text-yellow-400 animate-pulse opacity-80" style={{ animationDelay: '0.15s' }}>
                ゴ
              </div>
              <div className="absolute top-1/2 -right-5 text-lg text-yellow-400 animate-pulse opacity-80" style={{ animationDelay: '0.45s' }}>
                ゴ
              </div>
            </>
          )}
          
          {ad.style === 'jotaro' && ad.id !== 'yare1' && (
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 text-xs text-white">
              ゴゴゴゴ
            </div>
          )}
          
          {ad.style === 'giorno' && (
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 3 }, (_, i) => (
                <div 
                  key={i}
                  className="absolute text-yellow-300 text-xs animate-pulse"
                  style={{
                    left: `${20 + i * 30}%`,
                    top: `${10 + i * 20}%`,
                    animationDelay: `${i * 0.5}s`
                  }}
                >
                  ✨
                </div>
              ))}
            </div>
          )}
          
          {ad.style === 'kira' && (
            <div className="absolute -top-1 -left-1 text-xl animate-bounce">
              💣
            </div>
          )}
        </div>
      ))}
    </>
  );
}