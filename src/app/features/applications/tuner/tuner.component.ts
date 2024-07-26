import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-tuner',
  standalone: true,
  imports: [],
  templateUrl: './tuner.component.html',
  styleUrl: './tuner.component.scss',
})
export class TunerComponent implements OnInit, OnDestroy {
  private audioContext: AudioContext;
  private analyser: AnalyserNode;
  private dataArray: Float32Array;
  private streamSource: MediaStreamAudioSourceNode | null = null;
  currentNote: string = '';

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
  }

  frequencyToNote(frequency: number): string {
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const noteNumber = 12 * (Math.log(frequency / 440) / Math.log(2));
    const noteIndex = Math.round(noteNumber) % 12;
    return notes[noteIndex];
  }

  ngOnDestroy() {
    if (this.streamSource) {
      this.streamSource.disconnect();
      this.audioContext.close();
    }
  }
}
