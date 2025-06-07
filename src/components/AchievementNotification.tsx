'use client';

import { useEffect, useState } from 'react';
import { Achievement } from '@/hooks/useAchievements';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface AchievementNotificationProps {
  achievement: Achievement;
  onDismiss: () => void;
}

export function AchievementNotification({ achievement, onDismiss }: AchievementNotificationProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Start entrance animation
    setTimeout(() => setIsAnimating(true), 100);
    
    // Auto-dismiss after 5 seconds
    const timer = setTimeout(() => {
      setIsAnimating(false);
      setTimeout(() => {
        setIsVisible(false);
        onDismiss();
      }, 300);
    }, 5000);

    return () => clearTimeout(timer);
  }, [onDismiss]);

  if (!isVisible) return null;

  const getCategoryColor = (category: Achievement['category']) => {
    switch (category) {
      case 'audio': return 'bg-purple-600';
      case 'interaction': return 'bg-blue-600';
      case 'shopping': return 'bg-green-600';
      case 'discovery': return 'bg-orange-600';
      case 'chaos': return 'bg-red-600';
      case 'secret': return 'bg-gold-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className={`fixed top-4 right-4 z-50 transition-all duration-300 ${
      isAnimating ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
    }`}>
      <Card className="bg-gradient-to-br from-purple-900/95 to-black/95 border-gold-400 border-2 shadow-2xl shadow-purple-500/50 max-w-sm">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className={`text-2xl p-2 rounded-full ${getCategoryColor(achievement.category)} flex-shrink-0`}>
              {achievement.icon}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-gold-300 text-sm truncate">
                  {achievement.title}
                </h3>
                <Badge className="text-xs bg-purple-700 text-gold-300 flex-shrink-0">
                  NEW!
                </Badge>
              </div>
              
              <p className="text-white text-xs mb-2 line-clamp-2">
                {achievement.description}
              </p>
              
              <p className="text-purple-300 text-xs italic leading-tight">
                {achievement.jojoReference}
              </p>
            </div>
            
            <button
              onClick={() => {
                setIsAnimating(false);
                setTimeout(() => {
                  setIsVisible(false);
                  onDismiss();
                }, 300);
              }}
              className="text-gray-400 hover:text-white transition-colors p-1 flex-shrink-0"
            >
              ✕
            </button>
          </div>
          
          {/* Achievement sparkle effect */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1 right-1 text-yellow-300 animate-ping">✨</div>
            <div className="absolute bottom-1 left-1 text-gold-400 animate-pulse">⭐</div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-purple-400 animate-bounce">💫</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

interface AchievementNotificationsProps {
  achievements: Achievement[];
  onClearAll: () => void;
}

export function AchievementNotifications({ achievements, onClearAll }: AchievementNotificationsProps) {
  const [visibleAchievements, setVisibleAchievements] = useState<Achievement[]>(achievements);

  useEffect(() => {
    setVisibleAchievements(achievements);
  }, [achievements]);

  const handleDismiss = (achievementId: string) => {
    setVisibleAchievements(prev => prev.filter(a => a.id !== achievementId));
    if (visibleAchievements.length <= 1) {
      onClearAll();
    }
  };

  return (
    <>
      {visibleAchievements.map((achievement, index) => (
        <div 
          key={achievement.id} 
          className="relative"
          style={{ zIndex: 50 - index }}
        >
          <AchievementNotification
            achievement={achievement}
            onDismiss={() => handleDismiss(achievement.id)}
          />
        </div>
      ))}
    </>
  );
}