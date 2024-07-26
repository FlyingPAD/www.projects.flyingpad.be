import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TunerService {
  private audioContext: AudioContext;
  private analyser: AnalyserNode;
  private microphone: MediaStreamAudioSourceNode | null = null;

  constructor() {
    this.audioContext = new AudioContext();
    this.analyser = this.audioContext.createAnalyser();
    this.analyser.fftSize = 2048;  // Taille de la fenêtre pour la FFT
  }

  async startTuning(): Promise<void> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.microphone = this.audioContext.createMediaStreamSource(stream);
      this.microphone.connect(this.analyser);
      this.updatePitch();
    } catch (error) {
      console.error('Failed to access microphone:', error);
    }
  }

  updatePitch() {
    const dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(dataArray);

    // Code pour calculer la fréquence ici
    // ...

    requestAnimationFrame(() => this.updatePitch());
  }
}