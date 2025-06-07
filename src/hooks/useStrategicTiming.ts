'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAchievements } from './useAchievements';

interface TimingEvent {
  id: string;
  type: 'audio' | 'visual' | 'interaction';
  priority: 'low' | 'medium' | 'high' | 'critical';
  cooldown: number; // Minimum time between same events
  maxPerSession: number;
  condition?: () => boolean;
  execute: () => void;
}

interface SessionState {
  eventCounts: { [key: string]: number };
  lastEventTimes: { [key: string]: number };
  userEngagement: number; // 0-100
  chaosLevel: number; // 0-10
  sessionStartTime: number;
  interactions: number;
  timeSpentOnPage: number;
}

export function useStrategicTiming() {
  const [sessionState, setSessionState] = useState<SessionState>({
    eventCounts: {},
    lastEventTimes: {},
    userEngagement: 50,
    chaosLevel: 0,
    sessionStartTime: Date.now(),
    interactions: 0,
    timeSpentOnPage: 0
  });

  const { trackInteraction, trackDiscovery } = useAchievements();

  // Update session time
  useEffect(() => {
    const interval = setInterval(() => {
      setSessionState(prev => ({
        ...prev,
        timeSpentOnPage: Date.now() - prev.sessionStartTime
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Calculate user engagement based on interactions and time
  const calculateEngagement = useCallback(() => {
    const timeMinutes = sessionState.timeSpentOnPage / 60000;
    const interactionRate = sessionState.interactions / Math.max(timeMinutes, 1);
    
    // Engagement based on interaction rate (optimal is 2-5 per minute)
    let engagement = 50;
    if (interactionRate > 5) engagement = Math.min(100, engagement + 30);
    else if (interactionRate > 2) engagement = Math.min(100, engagement + 20);
    else if (interactionRate < 0.5) engagement = Math.max(0, engagement - 20);

    // Time spent bonus
    if (timeMinutes > 2) engagement += 10;
    if (timeMinutes > 5) engagement += 20;

    return Math.max(0, Math.min(100, engagement));
  }, [sessionState.interactions, sessionState.timeSpentOnPage]);

  // Smart event scheduling based on user state
  const shouldTriggerEvent = useCallback((event: TimingEvent): boolean => {
    const now = Date.now();
    const lastTime = sessionState.lastEventTimes[event.id] || 0;
    const count = sessionState.eventCounts[event.id] || 0;
    const engagement = calculateEngagement();

    // Check basic constraints
    if (now - lastTime < event.cooldown) return false;
    if (count >= event.maxPerSession) return false;
    if (event.condition && !event.condition()) return false;

    // Smart timing based on engagement and chaos level
    const baseChance = {
      low: 0.1,
      medium: 0.2,
      high: 0.3,
      critical: 0.5
    }[event.priority];

    // Adjust chance based on engagement
    let adjustedChance = baseChance;
    if (engagement < 30) adjustedChance *= 0.5; // Less likely when low engagement
    if (engagement > 70) adjustedChance *= 1.5; // More likely when high engagement

    // Adjust for chaos level
    if (sessionState.chaosLevel > 5) {
      adjustedChance *= 1.8; // More chaos = more events
    } else if (sessionState.chaosLevel < 2) {
      adjustedChance *= 0.7; // Less chaos = fewer events
    }

    // Time-based adjustments
    const timeMinutes = sessionState.timeSpentOnPage / 60000;
    if (timeMinutes < 1) adjustedChance *= 0.3; // Be gentle in first minute
    if (timeMinutes > 10) adjustedChance *= 1.2; // Ramp up for long sessions

    return Math.random() < adjustedChance;
  }, [sessionState, calculateEngagement]);

  const executeEvent = useCallback((event: TimingEvent) => {
    const now = Date.now();
    
    setSessionState(prev => ({
      ...prev,
      eventCounts: {
        ...prev.eventCounts,
        [event.id]: (prev.eventCounts[event.id] || 0) + 1
      },
      lastEventTimes: {
        ...prev.lastEventTimes,
        [event.id]: now
      },
      chaosLevel: Math.min(10, prev.chaosLevel + (event.priority === 'critical' ? 2 : 1))
    }));

    // Execute the event
    event.execute();

    // Track for achievements
    trackInteraction('strategic_event', { eventId: event.id, priority: event.priority });
  }, [trackInteraction]);

  const recordInteraction = useCallback((type: string) => {
    setSessionState(prev => ({
      ...prev,
      interactions: prev.interactions + 1,
      userEngagement: calculateEngagement()
    }));

    // Decay chaos level on user interaction
    setSessionState(prev => ({
      ...prev,
      chaosLevel: Math.max(0, prev.chaosLevel - 0.5)
    }));
  }, [calculateEngagement]);

  const resetChaosLevel = useCallback(() => {
    setSessionState(prev => ({
      ...prev,
      chaosLevel: 0
    }));
  }, []);

  const getRecommendedTiming = useCallback(() => {
    const engagement = calculateEngagement();
    const timeMinutes = sessionState.timeSpentOnPage / 60000;
    
    return {
      // Recommended intervals based on current state
      nextMemeDelay: engagement > 70 ? 15000 : engagement > 40 ? 30000 : 60000,
      nextVisualDelay: engagement > 60 ? 20000 : 45000,
      maxChaosRecommended: engagement > 80 ? 8 : engagement > 50 ? 5 : 3,
      
      // User state insights
      userState: {
        engagement,
        chaosLevel: sessionState.chaosLevel,
        timeSpent: timeMinutes,
        interactionRate: sessionState.interactions / Math.max(timeMinutes, 1),
        totalInteractions: sessionState.interactions
      }
    };
  }, [calculateEngagement, sessionState]);

  return {
    // State
    sessionState,
    
    // Functions
    shouldTriggerEvent,
    executeEvent,
    recordInteraction,
    resetChaosLevel,
    getRecommendedTiming,
    
    // Computed values
    userEngagement: calculateEngagement(),
    isUserHighlyEngaged: calculateEngagement() > 70,
    isUserBored: calculateEngagement() < 30,
    isChaosHigh: sessionState.chaosLevel > 6,
    shouldReduceStimulation: sessionState.chaosLevel > 8
  };
}

// Predefined timing events for common JoJo interactions
export const JOJO_TIMING_EVENTS = {
  ToBeContinued: (audioCallback: () => void): TimingEvent => ({
    id: 'to_be_continued',
    type: 'visual',
    priority: 'high',
    cooldown: 45000, // 45 seconds
    maxPerSession: 5,
    execute: audioCallback
  }),

  DioScream: (audioCallback: () => void): TimingEvent => ({
    id: 'dio_scream',
    type: 'audio',
    priority: 'medium',
    cooldown: 30000, // 30 seconds
    maxPerSession: 8,
    execute: audioCallback
  }),

  MudaMuda: (audioCallback: () => void): TimingEvent => ({
    id: 'muda_muda',
    type: 'audio',
    priority: 'medium',
    cooldown: 20000, // 20 seconds
    maxPerSession: 10,
    execute: audioCallback
  }),

  TimeStop: (audioCallback: () => void): TimingEvent => ({
    id: 'time_stop',
    type: 'interaction',
    priority: 'high',
    cooldown: 60000, // 1 minute
    maxPerSession: 3,
    execute: audioCallback
  }),

  ChaosMode: (chaosCallback: () => void, chaosLevel: number): TimingEvent => ({
    id: 'chaos_mode',
    type: 'visual',
    priority: 'critical',
    cooldown: 120000, // 2 minutes
    maxPerSession: 2,
    condition: () => chaosLevel < 8, // Don't trigger if already chaotic
    execute: chaosCallback
  }),

  SubtleMeme: (audioCallback: () => void): TimingEvent => ({
    id: 'subtle_meme',
    type: 'audio',
    priority: 'low',
    cooldown: 15000, // 15 seconds
    maxPerSession: 15,
    execute: audioCallback
  })
};