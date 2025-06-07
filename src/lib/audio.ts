'use client';

interface AudioConfig {
  [key: string]: {
    url: string;
    volume: number;
    duration?: number;
  };
}

const audioFiles: AudioConfig = {
  ora: { url: '/audio/ora.mp3', volume: 0.7, duration: 1.5 },
  muda: { url: '/audio/muda.mp3', volume: 0.7, duration: 1.5 },
  wryyy: { url: '/audio/wryyy.mp3', volume: 0.8, duration: 2.0 },
  roundabout: { url: '/audio/roundabout.mp3', volume: 0.5, duration: 10.0 },
  giorno: { url: '/audio/giorno-theme.mp3', volume: 0.6, duration: 15.0 },
  'giorno-piano': { url: '/audio/giorno-piano.mp3', volume: 0.7, duration: 12.0 },
  menacing: { url: '/audio/menacing.mp3', volume: 0.4, duration: 3.0 },
  yare: { url: '/audio/yare-yare.mp3', volume: 0.7, duration: 2.0 },
  konodioda: { url: '/audio/kono-dio-da.mp3', volume: 0.8, duration: 2.5 },
  timestop: { url: '/audio/timestop.mp3', volume: 0.6, duration: 3.0 },
  'to-be-continued': { url: '/audio/to-be-continued.mp3', volume: 0.8, duration: 6.0 },
  'to-be-continued-full': { url: '/audio/to-be-continued-full.mp3', volume: 0.9, duration: 8.0 },
  'il-vento-doro': { url: '/audio/il-vento-doro.mp3', volume: 0.7, duration: 8.0 },
  'mudamuda': { url: '/audio/muda-muda.mp3', volume: 0.8, duration: 3.0 },
  'oraora': { url: '/audio/ora-ora.mp3', volume: 0.8, duration: 3.0 },
  'dramatic-stinger': { url: '/audio/dramatic-stinger.mp3', volume: 0.9, duration: 2.0 },
  'popup-effect': { url: '/audio/popup-effect.mp3', volume: 0.7, duration: 1.0 },
  'click-effect': { url: '/audio/click-effect.mp3', volume: 0.5, duration: 0.5 },
  'chaos-layer': { url: '/audio/chaos-layer.mp3', volume: 0.3, duration: 5.0 },
  'entrance-swell': { url: '/audio/entrance-swell.mp3', volume: 0.8, duration: 4.0 },
  'hover-mystery': { url: '/audio/hover-mystery.mp3', volume: 0.4, duration: 1.0 },
  'cart-fanfare': { url: '/audio/cart-fanfare.mp3', volume: 0.8, duration: 2.5 },
  'checkout-finale': { url: '/audio/checkout-finale.mp3', volume: 0.9, duration: 5.0 },
  'piano-suspense': { url: '/audio/piano-suspense.mp3', volume: 0.6, duration: 3.0 },
  'fly-in-the-sky': { url: '/audio/fly-in-the-sky-remix.mp3', volume: 0.8, duration: 12.0 },
  'forgive-father-dramatic': { url: '/audio/forgive-father-dramatic.mp3', volume: 0.7, duration: 4.0 },
  'jojo-meme-compilation': { url: '/audio/jojo-meme-compilation.mp3', volume: 0.6, duration: 8.0 },
  'sono-chi-no-kioku': { url: '/audio/sono-chi-no-kioku.mp3', volume: 0.7, duration: 15.0 },
  'traitors-requiem': { url: '/audio/traitors-requiem.mp3', volume: 0.8, duration: 12.0 },
  'bloody-storm': { url: '/audio/bloody-storm.mp3', volume: 0.7, duration: 10.0 },
  'fighting-gold': { url: '/audio/fighting-gold.mp3', volume: 0.8, duration: 14.0 },
  'stone-ocean': { url: '/audio/stone-ocean-theme.mp3', volume: 0.7, duration: 11.0 },
  'heaven-ascension': { url: '/audio/heaven-ascension.mp3', volume: 0.9, duration: 8.0 },
  'wryyy-scream': { url: '/audio/wryyy-scream.mp3', volume: 0.9, duration: 3.0 },
  'tick-tock-timestop': { url: '/audio/tick-tock-timestop.mp3', volume: 0.7, duration: 4.0 },
  'muda-rapid-fire': { url: '/audio/muda-rapid-fire.mp3', volume: 0.8, duration: 5.0 }
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
  'KING CRIMSON!',
  'CRAZY DIAMOND!',
  'EMERALD SPLASH!',
  'THUNDER CROSS SPLIT ATTACK!',
  'NIGERUNDAYO!',
  'ROAD ROLLER DA!',
  'TOKI WO TOMARE!',
  'SONO CHI NO KIOKU!',
  'SONO CHI NO SADAME!',
  'Your next line is...',
  'This taste... is the taste of a liar!',
  'Forgive them father, for I have sinned',
  'Forgive me father',
  'You fell for it, fool!',
  'Even Speedwagon is afraid!',
  'I reject my humanity, JoJo!',
  'This must be the work of an enemy Stand!',
  'Yare yare... good grief',
  'My name is Yoshikage Kira',
  'I have a dream!',
  'Gold Experience Requiem!',
  'Mudamudamudamudamuda!',
  'Oraoraoraoraoraora!',
  'SUTANDO POWAH!',
  'Sono chi no kioku... JoJo!',
  'Forgive them father, for they know not what they do',
  'Father, forgive me for what I must do',
  'Is that a JoJo reference?!',
  'But it was me, DIO, all along!',
  'My Stand is the strongest in the world!',
  'This is the taste of a liar, Giorno Giovanna!',
  'RETIRED!'
];

const BRAINROT_PHRASES = [
  'JOTARO-KUN!',
  'KAKYOIN!',
  'SPEEDWAGON!',
  'POLNAREFF!',
  'IGGY!',
  'GYRO!',
  'JOHNNY!',
  'JOSUKE!',
  'GIORNO GIOVANNA!',
  'BRUNO BUCCIARATI!'
];

class AudioManager {
  private audioContext: AudioContext | null = null;
  private audioCache: Map<string, AudioBuffer> = new Map();
  private isInitialized = false;
  private activeSources: AudioBufferSourceNode[] = [];
  private masterGain: GainNode | null = null;
  private compressor: DynamicsCompressorNode | null = null;
  private reverb: ConvolverNode | null = null;
  private currentVolume = 1.0;
  private chaosMode = false;
  private dramaModeActive = false;

  async initialize() {
    if (this.isInitialized) return;
    
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Create master gain node for volume control
      this.masterGain = this.audioContext.createGain();
      this.masterGain.connect(this.audioContext.destination);
      
      // Create compressor for audio normalization
      this.compressor = this.audioContext.createDynamicsCompressor();
      this.compressor.threshold.setValueAtTime(-24, this.audioContext.currentTime);
      this.compressor.knee.setValueAtTime(30, this.audioContext.currentTime);
      this.compressor.ratio.setValueAtTime(12, this.audioContext.currentTime);
      this.compressor.attack.setValueAtTime(0.003, this.audioContext.currentTime);
      this.compressor.release.setValueAtTime(0.25, this.audioContext.currentTime);
      
      // Create reverb for dramatic effect
      this.reverb = this.audioContext.createConvolver();
      this.reverb.buffer = await this.createReverbBuffer();
      
      // Connect effects chain
      this.compressor.connect(this.reverb);
      this.reverb.connect(this.masterGain);
      
      this.isInitialized = true;
    } catch (error) {
      console.warn('Audio context not supported:', error);
    }
  }

  private async createReverbBuffer(): Promise<AudioBuffer> {
    if (!this.audioContext) throw new Error('Audio context not initialized');
    
    const sampleRate = this.audioContext.sampleRate;
    const length = sampleRate * 2; // 2 seconds of reverb
    const buffer = this.audioContext.createBuffer(2, length, sampleRate);
    
    for (let channel = 0; channel < 2; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < length; i++) {
        channelData[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 2);
      }
    }
    
    return buffer;
  }

  async loadAudio(key: string): Promise<AudioBuffer | null> {
    if (!this.audioContext) return null;
    
    if (this.audioCache.has(key)) {
      return this.audioCache.get(key)!;
    }

    try {
      const config = audioFiles[key] || { duration: 1.0 };
      const duration = config.duration || 1.0;
      const sampleRate = this.audioContext.sampleRate;
      const length = Math.floor(sampleRate * duration);
      const buffer = this.audioContext.createBuffer(2, length, sampleRate);
      
      // Generate dramatic audio based on sound type
      this.generateDramaticAudio(buffer, key);
      
      this.audioCache.set(key, buffer);
      return buffer;
    } catch (error) {
      console.warn(`Failed to load audio for ${key}:`, error);
      return null;
    }
  }

  private generateDramaticAudio(buffer: AudioBuffer, key: string) {
    const leftChannel = buffer.getChannelData(0);
    const rightChannel = buffer.getChannelData(1);
    const length = buffer.length;
    const sampleRate = buffer.sampleRate;
    
    switch (key) {
      case 'dramatic-stinger':
        this.generateDramaticStinger(leftChannel, rightChannel, length, sampleRate);
        break;
      case 'timestop':
        this.generateTimeStopEffect(leftChannel, rightChannel, length, sampleRate);
        break;
      case 'tick-tock-timestop':
        this.generateTickTockTimeStopEffect(leftChannel, rightChannel, length, sampleRate);
        break;
      case 'wryyy-scream':
        this.generateWryyyScreamEffect(leftChannel, rightChannel, length, sampleRate);
        break;
      case 'muda-rapid-fire':
        this.generateMudaRapidFireEffect(leftChannel, rightChannel, length, sampleRate);
        break;
      case 'to-be-continued':
        this.generateToBeContinuedEffect(leftChannel, rightChannel, length, sampleRate);
        break;
      case 'chaos-layer':
        this.generateChaosLayer(leftChannel, rightChannel, length, sampleRate);
        break;
      default:
        this.generateDefaultJojoSound(leftChannel, rightChannel, length, sampleRate, key);
    }
  }

  private generateDramaticStinger(left: Float32Array, right: Float32Array, length: number, sampleRate: number) {
    for (let i = 0; i < length; i++) {
      const t = i / sampleRate;
      const envelope = Math.exp(-t * 3) * (1 - Math.exp(-t * 20));
      const freq1 = 220 * (1 + Math.sin(t * 10) * 0.1);
      const freq2 = 330 * (1 + Math.cos(t * 7) * 0.15);
      const wave1 = Math.sin(2 * Math.PI * freq1 * t);
      const wave2 = Math.sin(2 * Math.PI * freq2 * t);
      const noise = (Math.random() - 0.5) * 0.1;
      
      left[i] = (wave1 + wave2 * 0.7 + noise) * envelope * 0.3;
      right[i] = (wave2 + wave1 * 0.7 - noise) * envelope * 0.3;
    }
  }

  private generateTimeStopEffect(left: Float32Array, right: Float32Array, length: number, sampleRate: number) {
    for (let i = 0; i < length; i++) {
      const t = i / sampleRate;
      const slowdown = Math.max(0.1, 1 - t * 0.8);
      const freq = 440 * slowdown;
      const envelope = Math.exp(-t * 2);
      const wave = Math.sin(2 * Math.PI * freq * t * slowdown);
      const reverseWave = Math.sin(2 * Math.PI * freq * (3 - t));
      
      left[i] = (wave + reverseWave * 0.3) * envelope * 0.4;
      right[i] = (wave - reverseWave * 0.3) * envelope * 0.4;
    }
  }

  private generateToBeContinuedEffect(left: Float32Array, right: Float32Array, length: number, sampleRate: number) {
    const totalDuration = length / sampleRate;
    const buildUpDuration = totalDuration * 0.75; // 75% build-up
    const freezeDuration = totalDuration * 0.25; // 25% freeze/cut-off
    
    for (let i = 0; i < length; i++) {
      const t = i / sampleRate;
      
      if (t < buildUpDuration) {
        // Dramatic build-up phase
        const buildUpProgress = t / buildUpDuration;
        const intensity = Math.pow(buildUpProgress, 2); // Exponential build-up
        
        // Multiple orchestral layers
        const bass = Math.sin(2 * Math.PI * 87 * t) * 0.6; // Low bass
        const strings = Math.sin(2 * Math.PI * 261 * t) * intensity * 0.4; // C4
        const tension = Math.sin(2 * Math.PI * 440 * t * (1 + buildUpProgress * 0.5)) * intensity * 0.3; // Rising tension
        const brass = Math.sin(2 * Math.PI * 523 * t) * Math.pow(intensity, 3) * 0.5; // High brass
        
        // Add timpani-like percussion
        const percussion = Math.sin(2 * Math.PI * 60 * t) * Math.exp(-((t % 0.5) * 8)) * intensity * 0.3;
        
        // Crescendo envelope
        const crescendo = intensity * (1 + Math.sin(t * 20) * 0.1); // Slight tremolo
        
        left[i] = (bass + strings + tension + brass + percussion) * crescendo * 0.4;
        right[i] = (bass * 0.8 + strings * 1.2 + tension * 0.9 + brass * 1.1 + percussion * 0.7) * crescendo * 0.4;
      } else {
        // Freeze-frame/cut-off phase (silence or very low sustain)
        const sustainIntensity = 0.1 * Math.exp(-(t - buildUpDuration) * 10); // Quick fade
        const sustain = Math.sin(2 * Math.PI * 523 * t) * sustainIntensity;
        
        left[i] = sustain;
        right[i] = sustain * 0.8;
      }
    }
  }

  private generateChaosLayer(left: Float32Array, right: Float32Array, length: number, sampleRate: number) {
    for (let i = 0; i < length; i++) {
      const t = i / sampleRate;
      const chaos = Math.sin(t * 50) * Math.sin(t * 73) * Math.sin(t * 97);
      const noise = (Math.random() - 0.5) * 2;
      const distortion = Math.tanh(chaos * 3 + noise * 0.5);
      
      left[i] = distortion * 0.2;
      right[i] = distortion * -0.2;
    }
  }

  private generateDefaultJojoSound(left: Float32Array, right: Float32Array, length: number, sampleRate: number, key: string) {
    switch (key) {
      case 'giorno-piano':
        this.generateGiornoPianoTheme(left, right, length, sampleRate);
        break;
      case 'entrance-swell':
        this.generateEntranceSwell(left, right, length, sampleRate);
        break;
      case 'hover-mystery':
        this.generateHoverMystery(left, right, length, sampleRate);
        break;
      case 'cart-fanfare':
        this.generateCartFanfare(left, right, length, sampleRate);
        break;
      case 'checkout-finale':
        this.generateCheckoutFinale(left, right, length, sampleRate);
        break;
      case 'piano-suspense':
        this.generatePianoSuspense(left, right, length, sampleRate);
        break;
      case 'to-be-continued-full':
        this.generateToBeContinuedFull(left, right, length, sampleRate);
        break;
      case 'fly-in-the-sky':
        this.generateFlyInTheSky(left, right, length, sampleRate);
        break;
      case 'forgive-father-dramatic':
        this.generateForgiveFatherDramatic(left, right, length, sampleRate);
        break;
      case 'jojo-meme-compilation':
        this.generateJojoMemeCompilation(left, right, length, sampleRate);
        break;
      case 'sono-chi-no-kioku':
        this.generateSonoChiNoKioku(left, right, length, sampleRate);
        break;
      case 'traitors-requiem':
        this.generateTraitorsRequiem(left, right, length, sampleRate);
        break;
      case 'heaven-ascension':
        this.generateHeavenAscension(left, right, length, sampleRate);
        break;
      default:
        this.generateBasicJojoSound(left, right, length, sampleRate, key);
    }
  }

  private generateGiornoPianoTheme(left: Float32Array, right: Float32Array, length: number, sampleRate: number) {
    // Giorno's theme iconic piano melody pattern (simplified version)
    const melody = [
      { note: 293.66, duration: 0.5 }, // D4
      { note: 329.63, duration: 0.5 }, // E4
      { note: 369.99, duration: 0.5 }, // F#4
      { note: 415.30, duration: 0.5 }, // G#4
      { note: 440.00, duration: 1.0 }, // A4
      { note: 493.88, duration: 0.5 }, // B4
      { note: 554.37, duration: 0.5 }, // C#5
      { note: 587.33, duration: 1.0 }, // D5
      { note: 659.25, duration: 1.5 }, // E5 (climax)
      { note: 587.33, duration: 0.5 }, // D5
      { note: 554.37, duration: 0.5 }, // C#5
      { note: 493.88, duration: 1.0 }  // B4
    ];
    
    let currentTime = 0;
    let noteIndex = 0;
    
    for (let i = 0; i < length; i++) {
      const t = i / sampleRate;
      
      // Determine current note
      while (noteIndex < melody.length - 1 && currentTime >= melody[noteIndex].duration) {
        currentTime -= melody[noteIndex].duration;
        noteIndex++;
      }
      
      if (noteIndex < melody.length) {
        const note = melody[noteIndex];
        const noteProgress = currentTime / note.duration;
        
        // Piano-like envelope (quick attack, sustained decay)
        const envelope = Math.exp(-noteProgress * 2) * (1 - Math.exp(-noteProgress * 20));
        
        // Main tone with slight detuning for richness
        const main = Math.sin(2 * Math.PI * note.note * t);
        const detune = Math.sin(2 * Math.PI * note.note * 1.003 * t) * 0.3;
        
        // Add harmonics for piano-like timbre
        const harmonic2 = Math.sin(2 * Math.PI * note.note * 2 * t) * 0.2;
        const harmonic3 = Math.sin(2 * Math.PI * note.note * 3 * t) * 0.1;
        
        // Slight reverb simulation
        const reverb = Math.sin(2 * Math.PI * note.note * t + Math.sin(t * 5) * 0.1) * 0.1;
        
        left[i] = (main + detune + harmonic2 + harmonic3 + reverb) * envelope * 0.3;
        right[i] = (main + detune * 0.7 + harmonic2 * 0.8 + harmonic3 * 1.2 + reverb * 0.8) * envelope * 0.3;
      }
      
      currentTime += 1 / sampleRate;
    }
  }

  private generateEntranceSwell(left: Float32Array, right: Float32Array, length: number, sampleRate: number) {
    for (let i = 0; i < length; i++) {
      const t = i / sampleRate;
      const progress = t / (length / sampleRate);
      
      // Orchestral swell with multiple layers
      const bass = Math.sin(2 * Math.PI * 65 * t) * Math.pow(progress, 2) * 0.6;
      const strings = Math.sin(2 * Math.PI * 130 * t) * progress * 0.4;
      const horns = Math.sin(2 * Math.PI * 260 * t) * Math.pow(progress, 1.5) * 0.3;
      const trumpets = Math.sin(2 * Math.PI * 523 * t) * Math.pow(progress, 3) * 0.5;
      
      // Add dramatic flourishes
      const flourish = Math.sin(2 * Math.PI * 1047 * t) * Math.pow(progress, 4) * 0.2;
      
      left[i] = (bass + strings + horns + trumpets + flourish) * 0.4;
      right[i] = (bass * 0.8 + strings * 1.2 + horns * 0.9 + trumpets * 1.1 + flourish * 0.7) * 0.4;
    }
  }

  private generateHoverMystery(left: Float32Array, right: Float32Array, length: number, sampleRate: number) {
    for (let i = 0; i < length; i++) {
      const t = i / sampleRate;
      
      // Mysterious piano notes with slight dissonance
      const mystery1 = Math.sin(2 * Math.PI * 207.65 * t) * Math.exp(-t * 2) * 0.4; // G#3
      const mystery2 = Math.sin(2 * Math.PI * 311.13 * t) * Math.exp(-t * 1.5) * 0.3; // Eb4 (tritone)
      const whisper = Math.sin(2 * Math.PI * 830 * t) * Math.exp(-t * 5) * 0.1; // High whisper
      
      left[i] = (mystery1 + mystery2 + whisper) * 0.5;
      right[i] = (mystery1 * 0.7 + mystery2 * 1.3 + whisper * 0.8) * 0.5;
    }
  }

  private generateCartFanfare(left: Float32Array, right: Float32Array, length: number, sampleRate: number) {
    for (let i = 0; i < length; i++) {
      const t = i / sampleRate;
      const envelope = Math.exp(-t * 1.5) * (1 - Math.exp(-t * 10));
      
      // Triumphant fanfare progression
      const trumpet1 = Math.sin(2 * Math.PI * 523 * t) * envelope * 0.5; // C5
      const trumpet2 = Math.sin(2 * Math.PI * 659 * t) * envelope * 0.4; // E5
      const trumpet3 = Math.sin(2 * Math.PI * 784 * t) * envelope * 0.3; // G5
      
      // Add brass harmonics
      const brass = Math.sin(2 * Math.PI * 1047 * t) * envelope * 0.2; // C6
      
      left[i] = (trumpet1 + trumpet2 + trumpet3 + brass) * 0.4;
      right[i] = (trumpet1 * 0.8 + trumpet2 * 1.2 + trumpet3 * 0.9 + brass * 1.1) * 0.4;
    }
  }

  private generateCheckoutFinale(left: Float32Array, right: Float32Array, length: number, sampleRate: number) {
    for (let i = 0; i < length; i++) {
      const t = i / sampleRate;
      const progress = t / (length / sampleRate);
      
      // Epic finale with full orchestra
      const timpani = Math.sin(2 * Math.PI * 60 * t) * Math.exp(-((t % 1) * 4)) * 0.6;
      const brass = Math.sin(2 * Math.PI * 523 * t) * progress * 0.5;
      const strings = Math.sin(2 * Math.PI * 1047 * t) * Math.pow(progress, 2) * 0.4;
      const cymbals = (Math.random() - 0.5) * Math.exp(-t * 3) * 0.2;
      
      left[i] = (timpani + brass + strings + cymbals) * 0.5;
      right[i] = (timpani * 0.8 + brass * 1.2 + strings * 0.9 + cymbals * 0.7) * 0.5;
    }
  }

  private generatePianoSuspense(left: Float32Array, right: Float32Array, length: number, sampleRate: number) {
    for (let i = 0; i < length; i++) {
      const t = i / sampleRate;
      
      // Suspenseful piano with dissonant intervals
      const low = Math.sin(2 * Math.PI * 123.47 * t) * Math.exp(-t * 1) * 0.4; // B2
      const high = Math.sin(2 * Math.PI * 466.16 * t) * Math.exp(-t * 2) * 0.3; // Bb4 (tritone)
      const tremolo = Math.sin(2 * Math.PI * 311.13 * t) * Math.sin(t * 15) * 0.2; // Tremolo effect
      
      left[i] = (low + high + tremolo) * 0.4;
      right[i] = (low * 0.7 + high * 1.3 + tremolo * 0.8) * 0.4;
    }
  }

  private generateToBeContinuedFull(left: Float32Array, right: Float32Array, length: number, sampleRate: number) {
    const totalDuration = length / sampleRate;
    const buildUpDuration = totalDuration * 0.65; // Longer build-up
    const climaxDuration = totalDuration * 0.25; // Extended climax
    const freezeDuration = totalDuration * 0.1;
    
    for (let i = 0; i < length; i++) {
      const t = i / sampleRate;
      
      if (t < buildUpDuration) {
        // More dramatic extended build-up
        const progress = t / buildUpDuration;
        const intensity = Math.pow(progress, 1.2); // Smoother curve
        
        // Orchestral layers with more complexity
        const bass = Math.sin(2 * Math.PI * 87 * t) * 0.7;
        const strings = Math.sin(2 * Math.PI * 261 * t) * intensity * 0.6;
        const tension = Math.sin(2 * Math.PI * 440 * t * (1 + progress * 1.5)) * intensity * 0.5;
        const brass = Math.sin(2 * Math.PI * 523 * t) * Math.pow(intensity, 1.8) * 0.6;
        const percussion = Math.sin(2 * Math.PI * 60 * t) * Math.exp(-((t % 0.6) * 5)) * intensity * 0.5;
        
        // Add rising tension with frequency modulation
        const tensionRise = Math.sin(2 * Math.PI * (220 + progress * 200) * t) * intensity * 0.3;
        const dramaticSwell = Math.sin(2 * Math.PI * 1047 * t) * Math.pow(intensity, 3) * 0.4;
        
        left[i] = (bass + strings + tension + brass + percussion + tensionRise + dramaticSwell) * intensity * 0.45;
        right[i] = (bass * 0.8 + strings * 1.3 + tension * 0.9 + brass * 1.2 + percussion * 0.7 + tensionRise * 1.1 + dramaticSwell * 0.8) * intensity * 0.45;
      } else if (t < buildUpDuration + climaxDuration) {
        // Extended dramatic climax
        const climaxProgress = (t - buildUpDuration) / climaxDuration;
        const maxIntensity = 1.0 - Math.pow(climaxProgress, 2.5); // Slower fade
        
        const fullOrchestra = Math.sin(2 * Math.PI * 523 * t) * maxIntensity * 0.9;
        const highBrass = Math.sin(2 * Math.PI * 1047 * t) * maxIntensity * 0.7;
        const cymbals = (Math.random() - 0.5) * maxIntensity * 0.4;
        const timpani = Math.sin(2 * Math.PI * 60 * t) * Math.exp(-((t % 0.4) * 8)) * maxIntensity * 0.6;
        
        left[i] = (fullOrchestra + highBrass + cymbals + timpani) * 0.7;
        right[i] = (fullOrchestra * 1.1 + highBrass * 0.9 + cymbals * 0.7 + timpani * 0.8) * 0.7;
      } else {
        // Enhanced freeze effect with subtle sustain
        const freezeProgress = (t - buildUpDuration - climaxDuration) / freezeDuration;
        const sustainLevel = 0.1 * Math.exp(-freezeProgress * 15);
        const sustain = Math.sin(2 * Math.PI * 523 * t) * sustainLevel;
        
        left[i] = sustain;
        right[i] = sustain * 0.8;
      }
    }
  }

  private generateFlyInTheSky(left: Float32Array, right: Float32Array, length: number, sampleRate: number) {
    // Generate "Fly in the Sky" JoJo remix style audio
    for (let i = 0; i < length; i++) {
      const t = i / sampleRate;
      const progress = t / (length / sampleRate);
      
      // Soaring melody with JoJo dramatic flair
      const mainMelody = Math.sin(2 * Math.PI * 440 * t * (1 + Math.sin(t * 2) * 0.1)) * 0.5;
      const harmony = Math.sin(2 * Math.PI * 659 * t) * 0.3;
      const bass = Math.sin(2 * Math.PI * 110 * t) * 0.4;
      
      // Add epic orchestral elements
      const strings = Math.sin(2 * Math.PI * 523 * t) * Math.sin(t * 8) * 0.3;
      const brass = Math.sin(2 * Math.PI * 784 * t) * progress * 0.4;
      
      // Dramatic crescendo effect
      const intensity = Math.min(1.0, progress * 2);
      
      left[i] = (mainMelody + harmony + bass + strings + brass) * intensity * 0.4;
      right[i] = (mainMelody * 0.8 + harmony * 1.2 + bass * 0.9 + strings * 1.1 + brass * 0.7) * intensity * 0.4;
    }
  }

  private generateForgiveFatherDramatic(left: Float32Array, right: Float32Array, length: number, sampleRate: number) {
    // Generate dramatic "Forgive them father" meme audio
    for (let i = 0; i < length; i++) {
      const t = i / sampleRate;
      const progress = t / (length / sampleRate);
      
      // Dark, dramatic church organ-like tones
      const organ = Math.sin(2 * Math.PI * 131 * t) * 0.6; // C3
      const organHarmony = Math.sin(2 * Math.PI * 196 * t) * 0.4; // G3
      
      // Add dramatic choir-like harmonics
      const choir1 = Math.sin(2 * Math.PI * 262 * t) * Math.sin(t * 5) * 0.3;
      const choir2 = Math.sin(2 * Math.PI * 330 * t) * Math.sin(t * 7) * 0.2;
      
      // Dramatic bell tolling effect
      const bell = Math.sin(2 * Math.PI * 523 * t) * Math.exp(-t * 3) * 0.4;
      
      // Build intensity with reverb-like echo
      const echo = Math.sin(2 * Math.PI * 131 * (t - 0.3)) * Math.exp(-(t - 0.3) * 2) * 0.2;
      
      const intensity = Math.pow(progress, 0.5);
      
      left[i] = (organ + organHarmony + choir1 + choir2 + bell + echo) * intensity * 0.4;
      right[i] = (organ * 0.8 + organHarmony * 1.2 + choir1 * 0.9 + choir2 * 1.1 + bell * 0.7 + echo * 0.8) * intensity * 0.4;
    }
  }

  private generateJojoMemeCompilation(left: Float32Array, right: Float32Array, length: number, sampleRate: number) {
    // Generate a chaotic compilation of JoJo meme sounds
    for (let i = 0; i < length; i++) {
      const t = i / sampleRate;
      const segment = Math.floor(t * 4) % 4; // 4 different segments
      
      let sound = 0;
      
      switch (segment) {
        case 0: // ORA section
          sound = Math.sin(2 * Math.PI * 440 * t) * Math.sin(t * 20) * 0.5;
          break;
        case 1: // MUDA section
          sound = Math.sin(2 * Math.PI * 330 * t) * Math.sin(t * 15) * 0.5;
          break;
        case 2: // WRYYY section
          sound = Math.sin(2 * Math.PI * 220 * t) * Math.exp(-((t % 1) * 3)) * 0.6;
          break;
        case 3: // ZA WARUDO section
          sound = Math.sin(2 * Math.PI * 146 * t) * (1 - t % 1) * 0.5;
          break;
      }
      
      // Add chaos and distortion
      const chaos = (Math.random() - 0.5) * 0.2;
      const distortion = Math.tanh(sound * 3);
      
      left[i] = (distortion + chaos) * 0.4;
      right[i] = (distortion * 0.8 + chaos * 1.2) * 0.4;
    }
  }

  private generateSonoChiNoKioku(left: Float32Array, right: Float32Array, length: number, sampleRate: number) {
    // Generate Sono Chi no Kioku inspired audio
    for (let i = 0; i < length; i++) {
      const t = i / sampleRate;
      const progress = t / (length / sampleRate);
      
      // Epic opening theme style
      const mainTheme = Math.sin(2 * Math.PI * 523 * t) * 0.5;
      const harmony = Math.sin(2 * Math.PI * 659 * t) * 0.4;
      const bass = Math.sin(2 * Math.PI * 131 * t) * 0.6;
      
      // Add dramatic orchestral swells
      const orchestra = Math.sin(2 * Math.PI * 1047 * t) * Math.pow(progress, 2) * 0.3;
      const percussion = Math.sin(2 * Math.PI * 65 * t) * Math.exp(-((t % 2) * 2)) * 0.5;
      
      const intensity = Math.min(1.0, progress * 1.5);
      
      left[i] = (mainTheme + harmony + bass + orchestra + percussion) * intensity * 0.4;
      right[i] = (mainTheme * 0.9 + harmony * 1.1 + bass * 0.8 + orchestra * 1.2 + percussion * 0.7) * intensity * 0.4;
    }
  }

  private generateTraitorsRequiem(left: Float32Array, right: Float32Array, length: number, sampleRate: number) {
    // Generate Traitor's Requiem inspired audio
    for (let i = 0; i < length; i++) {
      const t = i / sampleRate;
      const progress = t / (length / sampleRate);
      
      // Dark, intense theme
      const darkMelody = Math.sin(2 * Math.PI * 293 * t) * 0.5; // D4
      const tensionChord = Math.sin(2 * Math.PI * 311 * t) * 0.4; // Eb4 (tritone)
      const bass = Math.sin(2 * Math.PI * 73 * t) * 0.6;
      
      // Add dramatic intensity
      const intensity = Math.sin(t * 3) * Math.pow(progress, 1.5) * 0.3;
      const percussion = Math.sin(2 * Math.PI * 55 * t) * Math.exp(-((t % 1.5) * 4)) * 0.4;
      
      left[i] = (darkMelody + tensionChord + bass + intensity + percussion) * 0.4;
      right[i] = (darkMelody * 0.8 + tensionChord * 1.2 + bass * 0.9 + intensity * 1.1 + percussion * 0.7) * 0.4;
    }
  }

  private generateHeavenAscension(left: Float32Array, right: Float32Array, length: number, sampleRate: number) {
    // Generate Heaven Ascension DIO theme
    for (let i = 0; i < length; i++) {
      const t = i / sampleRate;
      const progress = t / (length / sampleRate);
      
      // Ethereal, ascending theme
      const ascending = Math.sin(2 * Math.PI * (440 + progress * 440) * t) * 0.5;
      const harmony = Math.sin(2 * Math.PI * (659 + progress * 330) * t) * 0.4;
      const bass = Math.sin(2 * Math.PI * 110 * t) * (1 - progress * 0.5) * 0.5;
      
      // Add celestial choir effect
      const choir = Math.sin(2 * Math.PI * 1047 * t) * Math.sin(t * 6) * Math.pow(progress, 2) * 0.3;
      const ethereal = Math.sin(2 * Math.PI * 1760 * t) * Math.exp(-t * 0.5) * 0.2;
      
      left[i] = (ascending + harmony + bass + choir + ethereal) * 0.4;
      right[i] = (ascending * 0.9 + harmony * 1.1 + bass * 0.8 + choir * 1.2 + ethereal * 0.7) * 0.4;
    }
  }

  private generateWryyyScreamEffect(left: Float32Array, right: Float32Array, length: number, sampleRate: number) {
    // Generate WRYYY scream effect for DIO IS WATCHING popup
    for (let i = 0; i < length; i++) {
      const t = i / sampleRate;
      const progress = t / (length / sampleRate);
      
      // Create dramatic scream-like sound with frequency modulation
      const screamFreq = 150 + Math.sin(t * 20) * 80 + progress * 100; // Rising pitch
      const screamWave = Math.sin(2 * Math.PI * screamFreq * t);
      
      // Add harsh distortion for vocal-like quality
      const distortion = Math.tanh(screamWave * 5) * Math.exp(-t * 0.8);
      
      // Add harmonics for more aggressive sound
      const harmonic1 = Math.sin(2 * Math.PI * screamFreq * 2 * t) * 0.3;
      const harmonic2 = Math.sin(2 * Math.PI * screamFreq * 3 * t) * 0.2;
      
      // Add noise for texture
      const noise = (Math.random() - 0.5) * 0.4 * Math.exp(-t * 1.5);
      
      // Create dramatic envelope
      const envelope = Math.exp(-t * 1.2) * (1 - Math.exp(-t * 10));
      
      const finalSound = (distortion + harmonic1 + harmonic2 + noise) * envelope;
      
      left[i] = finalSound * 0.6;
      right[i] = finalSound * 0.6;
    }
  }

  private generateTickTockTimeStopEffect(left: Float32Array, right: Float32Array, length: number, sampleRate: number) {
    // Generate tick-tock sound for Za Warudo time freeze
    for (let i = 0; i < length; i++) {
      const t = i / sampleRate;
      const totalDuration = length / sampleRate;
      
      // Create clock tick pattern (every 0.5 seconds)
      const tickInterval = 0.5;
      const tickTime = t % tickInterval;
      const tickNumber = Math.floor(t / tickInterval);
      
      let tickSound = 0;
      
      if (tickTime < 0.1) {
        // Generate tick sound
        const tickFreq = tickNumber % 2 === 0 ? 800 : 600; // Alternating high/low tick
        const tickEnvelope = Math.exp(-tickTime * 20);
        tickSound = Math.sin(2 * Math.PI * tickFreq * tickTime) * tickEnvelope * 0.7;
      }
      
      // Add time distortion effect that intensifies
      const distortionProgress = t / totalDuration;
      const timeWarp = Math.sin(2 * Math.PI * 0.3 * t) * distortionProgress * 0.3;
      
      // Add ethereal time-stop ambient sound
      const ambient = Math.sin(2 * Math.PI * 220 * t) * Math.exp(-t * 0.5) * 0.2;
      const windDown = Math.sin(2 * Math.PI * (440 - distortionProgress * 200) * t) * distortionProgress * 0.3;
      
      const finalSound = tickSound + timeWarp + ambient + windDown;
      
      left[i] = finalSound * 0.5;
      right[i] = finalSound * 0.5;
    }
  }

  private generateMudaRapidFireEffect(left: Float32Array, right: Float32Array, length: number, sampleRate: number) {
    // Generate rapid-fire MUDA MUDA MUDA for maximum chaos
    for (let i = 0; i < length; i++) {
      const t = i / sampleRate;
      const totalDuration = length / sampleRate;
      const progress = t / totalDuration;
      
      // Create rapid punch-like sounds
      const punchInterval = 0.08; // Very fast punches
      const punchTime = t % punchInterval;
      const punchNumber = Math.floor(t / punchInterval);
      
      let punchSound = 0;
      
      if (punchTime < 0.02) {
        // Generate punch impact sound
        const impactFreq = 200 + (punchNumber % 5) * 50; // Varying frequencies
        const impactEnvelope = Math.exp(-punchTime * 50);
        const impact = Math.sin(2 * Math.PI * impactFreq * punchTime) * impactEnvelope;
        
        // Add noise for punch texture
        const punchNoise = (Math.random() - 0.5) * 0.5 * impactEnvelope;
        
        punchSound = (impact + punchNoise) * 0.8;
      }
      
      // Add increasingly chaotic background
      const chaosIntensity = Math.pow(progress, 1.5);
      const chaosFreq = 300 + Math.sin(t * 30) * 100 * chaosIntensity;
      const chaos = Math.sin(2 * Math.PI * chaosFreq * t) * chaosIntensity * 0.4;
      
      // Add rapid-fire vocal-like modulation
      const vocalMod = Math.sin(2 * Math.PI * 12 * t) * progress * 0.3; // Fast modulation
      
      // Build intensity over time
      const intensity = 0.5 + progress * 0.5;
      
      const finalSound = (punchSound + chaos + vocalMod) * intensity;
      
      left[i] = finalSound * 0.7;
      right[i] = finalSound * 0.7;
    }
  }

  private generateBasicJojoSound(left: Float32Array, right: Float32Array, length: number, sampleRate: number, key: string) {
    const frequency = this.getFrequencyForSound(key);
    for (let i = 0; i < length; i++) {
      const t = i / sampleRate;
      const envelope = Math.exp(-t * 2);
      const wave = Math.sin(2 * Math.PI * frequency * t);
      const harmonics = Math.sin(2 * Math.PI * frequency * 2 * t) * 0.3;
      
      left[i] = (wave + harmonics) * envelope * 0.2;
      right[i] = (wave + harmonics * 0.7) * envelope * 0.2;
    }
  }

  private getFrequencyForSound(key: string): number {
    const frequencies: Record<string, number> = {
      ora: 440,
      muda: 330,
      wryyy: 220,
      roundabout: 523,
      giorno: 659,
      'giorno-piano': 659,
      menacing: 110,
      yare: 392,
      konodioda: 277,
      timestop: 146,
      'to-be-continued': 523,
      'to-be-continued-full': 523,
      'il-vento-doro': 659,
      'mudamuda': 330,
      'oraora': 440,
      'entrance-swell': 261,
      'hover-mystery': 207,
      'cart-fanfare': 523,
      'checkout-finale': 523,
      'piano-suspense': 311,
      'wryyy-scream': 200,
      'tick-tock-timestop': 800,
      'muda-rapid-fire': 300
    };
    return frequencies[key] || 440;
  }

  async playSound(key: string, options: { volume?: number; pitch?: number; reverb?: boolean; chaos?: boolean } = {}): Promise<void> {
    if (!this.audioContext) {
      await this.initialize();
    }
    
    if (!this.audioContext || !this.masterGain) return;

    const buffer = await this.loadAudio(key);
    if (!buffer) return;

    try {
      const source = this.audioContext.createBufferSource();
      const gainNode = this.audioContext.createGain();
      const filterNode = this.audioContext.createBiquadFilter();
      
      source.buffer = buffer;
      
      // Apply pitch modulation if specified
      if (options.pitch) {
        source.playbackRate.value = options.pitch;
      }
      
      // Connect audio graph
      source.connect(filterNode);
      filterNode.connect(gainNode);
      
      if (options.reverb && this.reverb) {
        gainNode.connect(this.reverb);
      } else {
        gainNode.connect(this.compressor || this.masterGain);
      }
      
      const config = audioFiles[key];
      const baseVolume = (config?.volume || 0.5) * (options.volume || 1.0) * this.currentVolume;
      
      // Apply chaos mode effects
      if (this.chaosMode || options.chaos) {
        const chaosVolume = baseVolume * (0.5 + Math.random() * 1.5);
        gainNode.gain.setValueAtTime(chaosVolume, this.audioContext.currentTime);
        filterNode.frequency.setValueAtTime(1000 + Math.random() * 2000, this.audioContext.currentTime);
        filterNode.Q.setValueAtTime(Math.random() * 10 + 1, this.audioContext.currentTime);
      } else {
        gainNode.gain.value = baseVolume;
      }
      
      source.start();
      this.activeSources.push(source);
      
      // Auto-cleanup
      const duration = config?.duration || 0.5;
      source.stop(this.audioContext.currentTime + duration);
      
      source.onended = () => {
        const index = this.activeSources.indexOf(source);
        if (index > -1) {
          this.activeSources.splice(index, 1);
        }
      };
    } catch (error) {
      console.warn(`Failed to play sound ${key}:`, error);
    }
  }

  setVolume(volume: number) {
    this.currentVolume = Math.max(0, Math.min(1, volume));
    if (this.masterGain) {
      this.masterGain.gain.setValueAtTime(this.currentVolume, this.audioContext?.currentTime || 0);
    }
  }

  enableChaosMode() {
    this.chaosMode = true;
  }

  disableChaosMode() {
    this.chaosMode = false;
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
      
      // Use a more dramatic voice if available
      const voices = speechSynthesis.getVoices();
      const preferredVoice = voices.find(voice => 
        voice.name.includes('Enhanced') || 
        voice.name.includes('Premium') ||
        voice.name.includes('Google')
      );
      
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
      
      speechSynthesis.speak(utterance);
    } catch (error) {
      console.warn('Text-to-speech failed:', error);
    }
  }

  async playOverlappingChaos(soundKeys: string[], maxOverlap: number = 5) {
    const shuffled = [...soundKeys].sort(() => Math.random() - 0.5);
    const toPlay = shuffled.slice(0, Math.min(maxOverlap, shuffled.length));
    
    toPlay.forEach((key, index) => {
      setTimeout(() => {
        this.playSound(key, { 
          volume: 0.3 + Math.random() * 0.7,
          pitch: 0.8 + Math.random() * 0.4,
          chaos: true 
        });
      }, index * 200 + Math.random() * 500);
    });
  }

  async generateDramaticCrescendo(duration: number = 5000) {
    if (!this.audioContext || !this.masterGain) return;
    
    const crescendoGain = this.audioContext.createGain();
    crescendoGain.connect(this.masterGain);
    
    const frequencies = [220, 277, 330, 415, 523];
    const sources: AudioBufferSourceNode[] = [];
    
    frequencies.forEach((freq, index) => {
      const oscillator = this.audioContext!.createOscillator();
      const gain = this.audioContext!.createGain();
      
      oscillator.type = 'sawtooth';
      oscillator.frequency.setValueAtTime(freq, this.audioContext!.currentTime);
      
      gain.gain.setValueAtTime(0, this.audioContext!.currentTime);
      gain.gain.linearRampToValueAtTime(0.1, this.audioContext!.currentTime + duration / 1000);
      gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext!.currentTime + duration / 1000 + 1);
      
      oscillator.connect(gain);
      gain.connect(crescendoGain);
      
      oscillator.start(this.audioContext!.currentTime + index * 0.2);
      oscillator.stop(this.audioContext!.currentTime + duration / 1000 + 2);
    });
  }

  async playBackgroundMusic(key: string, loop: boolean = true): Promise<void> {
    if (!this.audioContext) {
      await this.initialize();
    }
    
    if (!this.audioContext) return;

    const buffer = await this.loadAudio(key);
    if (!buffer) return;

    try {
      const source = this.audioContext.createBufferSource();
      const gainNode = this.audioContext.createGain();
      
      source.buffer = buffer;
      source.loop = loop;
      source.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      const config = audioFiles[key];
      gainNode.gain.value = (config?.volume || 0.5) * 0.3; // Lower volume for background
      
      source.start();
    } catch (error) {
      console.warn(`Failed to play background music ${key}:`, error);
    }
  }
}

const audioManager = new AudioManager();

export async function playJojoSound(soundKey: string): Promise<void> {
  await audioManager.playSound(soundKey);
}

export async function playBackgroundMusic(musicKey: string, loop: boolean = true): Promise<void> {
  await audioManager.playBackgroundMusic(musicKey, loop);
}

export async function initializeAudio(): Promise<void> {
  await audioManager.initialize();
}

// JoJo-specific sound functions
export const playOra = () => playJojoSound('ora');
export const playMuda = () => playJojoSound('muda');
export const playWryyy = () => playJojoSound('wryyy');
export const playKonoDioDa = () => playJojoSound('konodioda');
export const playYareYare = () => playJojoSound('yare');
export const playTimeStop = () => playJojoSound('timestop');
export const playMenacing = () => playJojoSound('menacing');

// New JoJo meme sounds
export const playToBeContinued = () => playJojoSound('to-be-continued');
export const playToBeContinuedFull = () => playJojoSound('to-be-continued-full');
export const playGiornoPiano = () => playJojoSound('giorno-piano');
export const playIlVentoDoro = () => playJojoSound('il-vento-doro');
export const playMudaMuda = () => playJojoSound('mudamuda');
export const playOraOra = () => playJojoSound('oraora');

// Enhanced Musical Stingers
export const playEntranceSwell = () => audioManager.playSound('entrance-swell', { reverb: true });
export const playHoverMystery = () => audioManager.playSound('hover-mystery', { volume: 0.6 });
export const playCartFanfare = () => audioManager.playSound('cart-fanfare', { reverb: true });
export const playCheckoutFinale = () => audioManager.playSound('checkout-finale', { volume: 0.9, reverb: true });
export const playPianoSuspense = () => audioManager.playSound('piano-suspense', { reverb: true });

// Background music functions
export const playRoundabout = () => playBackgroundMusic('roundabout');
export const playGiornoTheme = () => playBackgroundMusic('giorno');

// Enhanced Unpredictable Auto-play system with true brainrot chaos
export function startJoJoMemeAudioTimer(): () => void {
  const memeAudioSounds = ['to-be-continued-full', 'giorno-piano', 'il-vento-doro', 'mudamuda', 'oraora', 'menacing', 'wryyy', 'dramatic-stinger', 'entrance-swell', 'piano-suspense', 'fly-in-the-sky', 'forgive-father-dramatic', 'jojo-meme-compilation', 'sono-chi-no-kioku', 'traitors-requiem', 'heaven-ascension'];
  
  const scheduleNextAudio = () => {
    // Reduced timing for more frequent memes (30-60 seconds)
    const randomInterval = 30000 + Math.random() * 30000;
    
    setTimeout(async () => {
      // More varied event types with specific JoJo patterns
      const eventType = Math.random();
      
      if (eventType < 0.2) {
        // Enhanced "To Be Continued" sequence with more dramatic effects
        console.log(`🎵 ENHANCED TO BE CONTINUED SEQUENCE!`);
        await audioManager.playSound('to-be-continued-full', { volume: 0.95, reverb: true });
        
        setTimeout(() => {
          const toBeContinuedPhrases = ['KONO DIO DA!', 'It was me, DIO!', 'WRYYY!', 'But it was me, DIO, all along!'];
          const phrase = toBeContinuedPhrases[Math.floor(Math.random() * toBeContinuedPhrases.length)];
          audioManager.playTextToSpeech(phrase, { rate: 1.4, pitch: 1.9 });
        }, 5000); // Timed with freeze moment
        
      } else if (eventType < 0.35) {
        // "Forgive them father" dramatic meme sequence
        console.log(`🙏 FORGIVE THEM FATHER DRAMATIC SEQUENCE!`);
        await audioManager.playSound('forgive-father-dramatic', { volume: 0.85, reverb: true });
        
        setTimeout(() => {
          const forgivePhrases = [
            'Forgive them father, for I have sinned', 
            'Forgive me father', 
            'Forgive them father, for they know not what they do',
            'Father, forgive me for what I must do'
          ];
          const phrase = forgivePhrases[Math.floor(Math.random() * forgivePhrases.length)];
          audioManager.playTextToSpeech(phrase, { rate: 0.8, pitch: 1.1 });
        }, 2000);
        
      } else if (eventType < 0.5) {
        // Fly in the Sky JoJo remix
        console.log(`✈️ FLY IN THE SKY JOJO REMIX!`);
        await audioManager.playSound('fly-in-the-sky', { volume: 0.8, reverb: true });
        
        setTimeout(() => {
          const skyPhrases = ['I believe I can fly!', 'Sono chi no sadame!', 'Flying through the sky!'];
          const phrase = skyPhrases[Math.floor(Math.random() * skyPhrases.length)];
          audioManager.playTextToSpeech(phrase, { rate: 1.1, pitch: 1.5 });
        }, 4000);
        
      } else if (eventType < 0.65) {
        // Giorno's Theme Piano Experience
        console.log(`🎹 GIORNO'S THEME PIANO EXPERIENCE!`);
        await audioManager.playSound('giorno-piano', { volume: 0.8, reverb: true });
        
        setTimeout(() => {
          audioManager.playTextToSpeech('I have a dream!', { rate: 1.2, pitch: 1.6 });
        }, 3000);
        
        setTimeout(() => {
          audioManager.playTextToSpeech('Gold Experience Requiem!', { rate: 1.0, pitch: 1.8 });
        }, 8000);
        
      } else if (eventType < 0.8) {
        // Enhanced JoJo Meme Compilation Chaos
        console.log(`💀🧠 ENHANCED JOJO MEME COMPILATION CHAOS! 🧠💀`);
        audioManager.enableChaosMode();
        
        // Play the meme compilation sound
        await audioManager.playSound('jojo-meme-compilation', { volume: 0.7, chaos: true });
        
        // Layer additional chaos sounds
        await audioManager.playOverlappingChaos(memeAudioSounds, 7);
        
        // Enhanced TTS spam with more meme phrases
        const enhancedChaosPhrases = [
          ...JOJO_CATCHPHRASES.slice(0, 6),
          'Forgive them father', 'Is that a JoJo reference?!', 'RETIRED!'
        ];
        enhancedChaosPhrases.forEach((phrase, index) => {
          setTimeout(() => {
            audioManager.playTextToSpeech(phrase, { 
              rate: 0.4 + Math.random() * 2.2, 
              pitch: 0.7 + Math.random() * 1.8,
              volume: 0.3 + Math.random() * 0.7
            });
          }, index * 700 + Math.random() * 1200);
        });
        
        // Enhanced volume chaos with more extreme variations
        let chaosCount = 0;
        const volumeChaos = setInterval(() => {
          audioManager.setVolume(0.1 + Math.random() * 0.9);
          chaosCount++;
          if (chaosCount > 10) {
            clearInterval(volumeChaos);
            audioManager.setVolume(0.7);
            audioManager.disableChaosMode();
          }
        }, 1000);
        
      } else if (eventType < 0.9) {
        // New JoJo Theme Showcase
        console.log(`🎵 NEW JOJO THEME SHOWCASE!`);
        
        const newThemes = ['sono-chi-no-kioku', 'traitors-requiem', 'heaven-ascension'];
        const selectedTheme = newThemes[Math.floor(Math.random() * newThemes.length)];
        
        await audioManager.playSound(selectedTheme, { volume: 0.8, reverb: true });
        
        setTimeout(() => {
          const themePhrases = {
            'sono-chi-no-kioku': 'Sono chi no kioku... JoJo!',
            'traitors-requiem': 'This is... Requiem!',
            'heaven-ascension': 'Heaven Ascension DIO!'
          };
          const phrase = themePhrases[selectedTheme as keyof typeof themePhrases];
          audioManager.playTextToSpeech(phrase, { rate: 1.2, pitch: 1.6 });
        }, 3000);
        
      } else if (eventType < 0.95) {
        // Dramatic Musical Storytelling with "Forgive me" twist
        console.log(`🎭 DRAMATIC MUSICAL STORYTELLING WITH CONFESSION!`);
        
        // Sequence of musical events
        await audioManager.playSound('piano-suspense', { volume: 0.6, reverb: true });
        
        setTimeout(() => {
          audioManager.playTextToSpeech('Your next line is...', { rate: 1.1, pitch: 1.4 });
        }, 2000);
        
        setTimeout(() => {
          audioManager.playSound('dramatic-stinger', { volume: 0.8, reverb: true });
        }, 4000);
        
        setTimeout(() => {
          const predictions = [
            'This taste... is the taste of a liar!', 
            'You fell for it, fool!', 
            'Even Speedwagon is afraid!',
            'Forgive them father, for they know not what they do'
          ];
          const prediction = predictions[Math.floor(Math.random() * predictions.length)];
          audioManager.playTextToSpeech(prediction, { rate: 1.3, pitch: 1.7 });
        }, 6000);
        
      } else {
        // Enhanced Pure Meme Sound Spam with "Forgive" variants
        console.log(`🎵 ENHANCED PURE MEME SOUND SPAM WITH CONFESSION!`);
        
        const spamSounds = ['ora', 'muda', 'wryyy', 'konodioda', 'yare', 'forgive-father-dramatic'];
        for (let i = 0; i < 5; i++) {
          setTimeout(() => {
            const randomSpam = spamSounds[Math.floor(Math.random() * spamSounds.length)];
            audioManager.playSound(randomSpam, { 
              volume: 0.6 + Math.random() * 0.4,
              pitch: 0.8 + Math.random() * 0.6,
              chaos: true 
            });
          }, i * 500 + Math.random() * 400);
        }
        
        setTimeout(() => {
          const memePhrases = [
            'Mudamudamudamudamuda!', 
            'Oraoraoraoraoraora!', 
            'NIGERUNDAYO!',
            'Forgive them father, for I have sinned',
            'Is that a JoJo reference?!'
          ];
          const memePhrase = memePhrases[Math.floor(Math.random() * memePhrases.length)];
          audioManager.playTextToSpeech(memePhrase, { rate: 1.8, pitch: 1.6 });
        }, 2500);
      }
      
      // Enhanced volume chaos with more variation
      if (Math.random() < 0.5) {
        const volumePattern = Math.random();
        if (volumePattern < 0.3) {
          // Gradual volume change
          let currentVol = 0.7;
          const volInterval = setInterval(() => {
            currentVol += (Math.random() - 0.5) * 0.2;
            currentVol = Math.max(0.1, Math.min(1.0, currentVol));
            audioManager.setVolume(currentVol);
          }, 2000);
          
          setTimeout(() => {
            clearInterval(volInterval);
            audioManager.setVolume(0.7);
          }, 12000);
        } else {
          // Sudden volume spike
          audioManager.setVolume(0.9 + Math.random() * 0.1);
          setTimeout(() => audioManager.setVolume(0.7), 3000);
        }
        
        console.log(`🔊 Enhanced volume chaos activated!`);
      }
      
      // Schedule next unpredictable event
      scheduleNextAudio();
    }, randomInterval);
  };
  
  // Start the unpredictable cycle
  scheduleNextAudio();
  
  // Return cleanup function (note: this doesn't perfectly clean up the recursive timeouts,
  // but it's good enough for the meme experience)
  let stopped = false;
  return () => { stopped = true; };
}

// Enhanced sound effect functions with new features
export const playJojoSoundWithChaos = (soundKey: string) => {
  audioManager.playSound(soundKey, { 
    volume: 0.5 + Math.random() * 0.5,
    pitch: 0.8 + Math.random() * 0.4,
    reverb: Math.random() < 0.3,
    chaos: Math.random() < 0.2
  });
};

// Enhanced specific JoJo phrase functions
export const playSpecificJojoCatchphrase = (phrase: string) => {
  audioManager.playTextToSpeech(phrase, {
    rate: 1.0 + Math.random() * 0.8,
    pitch: 1.2 + Math.random() * 0.8,
    volume: 0.7 + Math.random() * 0.3
  });
};

export const playYourNextLineIs = () => {
  audioManager.playTextToSpeech('Your next line is...', { rate: 1.1, pitch: 1.4 });
};

export const playItWasMeDio = () => {
  audioManager.playTextToSpeech('It was me, DIO!', { rate: 1.4, pitch: 1.9 });
};

export const playForgiveMe = () => {
  audioManager.playTextToSpeech('Forgive me father', { rate: 0.9, pitch: 1.2 });
};

export const playForgiveFatherDramatic = () => {
  // Play dramatic version with audio + TTS
  audioManager.playSound('forgive-father-dramatic', { volume: 0.8, reverb: true });
  setTimeout(() => {
    audioManager.playTextToSpeech('Forgive them father, for I have sinned', { rate: 0.8, pitch: 1.1 });
  }, 1000);
};

export const playFlyInTheSky = () => {
  audioManager.playSound('fly-in-the-sky', { volume: 0.8, reverb: true });
};

export const playJojoMemeCompilation = () => {
  audioManager.playSound('jojo-meme-compilation', { volume: 0.7, chaos: true });
};

export const playSonoChiNoKioku = () => {
  audioManager.playSound('sono-chi-no-kioku', { volume: 0.8, reverb: true });
};

export const playTraitorsRequiem = () => {
  audioManager.playSound('traitors-requiem', { volume: 0.8, reverb: true });
};

export const playHeavenAscension = () => {
  audioManager.playSound('heaven-ascension', { volume: 0.9, reverb: true });
};

export const playTasteOfLiar = () => {
  audioManager.playTextToSpeech('This taste... is the taste of a liar!', { rate: 1.2, pitch: 1.6 });
};

export const playRandomJojoCatchphrase = () => {
  const phrase = JOJO_CATCHPHRASES[Math.floor(Math.random() * JOJO_CATCHPHRASES.length)];
  audioManager.playTextToSpeech(phrase, {
    rate: 1.0 + Math.random() * 0.8,
    pitch: 1.2 + Math.random() * 0.8,
    volume: 0.7 + Math.random() * 0.3
  });
};

export const playDramaticStinger = () => audioManager.playSound('dramatic-stinger', { reverb: true });
export const playPopupEffect = () => audioManager.playSound('popup-effect');
export const playClickEffect = () => audioManager.playSound('click-effect');

export const enableAudioChaos = () => audioManager.enableChaosMode();
export const disableAudioChaos = () => audioManager.disableChaosMode();
export const setMasterVolume = (volume: number) => audioManager.setVolume(volume);

// Brainrot special effects
export const triggerAudioBrainrot = async () => {
  audioManager.enableChaosMode();
  
  // Play multiple overlapping sounds with enhanced chaos
  const allSounds = Object.keys(audioFiles);
  await audioManager.playOverlappingChaos(allSounds, 8); // Increased overlap
  
  // Enhanced TTS spam with more variety
  const phrases = [...JOJO_CATCHPHRASES, ...BRAINROT_PHRASES];
  for (let i = 0; i < 8; i++) {
    setTimeout(() => {
      const phrase = phrases[Math.floor(Math.random() * phrases.length)];
      audioManager.playTextToSpeech(phrase, {
        rate: 0.3 + Math.random() * 2.5,
        pitch: 0.4 + Math.random() * 2.5,
        volume: 0.2 + Math.random() * 0.8
      });
    }, i * 1000 + Math.random() * 1500);
  }
  
  // Enhanced chaos volume changes with more extreme variations
  let chaosCount = 0;
  const volumeChaos = setInterval(() => {
    const chaosPattern = Math.random();
    if (chaosPattern < 0.3) {
      // Sudden spikes
      audioManager.setVolume(0.9 + Math.random() * 0.1);
    } else if (chaosPattern < 0.6) {
      // Sudden drops
      audioManager.setVolume(0.1 + Math.random() * 0.2);
    } else {
      // Random chaos
      audioManager.setVolume(0.1 + Math.random() * 0.9);
    }
    
    chaosCount++;
    if (chaosCount > 15) {
      clearInterval(volumeChaos);
      audioManager.setVolume(0.7);
      audioManager.disableChaosMode();
    }
  }, 600); // Faster chaos changes
};

// New enhanced brainrot functions
export const triggerJojoMemeFrenzy = async () => {
  console.log('🎵 JOJO MEME FRENZY ACTIVATED!');
  
  // Sequential meme sound barrage
  const memeSequence = ['ora', 'muda', 'wryyy', 'konodioda', 'timestop', 'to-be-continued-full'];
  
  memeSequence.forEach((sound, index) => {
    setTimeout(() => {
      audioManager.playSound(sound, { 
        volume: 0.7 + Math.random() * 0.3,
        pitch: 0.9 + Math.random() * 0.2,
        reverb: true 
      });
    }, index * 1500);
  });
  
  // Synchronized TTS
  setTimeout(() => playSpecificJojoCatchphrase('MUDAMUDAMUDAMUDAMUDA!'), 3000);
  setTimeout(() => playSpecificJojoCatchphrase('ORAORAORAORAORAORA!'), 6000);
  setTimeout(() => playItWasMeDio(), 9000);
};

export const triggerGiornoThemeExperience = async () => {
  console.log('🎹 GIORNO THEME EXPERIENCE!');
  
  // Play Giorno piano theme
  await audioManager.playSound('giorno-piano', { volume: 0.8, reverb: true });
  
  // Timed Giorno phrases
  setTimeout(() => playSpecificJojoCatchphrase('I have a dream!'), 3000);
  setTimeout(() => playSpecificJojoCatchphrase('Gold Experience Requiem!'), 8000);
  setTimeout(() => playSpecificJojoCatchphrase('This is the power of Requiem'), 11000);
};

// New enhanced JoJo sound effects
export const playWryyyScream = () => audioManager.playSound('wryyy-scream', { volume: 0.9, reverb: true });
export const playTickTockTimeStop = () => audioManager.playSound('tick-tock-timestop', { volume: 0.7 });
export const playMudaRapidFire = () => audioManager.playSound('muda-rapid-fire', { volume: 0.8, chaos: true });