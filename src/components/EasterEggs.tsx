'use client';

import { useState, useEffect, useRef } from 'react';
import { useAchievements } from '@/hooks/useAchievements';
import { useJojoAudio } from '@/hooks/useJojoAudio';
import { Button } from '@/components/ui/button';

interface EasterEgg {
  id: string;
  type: 'click' | 'hover' | 'sequence' | 'konami';
  element: string;
  trigger: string | string[];
  achievementId: string;
  audioClip?: string;
  effect?: () => void;
}

const easterEggs: EasterEgg[] = [
  {
    id: 'dio-logo',
    type: 'click',
    element: '.logo',
    trigger: 'click',
    achievementId: 'dio-brando',
    audioClip: 'kono-dio-da'
  },
  {
    id: 'joestar-run',
    type: 'sequence',
    element: 'body',
    trigger: ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight'],
    achievementId: 'joestar-secret-technique',
    audioClip: 'joestar-run'
  },
  {
    id: 'menacing-hover',
    type: 'hover',
    element: '.product-card',
    trigger: 'hover:5s',
    achievementId: 'menacing-aura',
    audioClip: 'pillarmen-theme'
  },
  {
    id: 'za-warudo-click',
    type: 'click',
    element: '.cart-button',
    trigger: 'click:10',
    achievementId: 'time-stop-master',
    audioClip: 'za-warudo-stop-time'
  }
];

export function EasterEggs() {
  const { unlockAchievement } = useAchievements();
  const { playAudio } = useJojoAudio();
  const [konamiSequence, setKonamiSequence] = useState<string[]>([]);
  const [clickCounts, setClickCounts] = useState<{ [key: string]: number }>({});
  const hoverTimeouts = useRef<{ [key: string]: NodeJS.Timeout }>({});

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const newSequence = [...konamiSequence, e.code].slice(-8);
      setKonamiSequence(newSequence);

      const joestartRun = easterEggs.find(egg => egg.id === 'joestar-run');
      if (joestartRun && Array.isArray(joestartRun.trigger)) {
        const triggerSequence = joestartRun.trigger.map(key => 
          key.replace('Arrow', 'Arrow')
        );
        
        if (newSequence.length === triggerSequence.length &&
            newSequence.every((key, index) => key === triggerSequence[index])) {
          unlockAchievement(joestartRun.achievementId);
          if (joestartRun.audioClip) {
            playAudio(joestartRun.audioClip);
          }
          setKonamiSequence([]);
        }
      }
    };

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      easterEggs.forEach(egg => {
        if (egg.type === 'click' && target.matches(egg.element)) {
          if (typeof egg.trigger === 'string') {
            if (egg.trigger === 'click') {
              unlockAchievement(egg.achievementId);
              if (egg.audioClip) {
                playAudio(egg.audioClip);
              }
            } else if (egg.trigger.startsWith('click:')) {
              const requiredClicks = parseInt(egg.trigger.split(':')[1]);
              const currentCount = (clickCounts[egg.id] || 0) + 1;
              setClickCounts(prev => ({ ...prev, [egg.id]: currentCount }));
              
              if (currentCount >= requiredClicks) {
                unlockAchievement(egg.achievementId);
                if (egg.audioClip) {
                  playAudio(egg.audioClip);
                }
                setClickCounts(prev => ({ ...prev, [egg.id]: 0 }));
              }
            }
          }
        }
      });
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      easterEggs.forEach(egg => {
        if (egg.type === 'hover' && target.matches(egg.element)) {
          if (typeof egg.trigger === 'string' && egg.trigger.startsWith('hover:')) {
            const hoverDuration = parseInt(egg.trigger.split(':')[1]) * 1000;
            
            hoverTimeouts.current[egg.id] = setTimeout(() => {
              unlockAchievement(egg.achievementId);
              if (egg.audioClip) {
                playAudio(egg.audioClip);
              }
            }, hoverDuration);
          }
        }
      });
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      easterEggs.forEach(egg => {
        if (egg.type === 'hover' && target.matches(egg.element)) {
          if (hoverTimeouts.current[egg.id]) {
            clearTimeout(hoverTimeouts.current[egg.id]);
            delete hoverTimeouts.current[egg.id];
          }
        }
      });
    };

    document.addEventListener('keydown', handleKeyPress);
    document.addEventListener('click', handleClick);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('click', handleClick);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
      
      Object.values(hoverTimeouts.current).forEach(timeout => clearTimeout(timeout));
    };
  }, [konamiSequence, clickCounts, unlockAchievement, playAudio]);

  return null;
}

export function SecretJojoButton() {
  const { unlockAchievement } = useAchievements();
  const { playAudio } = useJojoAudio();
  const [clicks, setClicks] = useState(0);

  const handleSecretClick = () => {
    const newClicks = clicks + 1;
    setClicks(newClicks);

    if (newClicks === 1) {
      playAudio('oh-no-joseph');
      unlockAchievement('first-discovery');
    } else if (newClicks === 5) {
      playAudio('yare-yare-daze');
      unlockAchievement('persistent-explorer');
    } else if (newClicks === 10) {
      playAudio('za-warudo-over-heaven');
      unlockAchievement('heaven-ascended');
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className="fixed bottom-4 right-4 opacity-10 hover:opacity-50 transition-opacity"
      onClick={handleSecretClick}
    >
      🗿
    </Button>
  );
}

export function HiddenMenacingText() {
  const { unlockAchievement } = useAchievements();
  const { playAudio } = useJojoAudio();
  const [revealed, setRevealed] = useState(false);

  const handleReveal = () => {
    if (!revealed) {
      setRevealed(true);
      unlockAchievement('menacing-discoverer');
      playAudio('pillarmen-theme');
    }
  };

  return (
    <div 
      className="fixed top-1/2 left-4 transform -translate-y-1/2 cursor-pointer select-none"
      style={{ 
        writingMode: 'vertical-rl',
        textOrientation: 'mixed',
        color: revealed ? '#ff6b35' : 'transparent',
        fontSize: '12px',
        transition: 'color 0.3s ease',
        textShadow: revealed ? '0 0 10px #ff6b35' : 'none'
      }}
      onClick={handleReveal}
      onMouseEnter={() => {
        if (!revealed) {
          const element = document.querySelector('.hidden-menacing') as HTMLElement;
          if (element) {
            element.style.color = 'rgba(255, 107, 53, 0.3)';
          }
        }
      }}
      onMouseLeave={() => {
        if (!revealed) {
          const element = document.querySelector('.hidden-menacing') as HTMLElement;
          if (element) {
            element.style.color = 'transparent';
          }
        }
      }}
      className="hidden-menacing"
    >
      ゴゴゴゴゴ
    </div>
  );
}

export function KonoMemeReference() {
  const { unlockAchievement } = useAchievements();
  const { playAudio } = useJojoAudio();
  const [activated, setActivated] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      
      if (scrollPercent > 90 && !activated) {
        setActivated(true);
        unlockAchievement('scroll-master');
        playAudio('to-be-continued');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activated, unlockAchievement, playAudio]);

  if (!activated) return null;

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 text-yellow-400 text-2xl font-bold animate-pulse">
      TO BE CONTINUED...
    </div>
  );
}