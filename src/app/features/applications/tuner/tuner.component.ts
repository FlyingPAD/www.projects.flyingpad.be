import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';

export interface Note {
  name: string;
  frequency: number;
}

@Component({
  selector: 'app-tuner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tuner.component.html',
  styleUrls: ['./tuner.component.scss'],
})
export class TunerComponent implements OnInit, OnDestroy {
  private audioContext: AudioContext;
  private analyser: AnalyserNode;
  private dataArray: Float32Array;
  private bufferLength: number;
  private streamSource: MediaStreamAudioSourceNode | null = null;
  currentFrequency: number = 0;
  frequencyDifference: number = 0;
  targetNote: Note | null = null;
  audioBuffers: { [note: string]: AudioBuffer } = {};

  standardTuning: Note[] = [
    { name: 'E2', frequency: 82.41 },
    { name: 'A2', frequency: 110.00 },
    { name: 'D3', frequency: 146.83 },
    { name: 'G3', frequency: 196.00 },
    { name: 'B3', frequency: 246.94 },
    { name: 'E4', frequency: 329.63 }
  ];

  constructor() {
    this.audioContext = new AudioContext();
    this.analyser = this.audioContext.createAnalyser();
    this.analyser.fftSize = 2048; // Taille de la FFT
    this.bufferLength = this.analyser.fftSize;
    this.dataArray = new Float32Array(this.bufferLength);

    this.loadAudioFiles();
  }

  ngOnInit(): void {
    console.log('ngOnInit called');
    this.startTuning();
  }

  async loadAudioFiles() {
    const noteFilenames = {
      'E4': 'E4.mp3',
      'B3': 'B3.mp3',
      'G3': 'G3.mp3',
      'D3': 'D3.mp3',
      'A2': 'A2.mp3',
      'E2': 'E2.mp3'
    };

    for (const [note, filename] of Object.entries(noteFilenames)) {
      const response = await fetch(`assets/sounds/${filename}`);
      const arrayBuffer = await response.arrayBuffer();
      this.audioBuffers[note] = await this.audioContext.decodeAudioData(arrayBuffer);
    }
  }

  async startTuning() {
    try {
      console.log('Requesting microphone access...');
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log('Microphone access granted');
      this.streamSource = this.audioContext.createMediaStreamSource(stream);
      this.streamSource.connect(this.analyser);
      this.updatePitch();
    } catch (error) {
      console.error('Failed to access microphone:', error);
    }
  }

  updatePitch() {
    requestAnimationFrame(() => this.updatePitch());
    this.analyser.getFloatTimeDomainData(this.dataArray);
    this.currentFrequency = this.yin(this.dataArray, this.audioContext.sampleRate);
    if (this.currentFrequency !== -1) {
      this.targetNote = this.getClosestStandardTuning(this.currentFrequency);
      this.frequencyDifference = this.currentFrequency - this.targetNote.frequency;
      console.log('Current Frequency:', this.currentFrequency);
      console.log('Target Note:', this.targetNote.name);
      console.log('Frequency Difference:', this.frequencyDifference);
    }
  }

  yin(buffer: Float32Array, sampleRate: number): number {
    const threshold = 0.1;
    const tau_max = buffer.length / 2;
    const yinBuffer = new Float32Array(tau_max);
    let tau, j;
    let runningSum = 0;
    
    yinBuffer[0] = 1;

    for (tau = 1; tau < tau_max; tau++) {
      yinBuffer[tau] = 0;
      for (j = 0; j < tau_max; j++) {
        yinBuffer[tau] += Math.pow(buffer[j] - buffer[j + tau], 2);
      }
      runningSum += yinBuffer[tau];
      yinBuffer[tau] *= tau / runningSum;
    }

    let minTau = -1;
    for (tau = 1; tau < tau_max; tau++) {
      if (yinBuffer[tau] < threshold) {
        while (tau + 1 < tau_max && yinBuffer[tau + 1] < yinBuffer[tau]) {
          tau++;
        }
        minTau = tau;
        break;
      }
    }

    if (minTau === -1) {
      return -1;
    }

    let betterTau;
    const x1 = yinBuffer[minTau - 1];
    const x2 = yinBuffer[minTau];
    const x3 = yinBuffer[minTau + 1];

    if (x1 < x3) {
      betterTau = minTau - 1 + (x1 - x2) / (x1 - 2 * x2 + x3);
    } else {
      betterTau = minTau + (x3 - x2) / (x1 - 2 * x2 + x3);
    }

    return sampleRate / betterTau;
  }

  getClosestStandardTuning(frequency: number): Note {
    let closestNote: Note | null = null;
    let minDifference = Infinity;
    for (const note of this.standardTuning) {
      const difference = Math.abs(frequency - note.frequency);
      if (difference < minDifference) {
        minDifference = difference;
        closestNote = note;
      }
    }
    return closestNote!;
  }

  playNote(noteName: string) {
    if (this.audioBuffers[noteName]) {
      const source = this.audioContext.createBufferSource();
      source.buffer = this.audioBuffers[noteName];
      source.connect(this.audioContext.destination);
      source.start();
    }
  }

  ngOnDestroy() {
    if (this.streamSource) {
      this.streamSource.disconnect();
      this.audioContext.close();
    }
  }
}
