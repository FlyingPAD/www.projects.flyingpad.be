import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';

export interface Note {
  name: string;
  frequency: number;
  difference?: number;
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
  private streamSource: MediaStreamAudioSourceNode | null = null;
  currentNote: Note | null = null;
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
    this.analyser.fftSize = 2048;
    this.dataArray = new Float32Array(this.analyser.frequencyBinCount);

    // Charger les fichiers audio
    this.loadAudioFiles();
  }

  ngOnInit(): void {
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
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.streamSource = this.audioContext.createMediaStreamSource(stream);
      this.streamSource.connect(this.analyser);
      this.updatePitch();
    } catch (error) {
      console.error('Failed to access microphone:', error);
    }
  }

  updatePitch() {
    requestAnimationFrame(() => this.updatePitch());
    this.analyser.getFloatFrequencyData(this.dataArray);
    const maxIndex = this.dataArray.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);
    const frequency = this.audioContext.sampleRate * maxIndex / this.analyser.fftSize;
    const noteName = this.frequencyToNoteName(frequency);
    this.currentNote = { name: noteName, frequency };

    // Trouver la note standard la plus proche
    const closestNote = this.getClosestStandardTuning(frequency);
    this.targetNote = closestNote;
    this.currentNote.difference = frequency - closestNote.frequency;
  }

  frequencyToNoteName(frequency: number): string {
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const noteNumber = 12 * (Math.log(frequency / 440) / Math.log(2));
    const noteIndex = Math.round(noteNumber) % 12;
    const octave = Math.floor(noteNumber / 12) + 4;
    return notes[noteIndex] + octave;
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
