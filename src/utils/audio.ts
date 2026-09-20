// Web Audio API Synthesizer for CoolWall sound effects
// Completely offline, zero external audio assets required

let audioCtx: AudioContext | null = null;
let soundEnabled = true;

export function isAudioEnabled(): boolean {
  if (typeof window === 'undefined') return true;
  const stored = localStorage.getItem('coolwall_sound_enabled');
  if (stored !== null) return stored === 'true';
  return true;
}

export function setAudioEnabled(enabled: boolean): void {
  soundEnabled = enabled;
  if (typeof window !== 'undefined') {
    localStorage.setItem('coolwall_sound_enabled', String(enabled));
  }
}

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

// Slap card down sound (like slapping a cardboard card onto a magnet board)
export function playCardSlapSound(): void {
  if (!isAudioEnabled()) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Noise burst for thwack
    const bufferSize = ctx.sampleRate * 0.08;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.02));
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, now);
    filter.frequency.exponentialRampToValueAtTime(120, now + 0.08);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.7, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start(now);

    // Deep sub-thump
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(160, now);
    osc.frequency.exponentialRampToValueAtTime(45, now + 0.1);

    oscGain.gain.setValueAtTime(0.6, now);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

    osc.connect(oscGain);
    oscGain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.1);
  } catch (e) {
    console.debug('Audio error', e);
  }
}

// Category drop sound tailored to column
export function playCategoryDropSound(category: string): void {
  if (!isAudioEnabled()) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    if (category === 'seriously-uncool') {
      // Disgusted Top Gear buzzer / heavy downward trombone
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.linearRampToValueAtTime(85, now + 0.35);

      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.4);
    } else if (category === 'uncool') {
      // Meh low dual blip
      [180, 150].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(0.3, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.15);
      });
    } else if (category === 'cool') {
      // Crisp magnetic positive double snap
      [330, 660].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);
        gain.gain.setValueAtTime(0.35, now + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.2);
      });
      playCardSlapSound();
    } else if (category === 'subzero' || category === 'fridge') {
      // Glacial ice shimmer chime / crystalline freeze
      const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);

        gain.gain.setValueAtTime(0.25, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.6);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.65);
      });
      playCardSlapSound();
    }
  } catch (e) {
    console.debug('Audio error', e);
  }
}

// Theme switch sound
export function playThemeSound(preset: string): void {
  if (!isAudioEnabled()) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    if (preset === 'cars') {
      // V8 Throttle Rev! Filtered rumble revving up and down
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(65, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.25);
      osc.frequency.exponentialRampToValueAtTime(90, now + 0.55);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(400, now);
      filter.frequency.exponentialRampToValueAtTime(1800, now + 0.25);
      filter.frequency.exponentialRampToValueAtTime(500, now + 0.55);

      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.6);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.6);
    } else if (preset === 'spacex') {
      // Rocket Thruster ignition and orbital telemetry ping
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(80, now);
      osc.frequency.linearRampToValueAtTime(45, now + 0.4);

      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.45);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.45);

      // High telemetry blips
      [1200, 1600, 2400].forEach((freq, idx) => {
        const blip = ctx.createOscillator();
        const blipGain = ctx.createGain();
        blip.type = 'sine';
        blip.frequency.setValueAtTime(freq, now + 0.15 + idx * 0.08);
        blipGain.gain.setValueAtTime(0.2, now + 0.15 + idx * 0.08);
        blipGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15 + idx * 0.08 + 0.09);
        blip.connect(blipGain);
        blipGain.connect(ctx.destination);
        blip.start(now + 0.15 + idx * 0.08);
        blip.stop(now + 0.15 + idx * 0.08 + 0.1);
      });
    } else if (preset === 'billionaire') {
      // Cash register 'cha-ching' & champagne chime
      const bell = ctx.createOscillator();
      const bellGain = ctx.createGain();
      bell.type = 'triangle';
      bell.frequency.setValueAtTime(1760, now);
      bellGain.gain.setValueAtTime(0.4, now);
      bellGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

      bell.connect(bellGain);
      bellGain.connect(ctx.destination);
      bell.start(now);
      bell.stop(now + 0.5);

      const bell2 = ctx.createOscillator();
      const bell2Gain = ctx.createGain();
      bell2.type = 'sine';
      bell2.frequency.setValueAtTime(2637, now + 0.08);
      bell2Gain.gain.setValueAtTime(0.4, now + 0.08);
      bell2Gain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);

      bell2.connect(bell2Gain);
      bell2Gain.connect(ctx.destination);
      bell2.start(now + 0.08);
      bell2.stop(now + 0.65);
    } else if (preset === 'tech') {
      // Futuristic clean UI sweep
      const sweep = ctx.createOscillator();
      const sweepGain = ctx.createGain();
      sweep.type = 'sine';
      sweep.frequency.setValueAtTime(440, now);
      sweep.frequency.exponentialRampToValueAtTime(1320, now + 0.18);
      sweepGain.gain.setValueAtTime(0.3, now);
      sweepGain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      sweep.connect(sweepGain);
      sweepGain.connect(ctx.destination);
      sweep.start(now);
      sweep.stop(now + 0.22);
    } else {
      // Cyberpunk 80s synth chord
      [220, 330, 440].forEach((freq) => {
        const syn = ctx.createOscillator();
        const g = ctx.createGain();
        syn.type = 'sawtooth';
        syn.frequency.setValueAtTime(freq, now);
        g.gain.setValueAtTime(0.2, now);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        syn.connect(g);
        g.connect(ctx.destination);
        syn.start(now);
        syn.stop(now + 0.35);
      });
    }
  } catch (e) {
    console.debug('Audio error', e);
  }
}

// Hammond Stepladder squeak / spring sound
export function playHammondLadderSound(): void {
  if (!isAudioEnabled()) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Squeaky cartoon ascending spring
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.exponentialRampToValueAtTime(950, now + 0.25);
    osc.frequency.exponentialRampToValueAtTime(400, now + 0.4);

    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.45);
  } catch (e) {
    console.debug('Audio error', e);
  }
}

// Sub-Zero celebration fanfare
export function playSubZeroFanfare(): void {
  if (!isAudioEnabled()) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const notes = [440, 554.37, 659.25, 880];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.1);
      gain.gain.setValueAtTime(0.35, now + idx * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.5);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.1);
      osc.stop(now + idx * 0.1 + 0.55);
    });
  } catch (e) {
    console.debug('Audio error', e);
  }
}
