import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioLoopService {
  private ctx: AudioContext;
  private tracks: { [key: string]: AudioBuffer } = {};
  private sources: { [key: string]: AudioBufferSourceNode } = {};
  private gainNodes: { [key: string]: GainNode } = {};
  private bpm = 105;
  private measureDuration: number;
  private loopStart: number | null = null;
  private loopDuration: number;

  constructor() {
    this.ctx = new AudioContext();
    this.measureDuration = (60 / this.bpm) * 4;
    this.loopDuration = this.measureDuration * 4;
  }

  async loadAllTracks(trackNames: string[]): Promise<void> {
    for (const name of trackNames) {
      const fileName = name.endsWith('.mp3') ? name : `${name}.mp3`;
      await this.loadTrack(`assets/audio/${fileName}`, fileName);
    }
    console.log('Tracks loaded:', Object.keys(this.tracks));
  }

  private async loadTrack(url: string, name: string): Promise<void> {
    try {
      console.log(`Loading: ${url}`);
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
      const buffer = await response.arrayBuffer();
      const audioBuffer = await this.ctx.decodeAudioData(buffer);
      this.tracks[name] = audioBuffer;
      // Création d'un gain node pour le contrôle du volume
      const gainNode = this.ctx.createGain();
      gainNode.gain.value = 1;
      gainNode.connect(this.ctx.destination);
      this.gainNodes[name] = gainNode;
      console.log(`Loaded: ${name}`);
    } catch (err) {
      console.error(`Error loading track ${name}:`, err);
    }
  }

  private startLoop(name: string): void {
    const buffer = this.tracks[name];
    if (!buffer) return;
    const currentTime = this.ctx.currentTime;
    const elapsed = (currentTime - (this.loopStart ?? 0)) % this.loopDuration;
    const source = this.ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;
    source.loopStart = 0;
    source.loopEnd = this.loopDuration;
    // Connexion via le gain node associé
    source.connect(this.gainNodes[name]);
    source.start(currentTime, elapsed);
    this.sources[name] = source;
    console.log(`Started ${name} with offset ${elapsed}`);
  }

  public playTrack(name: string): void {
    const trackName = `${name}.mp3`;
    if (!this.tracks[trackName]) {
      console.warn(`${trackName} not loaded.`);
      return;
    }
    this.startLoop(trackName);
    console.log(`Playing ${trackName}`);
  }

  public stopTrack(name: string): void {
    const trackName = `${name}.mp3`;
    const src = this.sources[trackName];
    if (src) {
      src.stop();
      delete this.sources[trackName];
      console.log(`Stopped ${trackName}`);
    } else {
      console.warn(`${trackName} is not playing.`);
    }
  }

  public stopAllTracks(): void {
    Object.keys(this.sources).forEach(name => {
      const src = this.sources[name];
      if (src) {
        src.stop();
        delete this.sources[name];
        console.log(`Stopped ${name}`);
      }
    });
    this.loopStart = null;
    console.log('All tracks stopped.');
  }

  public muteTrack(name: string): void {
    const trackName = `${name}.mp3`;
    const gain = this.gainNodes[trackName];
    if (gain) {
      gain.gain.value = 0;
      console.log(`Muted ${trackName}`);
    } else {
      console.warn(`Gain node for ${trackName} not found.`);
    }
  }

  public soloTrack(name: string): void {
    const trackName = `${name}.mp3`;
    Object.keys(this.gainNodes).forEach(key => {
      this.gainNodes[key].gain.value = key === trackName ? 1 : 0;
    });
    console.log(`Solo mode: Only ${trackName} is active.`);
  }

  public unmuteTrack(name: string): void {
    const trackName = `${name}.mp3`;
    const gain = this.gainNodes[trackName];
    if (gain) {
      gain.gain.value = 1;
      console.log(`Unmuted ${trackName}`);
    } else {
      console.warn(`Gain node for ${trackName} not found.`);
    }
  }
  
  public unsoloTrack(): void {
    Object.keys(this.gainNodes).forEach(key => {
      this.gainNodes[key].gain.value = 1;
    });
    console.log('Solo mode deactivated: all tracks active.');
  }
}