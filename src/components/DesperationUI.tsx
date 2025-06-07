'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { playWryyyScream } from '@/lib/audio';

// Fake activity feed component
function FakeActivityFeed({ level }: { level: number }) {
  const [activities, setActivities] = useState<string[]>([]);

  useEffect(() => {
    const fakeActivities = [
      '🔥 Jotaro from Tokyo just bought 3 items!',
      '⚡ DIO_FAN_2024 purchased the Golden Arrow!',
      '🌟 Speedwagon lover just added 5 items to cart!',
      '💫 Stand_User_69 bought everything in 30 seconds!',
      '🎯 Giorno_Giovanna just made a purchase!',
      '⭐ Polnareff enthusiast bought 2 items!',
      '🔶 Someone from Italy just purchased!',
      '🌙 Kakyoin fan just bought the Emerald Splash!',
      '🏮 Josuke supporter made a big order!',
      '⚔️ Stand master just cleared their cart!'
    ];

    const interval = setInterval(() => {
      const newActivity = fakeActivities[Math.floor(Math.random() * fakeActivities.length)];
      setActivities(prev => {
        const updated = [newActivity, ...prev].slice(0, 3); // Keep only 3 recent
        return updated;
      });
    }, level >= 4 ? 3000 : 5000); // Faster in Level 4

    return () => clearInterval(interval);
  }, [level]);

  return (
    <div className="space-y-2">
      {activities.map((activity, index) => (
        <div
          key={index}
          className={`bg-green-600/90 text-white px-3 py-2 rounded-lg text-xs font-bold 
            border border-green-400 max-w-xs animate-slide-in transition-all duration-300 ${
            level >= 4 ? 'animate-pulse bg-green-700' : ''
          }`}
          style={{
            animationDelay: `${index * 0.1}s`,
            opacity: 1 - (index * 0.3)
          }}
        >
          {activity}
        </div>
      ))}
    </div>
  );
}

interface DesperationUIProps {
  level: number;
  timeOnSite: number;
  formatTime: (seconds: number) => string;
  urgencyMessages: string[];
  showLastChanceBanner: boolean;
  cursorPosition: { x: number; y: number };
  showCursorFollower: boolean;
  showDioModal: boolean;
  dismissDioModal: () => boolean;
}

export function DesperationUI({
  level,
  timeOnSite,
  formatTime,
  urgencyMessages,
  showLastChanceBanner,
  cursorPosition,
  showCursorFollower,
  showDioModal,
  dismissDioModal
}: DesperationUIProps) {
  const [modalShakeCount, setModalShakeCount] = useState(0);
  
  // Add CSS animations for desperation effects
  useEffect(() => {
    if (!document.getElementById('desperation-styles')) {
      const style = document.createElement('style');
      style.id = 'desperation-styles';
      style.textContent = `
        @keyframes slide-in {
          from {
            transform: translateX(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.5s ease-out;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  const handleModalDismiss = () => {
    const success = dismissDioModal();
    if (!success) {
      setModalShakeCount(prev => prev + 1);
      setTimeout(() => setModalShakeCount(0), 1000);
      // Play WRRYYYY scream when user fails to dismiss modal
      playWryyyScream();
    }
  };

  // Play WRRYYYY scream when DIO modal first appears
  useEffect(() => {
    if (showDioModal) {
      playWryyyScream();
    }
  }, [showDioModal]);

  // Popup frequency based on desperation level
  useEffect(() => {
    if (level >= 2) {
      const frequency = level >= 4 ? 8000 : level >= 3 ? 12000 : 15000;
      
      const popupInterval = setInterval(() => {
        const popup = document.createElement('div');
        popup.className = `fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
          bg-red-600 text-white p-4 rounded-lg border-4 border-gold-400 z-50 animate-pulse
          text-center font-bold text-lg shadow-2xl`;
        
        const messages = [
          '⚡ FLASH SALE! ⚡',
          '🔥 LIMITED TIME! 🔥',
          '💀 LAST CHANCE! 💀',
          '⏰ HURRY UP! ⏰',
          '🎯 DON\'T MISS OUT! 🎯'
        ];
        
        popup.innerHTML = `
          <div class="text-xl mb-2">${messages[Math.floor(Math.random() * messages.length)]}</div>
          <div class="text-sm">Click anywhere to dismiss</div>
        `;
        
        document.body.appendChild(popup);
        
        const removePopup = () => {
          if (popup.parentNode) {
            popup.parentNode.removeChild(popup);
          }
        };
        
        popup.addEventListener('click', removePopup);
        document.addEventListener('click', removePopup, { once: true });
        
        setTimeout(removePopup, 3000);
      }, frequency);

      return () => clearInterval(popupInterval);
    }
  }, [level]);

  return (
    <>
      {/* Time Counter - Always visible */}
      <div className="fixed top-4 left-4 bg-purple-900/90 text-gold-300 px-4 py-2 rounded-lg border border-gold-500 z-40">
        <div className="text-sm font-bold">Time on Site:</div>
        <div className={`text-xl font-mono ${level >= 3 ? 'text-red-400 animate-pulse' : ''}`}>
          {formatTime(timeOnSite)}
        </div>
        <div className="text-xs">
          {level === 1 && 'Normal Mode'}
          {level === 2 && '⚠️ Getting Desperate'}
          {level === 3 && '🔥 LAST CHANCE'}
          {level === 4 && '💀 MAXIMUM DESPERATION'}
        </div>
      </div>

      {/* Urgency Messages */}
      {urgencyMessages.length > 0 && (
        <div className="fixed top-20 right-4 space-y-2 z-40">
          {urgencyMessages.map((message, index) => (
            <div
              key={index}
              className={`bg-red-600/90 text-white px-4 py-2 rounded-lg border border-gold-400 
                animate-bounce text-sm font-bold max-w-xs ${
                level >= 4 ? 'animate-pulse bg-red-700' : ''
              }`}
            >
              {message}
            </div>
          ))}
        </div>
      )}
      
      {/* Fake Activity Notifications */}
      {level >= 3 && (
        <div className="fixed bottom-4 left-4 space-y-2 z-40">
          <FakeActivityFeed level={level} />
        </div>
      )}
      
      {/* Level 4 Maximum Desperation Effects */}
      {level >= 4 && (
        <>
          {/* Floating buy now messages */}
          <div className="fixed inset-0 pointer-events-none z-30">
            <div className="absolute top-1/4 left-1/4 animate-bounce">
              <div className="bg-red-700 text-yellow-300 px-4 py-2 rounded-full font-bold text-lg border-2 border-gold-400">
                💀 BUY OR REGRET FOREVER! 💀
              </div>
            </div>
            <div className="absolute top-3/4 right-1/4 animate-pulse">
              <div className="bg-orange-600 text-white px-3 py-2 rounded-full font-bold border-2 border-red-400">
                🔥 99% OFF ENDS SOON! 🔥
              </div>
            </div>
            <div className="absolute top-1/2 left-1/3 animate-spin">
              <div className="bg-purple-700 text-gold-300 px-3 py-2 rounded-full font-bold text-sm border-2 border-gold-400">
                ⚡ LIMITED TIME! ⚡
              </div>
            </div>
          </div>
        </>
      )}

      {/* Last Chance Banner */}
      {showLastChanceBanner && (
        <div className={`fixed top-0 left-0 right-0 bg-red-600 text-white text-center py-3 z-30 
          font-bold text-lg border-b-4 border-gold-400 ${
          level >= 4 ? 'animate-pulse bg-red-700' : 'animate-bounce'
        }`}>
          🚨 LAST CHANCE! DEALS ENDING SOON! DIO WON'T WAIT! 🚨
        </div>
      )}

      {/* Cursor Follower */}
      {showCursorFollower && (
        <div
          className={`fixed pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 
            ${level >= 4 ? 'animate-spin' : 'animate-pulse'}`}
          style={{
            left: cursorPosition.x,
            top: cursorPosition.y - 50
          }}
        >
          <div className={`bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold 
            border-2 border-gold-400 whitespace-nowrap ${
            level >= 4 ? 'bg-red-700 text-yellow-300' : ''
          }`}>
            {level >= 4 ? '💀 BUY OR DIE! 💀' : '👆 BUY NOW! 👆'}
          </div>
        </div>
      )}

      {/* DIO Modal */}
      {showDioModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className={`bg-purple-900 border-4 border-gold-400 rounded-lg p-8 max-w-md 
            text-center text-white relative ${
            modalShakeCount > 0 ? 'animate-bounce' : ''
          }`}>
            <div className="text-6xl mb-4">👁️</div>
            <h2 className="text-2xl font-bold text-gold-300 mb-4">
              DIO IS WATCHING YOU
            </h2>
            <p className="text-lg mb-4">
              You've been on this page for too long without buying anything...
            </p>
            <p className="text-red-400 font-bold mb-6">
              DIO is getting impatient! 😤
            </p>
            <div className="space-y-3">
              <Button
                onClick={handleModalDismiss}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold"
              >
                {modalShakeCount === 0 ? 'I\'ll buy something!' : 
                 modalShakeCount === 1 ? 'Please let me leave!' : 
                 'Fine, I\'ll buy everything!'}
              </Button>
              {modalShakeCount > 0 && (
                <div className="text-red-400 text-sm animate-pulse">
                  {modalShakeCount === 1 ? 
                    '"You cannot escape DIO!" - Try again!' :
                    '"WRYYYY!" - One more time!'}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}