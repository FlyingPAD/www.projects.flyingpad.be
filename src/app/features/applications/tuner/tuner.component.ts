import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';

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
  currentNote: string = '';
  targetNote: string = '';
  frequencyDifference: number = 0;

  standardTuning: { [note: string]: number } = {
    'E4': 329.63,
    'B3': 246.94,
    'G3': 196.00,
    'D3': 146.83,
    'A2': 110.00,
    'E2': 82.41
  };

  constructor() {
    this.audioContext = new AudioContext();
    this.analyser = this.audioContext.createAnalyser();
    this.analyser.fftSize = 2048;
    this.dataArray = new Float32Array(this.analyser.frequencyBinCount);
  }

  ngOnInit(): void {}

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
    this.currentNote = this.frequencyToNote(frequency);

    // Trouver la note standard la plus proche
    const closestNote = this.getClosestStandardTuning(frequency);
    this.targetNote = closestNote.note;
    this.frequencyDifference = frequency - closestNote.frequency;
  }

  frequencyToNote(frequency: number): string {
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const noteNumber = 12 * (Math.log(frequency / 440) / Math.log(2));
    const noteIndex = Math.round(noteNumber) % 12;
    const octave = Math.floor(noteNumber / 12) + 4;
    return notes[noteIndex] + octave;
  }

  getClosestStandardTuning(frequency: number): { note: string, frequency: number } {
    let closestNote = '';
    let minDifference = Infinity;
    for (const [note, standardFrequency] of Object.entries(this.standardTuning)) {
      const difference = Math.abs(frequency - standardFrequency);
      if (difference < minDifference) {
        minDifference = difference;
        closestNote = note;
      }
    }
    return { note: closestNote, frequency: this.standardTuning[closestNote] };
  }

  ngOnDestroy() {
    if (this.streamSource) {
      this.streamSource.disconnect();
      this.audioContext.close();
    }
  }
}
