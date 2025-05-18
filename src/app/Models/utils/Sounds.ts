'use client';
import { Howl, Howler } from 'howler';

type SoundItem = {
  name: string;
  minDelta: number;
  velocityMin: number;
  velocityMultiplier: number;
  volumeMin: number;
  volumeMax: number;
  rateMin: number;
  rateMax: number;
  lastTime: number;
  sounds: Howl[];
};

const settings = [
  {
    name: 'test',
    minDelta: 0.1,
    velocityMin: 0.5,
    velocityMultiplier: 1,
    volumeMin: 0.5,
    volumeMax: 1,
    rateMin: 0.5,
    rateMax: 1,
    sounds: [],
  },
] as const satisfies readonly (Omit<SoundItem, 'lastTime' | 'sounds'> & { sounds: string[] })[];

class Sounds {
  readonly items: SoundItem[];
  muted: boolean = false;
  constructor(_settings: typeof settings) {
    this.items = this.createSoundItems(_settings);
    this.setMasterVolume();
    this.setMute();
  }

  private createSoundItems = (_settings: typeof settings): SoundItem[] =>
    _settings.map((setting) => ({
      ...setting,
      lastTime: 0,
      sounds: setting.sounds.map((sound) => new Howl({ src: [sound] })),
    }));

  setMasterVolume = (volume: number = 0.5): void => {
    Howler.volume(volume);
  };

  mountMuteHanlder = (): void => {
    window.addEventListener('keydown', (event) => {
      if (event.key === 'm') {
        this.muted = !this.muted;
        this.setMute();
      }
    });
  };

  setMute = (): void => {
    Howler.mute(this.muted);
  };

  play = (name: string, velocity: number = 0): void => {
    const item = this.items.find((item) => item.name === name);
    if (!item) return;
    const currentTime = Date.now();

    if (
      currentTime - item.lastTime > item.minDelta &&
      (item.velocityMin === 0 || velocity > item.velocityMin)
    ) {
      const sound = item.sounds[Math.floor(Math.random() * item.sounds.length)];

      let volume = Math.min(
        Math.max((velocity - item.velocityMin) * item.velocityMultiplier, item.volumeMin),
        item.volumeMax
      );
      volume = Math.pow(volume, 2);
      sound.volume(volume);

      const rateAmplitude = item.rateMax - item.rateMin;
      sound.rate(item.rateMin + Math.random() * rateAmplitude);

      sound.play();

      item.lastTime = currentTime;
    }
  };
}

const sounds = new Sounds(settings);
export default sounds;
