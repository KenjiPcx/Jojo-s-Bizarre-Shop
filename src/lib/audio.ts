'use client';

interface AudioConfig {
  [key: string]: {
    url: string;
    volume: number;
    duration?: number;
  };
}

// Categorized JoJo sound files for intelligent audio management
interface AudioConfig {
  [key: string]: {
    url: string;
    volume: number;
    duration?: number;
    type: 'background' | 'sfx' | 'catchphrase' | 'event';
    priority: 'low' | 'medium' | 'high';
  };
}

const audioFiles: AudioConfig = {
  // BACKGROUND MUSIC - Longer themes that set atmosphere
  'pillarmen-theme': {
    url: '/jojo sounds/pillarmen-theme.mp3',
    volume: 0.3,
    duration: 164,
    type: 'background',
    priority: 'low'
  },
  'giorno-theme': {
    url: '/jojo sounds/giornos-theme-but-only-the-best-part-is-in.mp3',
    volume: 0.35,
    duration: 15,
    type: 'background',
    priority: 'medium'
  },
  'kira-theme': {
    url: '/jojo sounds/yoshikage-kira-theme-ringtone.mp3',
    volume: 0.25,
    duration: 197,
    type: 'background',
    priority: 'low'
  },
  'torture-dance': {
    url: '/jojo sounds/gangstar-torture-dance-jojos-golden-wind-ost-1.mp3',
    volume: 0.3,
    duration: 240,
    type: 'background',
    priority: 'medium'
  },
  'made-in-heaven': {
    url: '/jojo sounds/made_in_heaven_test_animationyoutubetomp3.mp3',
    volume: 0.25,
    duration: 138,
    type: 'background',
    priority: 'low'
  },

  // EVENT SOUNDS - Important moments and achievements
  'to-be-continued': {
    url: '/jojo sounds/to-be-continued.mp3',
    volume: 0.7,
    duration: 8.0,
    type: 'event',
    priority: 'high'
  },
  'za-warudo-stop': {
    url: '/jojo sounds/za-warudo-stop-time-sound.mp3',
    volume: 0.8,
    duration: 3.0,
    type: 'event',
    priority: 'high'
  },
  'za-warudo-heaven': {
    url: '/jojo sounds/za-warudo-over-heaven-sound-effect.mp3',
    volume: 0.7,
    duration: 4.0,
    type: 'event',
    priority: 'high'
  },
  'star-platinum-za-warudo': {
    url: '/jojo sounds/star-platinum-za-warudo-bass-busted_ws2fMMQ.mp3',
    volume: 0.8,
    duration: 3.0,
    type: 'event',
    priority: 'high'
  },

  // CATCHPHRASES - Character voices and memorable lines
  'it-was-me-dio': {
    url: '/jojo sounds/it-was-me-dio_1.mp3',
    volume: 0.8,
    duration: 2.5,
    type: 'catchphrase',
    priority: 'medium'
  },
  'kono-dio-da': {
    url: '/jojo sounds/kono-dio-da99.mp3',
    volume: 0.8,
    duration: 2.5,
    type: 'catchphrase',
    priority: 'medium'
  },
  'dio-wryyy': {
    url: '/jojo sounds/dio-wryyy.mp3',
    volume: 0.8,
    duration: 2.5,
    type: 'catchphrase',
    priority: 'medium'
  },
  'muda-muda-muda': {
    url: '/jojo sounds/muda_muda_muda_sound_effect.mp3',
    volume: 0.7,
    duration: 3.0,
    type: 'catchphrase',
    priority: 'medium'
  },
  'yare-yare-daze': {
    url: '/jojo sounds/yareyaredaze.mp3',
    volume: 0.7,
    duration: 2.5,
    type: 'catchphrase',
    priority: 'medium'
  },
  'giorno-dream': {
    url: '/jojo sounds/i giorno have a dream.mp3',
    volume: 0.7,
    duration: 3.0,
    type: 'catchphrase',
    priority: 'medium'
  },
  'joseph-oh-my-god': {
    url: '/jojo sounds/joseph-joestar-oh-my-god_D2EZX0b.mp3',
    volume: 0.7,
    duration: 2.0,
    type: 'catchphrase',
    priority: 'medium'
  },
  'oh-no-joseph': {
    url: '/jojo sounds/oh-no_joseph.mp3',
    volume: 0.7,
    duration: 1.5,
    type: 'catchphrase',
    priority: 'medium'
  },
  'shiza': {
    url: '/jojo sounds/shizaaaaaa.mp3',
    volume: 0.7,
    duration: 2.5,
    type: 'catchphrase',
    priority: 'medium'
  },
  'arrivederci': {
    url: '/jojo sounds/arrivederci.mp3',
    volume: 0.7,
    duration: 3.0,
    type: 'catchphrase',
    priority: 'medium'
  },
  'joestar-run': {
    url: '/jojo sounds/joestar-run.mp3',
    volume: 0.7,
    duration: 4.0,
    type: 'catchphrase',
    priority: 'medium'
  },

  // SFX - Short interaction sounds
  'do-you-understand': {
    url: '/jojo sounds/do-you-understand.mp3',
    volume: 0.6,
    duration: 2.0,
    type: 'sfx',
    priority: 'low'
  },
  'rero-rero': {
    url: '/jojo sounds/rero-rero-rero.mp3',
    volume: 0.5,
    duration: 2.0,
    type: 'sfx',
    priority: 'low'
  },
  'killer-queen': {
    url: '/jojo sounds/s_killaqueencatchphrase.mp3',
    volume: 0.6,
    duration: 3.0,
    type: 'sfx',
    priority: 'low'
  },

  // ALIASES for backward compatibility
  'menacing': {
    url: '/jojo sounds/pillarmen-theme.mp3',
    volume: 0.3,
    duration: 10,
    type: 'background',
    priority: 'low'
  },
  'wryyy': {
    url: '/jojo sounds/dio-wryyy.mp3',
    volume: 0.8,
    duration: 2.5,
    type: 'catchphrase',
    priority: 'medium'
  },
  'muda': {
    url: '/jojo sounds/muda_muda_muda_sound_effect.mp3',
    volume: 0.7,
    duration: 3.0,
    type: 'catchphrase',
    priority: 'medium'
  },
  'ora': {
    url: '/jojo sounds/star-platinum-za-warudo-bass-busted_ws2fMMQ.mp3',
    volume: 0.8,
    duration: 3.0,
    type: 'event',
    priority: 'high'
  },
  'timestop': {
    url: '/jojo sounds/za-warudo-stop-time-sound.mp3',
    volume: 0.8,
    duration: 3.0,
    type: 'event',
    priority: 'high'
  }
};

const JOJO_CATCHPHRASES = [
  'ZA WARUDO!',
  'MUDA MUDA MUDA MUDA!',
  'ORA ORA ORA ORA!',
  'KONO DIO DA!',
  'It was me, DIO!',
  'WRYYY!',
  'YARE YARE DAZE',
  'OH MY GOD!',
  'SONO CHI NO SADAME!',
  'GOLDEN EXPERIENCE!',
  'STAR PLATINUM!',
  'THE WORLD!',
  'Your next line is...',
  'I have a dream!',
  'Yare yare... good grief',
  'RETIRED!'
];

interface ActiveAudio {
  source: AudioBufferSourceNode;
  type: string;
  key: string;
  startTime: number;
  gainNode: GainNode;
}

class AudioManager {
  private audioContext: AudioContext | null = null;
  private audioCache: Map<string, AudioBuffer> = new Map();
  private isInitialized = false;
  private activeSources: Map<string, ActiveAudio> = new Map();
  private masterGain: GainNode | null = null;
  private backgroundGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private currentVolume = 0.7;
  private backgroundVolume = 0.3;
  private sfxVolume = 0.7;
  private chaosMode = false;
  private currentBackground: string | null = null;
  private lastSfxTime = 0;
  private lastCatchphraseTime = 0;
  private sfxCooldown = 1000; // 1 second between SFX
  private catchphraseCooldown = 3000; // 3 seconds between catchphrases

  async initialize() {
    if (this.isInitialized) return;

    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

      // Create gain nodes for different audio layers
      this.masterGain = this.audioContext.createGain();
      this.backgroundGain = this.audioContext.createGain();
      this.sfxGain = this.audioContext.createGain();

      // Connect audio chain
      this.backgroundGain.connect(this.masterGain);
      this.sfxGain.connect(this.masterGain);
      this.masterGain.connect(this.audioContext.destination);

      // Set initial volumes
      this.masterGain.gain.value = this.currentVolume;
      this.backgroundGain.gain.value = this.backgroundVolume;
      this.sfxGain.gain.value = this.sfxVolume;

      this.isInitialized = true;
      console.log('🎵 Smart JoJo Audio Manager initialized!');
    } catch (error) {
      console.warn('Audio context not supported:', error);
    }
  }

  async loadAudio(key: string): Promise<AudioBuffer | null> {
    if (!this.audioContext) await this.initialize();
    if (!this.audioContext) return null;

    if (this.audioCache.has(key)) {
      return this.audioCache.get(key)!;
    }

    const config = audioFiles[key];
    if (!config) {
      console.warn(`Audio config not found for ${key}`);
      return null;
    }

    try {
      const response = await fetch(config.url);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${config.url}: ${response.status}`);
      }

      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);

      this.audioCache.set(key, audioBuffer);
      console.log(`✅ Loaded JoJo sound: ${key}`);
      return audioBuffer;
    } catch (error) {
      console.warn(`❌ Failed to load ${key}:`, error);
      return null;
    }
  }

  // Smart audio management - prevents overlapping and manages layers
  async playSound(key: string, options: {
    volume?: number;
    pitch?: number;
    chaos?: boolean;
    forcePlay?: boolean;
    fadeIn?: boolean;
  } = {}): Promise<boolean> {
    if (!this.audioContext) await this.initialize();
    if (!this.audioContext || !this.masterGain) return false;

    const config = audioFiles[key];
    if (!config) {
      console.warn(`Audio config not found for ${key}`);
      return false;
    }

    // Smart filtering based on audio type and timing
    if (!this.shouldPlayAudio(key, config, options.forcePlay)) {
      return false;
    }

    const buffer = await this.loadAudio(key);
    if (!buffer) return false;

    try {
      const source = this.audioContext.createBufferSource();
      const gainNode = this.audioContext.createGain();

      source.buffer = buffer;

      // Apply pitch modulation
      if (options.pitch) {
        source.playbackRate.value = Math.max(0.5, Math.min(2.0, options.pitch));
      }

      // Connect to appropriate audio layer
      source.connect(gainNode);
      this.connectToAudioLayer(gainNode, config.type);

      // Set volume based on type and config
      const baseVolume = config.volume * (options.volume || 1.0);
      gainNode.gain.value = options.fadeIn ? 0 : baseVolume;

      // Handle fade in
      if (options.fadeIn) {
        gainNode.gain.linearRampToValueAtTime(baseVolume, this.audioContext.currentTime + 1.0);
      }

      // Manage audio by type
      this.manageAudioByType(key, config, source, gainNode);

      source.start();

      // Auto-cleanup
      const duration = (config.duration || 2.0) * 1000;
      setTimeout(() => {
        this.stopAudio(key);
      }, duration);

      source.onended = () => {
        this.cleanupAudio(key);
      };

      console.log(`🎵 Playing ${config.type}: ${key}`);
      return true;
    } catch (error) {
      console.warn(`Failed to play sound ${key}:`, error);
      return false;
    }
  }

  private shouldPlayAudio(key: string, config: any, forcePlay = false): boolean {
    if (forcePlay) return true;

    const now = Date.now();

    // Check cooldowns for different types
    switch (config.type) {
      case 'sfx':
        if (now - this.lastSfxTime < this.sfxCooldown) {
          console.log(`🔇 SFX ${key} blocked by cooldown`);
          return false;
        }
        this.lastSfxTime = now;
        break;

      case 'catchphrase':
        if (now - this.lastCatchphraseTime < this.catchphraseCooldown) {
          console.log(`🔇 Catchphrase ${key} blocked by cooldown`);
          return false;
        }
        this.lastCatchphraseTime = now;
        break;

      case 'background':
        // Only allow one background track at a time
        if (this.currentBackground && this.currentBackground !== key) {
          console.log(`🔇 Background ${key} blocked by current track: ${this.currentBackground}`);
          return false;
        }
        break;

      case 'event':
        // Events can interrupt other audio but are high priority
        this.stopLowerPriorityAudio('high');
        break;
    }

    return true;
  }

  private connectToAudioLayer(gainNode: GainNode, type: string) {
    switch (type) {
      case 'background':
        gainNode.connect(this.backgroundGain!);
        break;
      default:
        gainNode.connect(this.sfxGain!);
    }
  }

  private manageAudioByType(key: string, config: any, source: AudioBufferSourceNode, gainNode: GainNode) {
    const activeAudio: ActiveAudio = {
      source,
      type: config.type,
      key,
      startTime: Date.now(),
      gainNode
    };

    // Stop conflicting audio
    switch (config.type) {
      case 'background':
        if (this.currentBackground && this.currentBackground !== key) {
          this.stopBackgroundMusic();
        }
        this.currentBackground = key;
        break;

      case 'event':
        // Events can interrupt catchphrases and SFX
        this.stopAudioByType(['catchphrase', 'sfx']);
        break;

      case 'catchphrase':
        // Stop other catchphrases
        this.stopAudioByType(['catchphrase']);
        break;
    }

    this.activeSources.set(key, activeAudio);
  }

  private stopLowerPriorityAudio(currentPriority: string) {
    const priorityOrder = { low: 1, medium: 2, high: 3 };
    const currentLevel = priorityOrder[currentPriority as keyof typeof priorityOrder];

    this.activeSources.forEach((audio, key) => {
      const config = audioFiles[key];
      const audioLevel = priorityOrder[config?.priority as keyof typeof priorityOrder] || 1;

      if (audioLevel < currentLevel) {
        this.stopAudio(key);
      }
    });
  }

  private stopAudioByType(types: string[]) {
    this.activeSources.forEach((audio, key) => {
      if (types.includes(audio.type)) {
        this.stopAudio(key);
      }
    });
  }

  private stopAudio(key: string) {
    const audio = this.activeSources.get(key);
    if (audio) {
      try {
        audio.source.stop();
      } catch (e) {
        // Already stopped
      }
      this.cleanupAudio(key);
    }
  }

  private cleanupAudio(key: string) {
    const audio = this.activeSources.get(key);
    if (audio && audio.type === 'background') {
      this.currentBackground = null;
    }
    this.activeSources.delete(key);
  }

  // Specific methods for different audio types
  async playBackgroundMusic(key: string, fadeIn = true): Promise<boolean> {
    console.log(`🎼 Starting background music: ${key}`);
    return this.playSound(key, { fadeIn, forcePlay: true });
  }

  stopBackgroundMusic() {
    if (this.currentBackground) {
      console.log(`🔇 Stopping background music: ${this.currentBackground}`);
      this.stopAudio(this.currentBackground);
    }
  }

  async playEventSound(key: string): Promise<boolean> {
    console.log(`⚡ Playing event sound: ${key}`);
    return this.playSound(key, { forcePlay: true });
  }

  async playCatchphrase(key: string): Promise<boolean> {
    console.log(`💬 Playing catchphrase: ${key}`);
    return this.playSound(key);
  }

  async playSfx(key: string): Promise<boolean> {
    console.log(`🔊 Playing SFX: ${key}`);
    return this.playSound(key);
  }

  setVolume(volume: number) {
    this.currentVolume = Math.max(0, Math.min(1, volume));
    if (this.masterGain) {
      this.masterGain.gain.value = this.currentVolume;
    }
  }

  setBackgroundVolume(volume: number) {
    this.backgroundVolume = Math.max(0, Math.min(1, volume));
    if (this.backgroundGain) {
      this.backgroundGain.gain.value = this.backgroundVolume;
    }
  }

  setSfxVolume(volume: number) {
    this.sfxVolume = Math.max(0, Math.min(1, volume));
    if (this.sfxGain) {
      this.sfxGain.gain.value = this.sfxVolume;
    }
  }

  enableChaosMode() {
    this.chaosMode = true;
    this.sfxCooldown = 500; // Faster SFX in chaos mode
    this.catchphraseCooldown = 1500; // Faster catchphrases
    console.log('🔥 Chaos Mode Enabled!');
  }

  disableChaosMode() {
    this.chaosMode = false;
    this.sfxCooldown = 1000; // Normal SFX timing
    this.catchphraseCooldown = 3000; // Normal catchphrase timing
    console.log('✅ Chaos Mode Disabled');
  }

  async playTextToSpeech(text: string, options: { rate?: number; pitch?: number; volume?: number } = {}) {
    if (!('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported');
      return;
    }

    try {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = options.rate || 1.2;
      utterance.pitch = options.pitch || 1.5;
      utterance.volume = (options.volume || 0.8) * this.currentVolume;

      speechSynthesis.speak(utterance);
    } catch (error) {
      console.warn('Text-to-speech failed:', error);
    }
  }

  stopAllSounds() {
    this.activeSources.forEach((audio, key) => {
      this.stopAudio(key);
    });
    console.log('🔇 All audio stopped');
  }

  getCurrentlyPlaying() {
    const playing: string[] = [];
    this.activeSources.forEach((audio, key) => {
      playing.push(`${audio.type}: ${key}`);
    });
    return playing;
  }
}

const audioManager = new AudioManager();

// Smart Audio System Exports
export async function initializeAudio(): Promise<void> {
  await audioManager.initialize();
}

// Background Music - Sets atmosphere, only one at a time
export const playPillarmenTheme = () => audioManager.playBackgroundMusic('pillarmen-theme');
export const playGiornoTheme = () => audioManager.playBackgroundMusic('giorno-theme');
export const playKiraTheme = () => audioManager.playBackgroundMusic('kira-theme');
export const playTortureDance = () => audioManager.playBackgroundMusic('torture-dance');
export const playMadeInHeaven = () => audioManager.playBackgroundMusic('made-in-heaven');
export const stopBackgroundMusic = () => audioManager.stopBackgroundMusic();

// Event Sounds - High priority, interrupt other audio
export const playToBeContinued = () => audioManager.playEventSound('to-be-continued');
export const playTimeStop = () => audioManager.playEventSound('za-warudo-stop');
export const playZaWarudoHeaven = () => audioManager.playEventSound('za-warudo-heaven');
export const playStarPlatinumZaWarudo = () => audioManager.playEventSound('star-platinum-za-warudo');

// Catchphrases - Character voices, respect cooldowns
export const playItWasMeDio = () => audioManager.playCatchphrase('it-was-me-dio');
export const playKonoDioDa = () => audioManager.playCatchphrase('kono-dio-da');
export const playDioWryyy = () => audioManager.playCatchphrase('dio-wryyy');
export const playMudaMudaMuda = () => audioManager.playCatchphrase('muda-muda-muda');
export const playYareYareDaze = () => audioManager.playCatchphrase('yare-yare-daze');
export const playGiornoDream = () => audioManager.playCatchphrase('giorno-dream');
export const playJosephOhMyGod = () => audioManager.playCatchphrase('joseph-oh-my-god');
export const playOhNoJoseph = () => audioManager.playCatchphrase('oh-no-joseph');
export const playShiza = () => audioManager.playCatchphrase('shiza');
export const playArrivederci = () => audioManager.playCatchphrase('arrivederci');
export const playJoestarRun = () => audioManager.playCatchphrase('joestar-run');

// SFX - Short interaction sounds
export const playDoYouUnderstand = () => audioManager.playSfx('do-you-understand');
export const playReroRero = () => audioManager.playSfx('rero-rero');
export const playKillerQueen = () => audioManager.playSfx('killer-queen');

// Aliases for compatibility
export const playOra = () => audioManager.playEventSound('ora');
export const playMuda = () => audioManager.playCatchphrase('muda');
export const playWryyy = () => audioManager.playCatchphrase('wryyy');
export const playYareYare = () => audioManager.playCatchphrase('yare-yare-daze');
export const playMenacing = () => audioManager.playBackgroundMusic('menacing');

// Smart random functions
export const playRandomCatchphrase = () => {
  const catchphrases = ['it-was-me-dio', 'kono-dio-da', 'dio-wryyy', 'muda-muda-muda', 'yare-yare-daze', 'joseph-oh-my-god'];
  const randomCatchphrase = catchphrases[Math.floor(Math.random() * catchphrases.length)];
  audioManager.playCatchphrase(randomCatchphrase);
};

export const playRandomBackgroundMusic = () => {
  const backgrounds = ['pillarmen-theme', 'giorno-theme', 'kira-theme', 'torture-dance'];
  const randomBg = backgrounds[Math.floor(Math.random() * backgrounds.length)];
  audioManager.playBackgroundMusic(randomBg);
};

export const playRandomJojoCatchphrase = () => {
  const phrase = JOJO_CATCHPHRASES[Math.floor(Math.random() * JOJO_CATCHPHRASES.length)];
  audioManager.playTextToSpeech(phrase, {
    rate: 1.0 + Math.random() * 0.8,
    pitch: 1.2 + Math.random() * 0.8,
    volume: 0.7 + Math.random() * 0.3
  });
};

// Event-specific audio functions
export const playAchievementSound = () => audioManager.playEventSound('to-be-continued');
export const playCartAddSound = () => audioManager.playCatchphrase('joseph-oh-my-god');
export const playProductClickSound = () => {
  // Use varied sounds for product clicks instead of always "do you understand"
  const clickSounds = ['do-you-understand', 'rero-rero', 'killer-queen'];
  const randomSound = clickSounds[Math.floor(Math.random() * clickSounds.length)];
  audioManager.playSfx(randomSound);
};
export const playCheckoutSound = () => audioManager.playEventSound('za-warudo-heaven');
export const playErrorSound = () => audioManager.playCatchphrase('oh-no-joseph');
export const playSuccessSound = () => audioManager.playCatchphrase('giorno-dream');

// Control functions
export const enableAudioChaos = () => audioManager.enableChaosMode();
export const disableAudioChaos = () => audioManager.disableChaosMode();
export const setMasterVolume = (volume: number) => audioManager.setVolume(volume);
export const setBackgroundVolume = (volume: number) => audioManager.setBackgroundVolume(volume);
export const setSfxVolume = (volume: number) => audioManager.setSfxVolume(volume);
export const stopAllAudio = () => audioManager.stopAllSounds();
export const getCurrentlyPlaying = () => audioManager.getCurrentlyPlaying();

// Chaos functions with smart management
export const triggerAudioBrainrot = async () => {
  audioManager.enableChaosMode();

  // Start chaotic background
  playPillarmenTheme();

  // Play catchphrases in sequence (respects chaos mode cooldowns)
  const chaos = ['muda-muda-muda', 'dio-wryyy', 'joseph-oh-my-god', 'yare-yare-daze'];
  chaos.forEach((sound, index) => {
    setTimeout(() => audioManager.playCatchphrase(sound), index * 1500);
  });

  // TTS chaos
  const phrases = JOJO_CATCHPHRASES.slice(0, 3);
  phrases.forEach((phrase, index) => {
    setTimeout(() => {
      audioManager.playTextToSpeech(phrase, {
        rate: 0.8 + Math.random() * 1.0,
        pitch: 1.0 + Math.random() * 1.0,
        volume: 0.5 + Math.random() * 0.5
      });
    }, index * 3000);
  });

  // Disable chaos after 10 seconds
  setTimeout(() => {
    audioManager.disableChaosMode();
  }, 10000);
};

export const playSpecificJojoCatchphrase = (phrase: string) => {
  audioManager.playTextToSpeech(phrase, {
    rate: 1.0 + Math.random() * 0.8,
    pitch: 1.2 + Math.random() * 0.8,
    volume: 0.7 + Math.random() * 0.3
  });
};

// Event-based background music system
export const triggerPillarmenEvent = () => {
  console.log('🗿 PILLARMEN EVENT: Awakening the ancient ones!');
  audioManager.stopBackgroundMusic(); // Stop current music
  audioManager.playBackgroundMusic('pillarmen-theme');
  // Add dramatic sound effect
  setTimeout(() => audioManager.playCatchphrase('shiza'), 3000);
};

export const triggerGiornoEvent = () => {
  console.log('🌟 GIORNO EVENT: I have a dream!');
  audioManager.stopBackgroundMusic();
  audioManager.playBackgroundMusic('giorno-theme');
  // Add Giorno catchphrase
  setTimeout(() => audioManager.playCatchphrase('giorno-dream'), 2000);
};

export const triggerKiraEvent = () => {
  console.log('💀 KIRA EVENT: Killer Queen has already touched this product!');
  audioManager.stopBackgroundMusic();
  audioManager.playBackgroundMusic('kira-theme');
  // Add Killer Queen sound
  setTimeout(() => audioManager.playSfx('killer-queen'), 2500);
  // Add menacing atmosphere
  setTimeout(() => {
    console.log('💣 Bites the Dust is already in your eye...');
  }, 5000);
};

export const triggerBitesTheDustEvent = () => {
  console.log('💣 BITES THE DUST EVENT: Killer Queen has already touched that button!');
  audioManager.stopBackgroundMusic();
  audioManager.playBackgroundMusic('kira-theme');
  
  // Sequence: Killer Queen -> explosion effect -> time rewind feeling
  audioManager.playSfx('killer-queen');
  setTimeout(() => {
    // Create explosion/rewind effect with audio
    console.log('💥 EXPLOSION! Time is rewinding...');
    // Play a dramatic sound effect
    audioManager.playCatchphrase('oh-no-joseph'); // For the "oh no" moment
  }, 3000);
  
  setTimeout(() => {
    console.log('🔄 Hayato... you witnessed something you shouldn\'t have...');
  }, 6000);
};

export const triggerTortureDanceEvent = () => {
  console.log('💃 TORTURE DANCE EVENT: It\'s torture dance time!');
  audioManager.stopBackgroundMusic();
  audioManager.playBackgroundMusic('torture-dance');
  // Add vocal sting
  setTimeout(() => audioManager.playCatchphrase('arrivederci'), 4000);
};

export const triggerDioEvent = () => {
  console.log('🧛 DIO EVENT: You thought this was a normal shop...');
  audioManager.stopBackgroundMusic();
  // DIO doesn't need background music, he IS the main character
  audioManager.playCatchphrase('it-was-me-dio');
  setTimeout(() => audioManager.playCatchphrase('kono-dio-da'), 2000);
  setTimeout(() => audioManager.playCatchphrase('dio-wryyy'), 4000);
};

// Enhanced random sound system - uses more varied sounds
export const playEnhancedRandomSound = () => {
  const allSounds = [
    // Catchphrases
    'it-was-me-dio', 'kono-dio-da', 'dio-wryyy', 'muda-muda-muda', 
    'yare-yare-daze', 'joseph-oh-my-god', 'oh-no-joseph', 'giorno-dream',
    'arrivederci', 'joestar-run', 'shiza',
    // SFX
    'do-you-understand', 'rero-rero', 'killer-queen'
  ];
  
  const randomSound = allSounds[Math.floor(Math.random() * allSounds.length)];
  
  // Categorize the sound and play with appropriate method
  const catchphrases = ['it-was-me-dio', 'kono-dio-da', 'dio-wryyy', 'muda-muda-muda', 'yare-yare-daze', 'joseph-oh-my-god', 'oh-no-joseph', 'giorno-dream', 'arrivederci', 'joestar-run', 'shiza'];
  const sfx = ['do-you-understand', 'rero-rero', 'killer-queen'];
  
  if (catchphrases.includes(randomSound)) {
    audioManager.playCatchphrase(randomSound);
  } else if (sfx.includes(randomSound)) {
    audioManager.playSfx(randomSound);
  }
  
  console.log(`🎵 Playing enhanced random sound: ${randomSound}`);
};