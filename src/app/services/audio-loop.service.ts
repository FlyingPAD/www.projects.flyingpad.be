import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioLoopService {
  private audioContext: AudioContext;
  private tracks: { [key: string]: AudioBuffer } = {};
  private sources: { [key: string]: AudioBufferSourceNode } = {};
  private bpm = 105;
  private measureDuration: number;
  private loopStartTime: number | null = null;
  private loopDuration: number;

  constructor() {
    this.audioContext = new AudioContext();
    this.measureDuration = (60 / this.bpm) * 4;
    this.loopDuration = this.measureDuration * 4;
  }

  async loadAllTracks(trackNames: string[]): Promise<void> {
    for (const trackName of trackNames) {
      const formattedTrackName = trackName.endsWith('.mp3') ? trackName : `${trackName}.mp3`;
      await this.loadTrack(`assets/audio/${formattedTrackName}`, formattedTrackName);
    }
    console.log('Final tracks:', Object.keys(this.tracks));
  }

  private async loadTrack(url: string, trackName: string): Promise<void> {
    try {
      console.log(`Loading track: ${url}`);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error loading ${url}: Status ${response.status}`);
      }
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
      this.tracks[trackName] = audioBuffer;
      console.log(`Loaded track: ${trackName}`);
    } catch (error) {
      console.error(`Failed to load track ${trackName}:`, error);
    }
  }

  playTrackForCharacter(trackName: string): void {
    const formattedTrackName = `${trackName}.mp3`;
    if (!this.tracks[formattedTrackName]) {
      this.loadTrack(`assets/audio/${formattedTrackName}`, formattedTrackName)
        .then(() => this.startLoop(formattedTrackName))
        .catch((err) => console.error(`Failed to load and play ${formattedTrackName}`, err));
    } else {
      this.startLoop(formattedTrackName);
    }
  }

  private startLoop(trackName: string): void {
    const trackBuffer = this.tracks[trackName];
    if (!trackBuffer) return;

    const currentTime = this.audioContext.currentTime;
    const elapsedTime = (currentTime - (this.loopStartTime ?? 0)) % this.loopDuration;

    const loopSource = this.audioContext.createBufferSource();
    loopSource.buffer = trackBuffer;
    loopSource.loop = true;
    loopSource.loopStart = 0;
    loopSource.loopEnd = this.loopDuration;
    loopSource.connect(this.audioContext.destination);

    loopSource.start(this.audioContext.currentTime, elapsedTime);
    this.sources[trackName] = loopSource;

    console.log(`Track ${trackName} started with offset: ${elapsedTime}`);
  }

  private stopTrack(trackName: string): void {
    const source = this.sources[trackName];
    if (source) {
      source.stop();
      delete this.sources[trackName];
      console.log(`Track ${trackName} stopped.`);
    }
  }

  toggleTrack(trackName: string, isEnabled: boolean): void {
    const formattedTrackName = `${trackName}.mp3`;

    if (isEnabled) {
      if (!this.tracks[formattedTrackName]) {
        console.warn(`Track ${formattedTrackName} is not loaded.`);
        return;
      }
      this.startLoop(formattedTrackName);
      console.log(`Track ${formattedTrackName} started.`);
    } else {
      this.stopTrack(formattedTrackName);
      console.log(`Track ${formattedTrackName} stopped.`);
    }
  }

  stopAllTracks(): void {
    Object.keys(this.sources).forEach((trackName) => {
      const source = this.sources[trackName];
      if (source) {
        source.stop();
        delete this.sources[trackName];
        console.log(`Track ${trackName} stopped.`);
      }
    });

    this.loopStartTime = null;
    console.log('All tracks stopped.');
  }
}