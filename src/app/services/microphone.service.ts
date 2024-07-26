import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MicrophoneService {
  private mediaRecorder: MediaRecorder | null = null;

  constructor() { }

  startRecording(): Promise<void> {
    return new Promise((resolve, reject) => {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          this.mediaRecorder = new MediaRecorder(stream);
          this.mediaRecorder.ondataavailable = this.handleDataAvailable;
          this.mediaRecorder.start();
          console.log('Enregistrement commencé');
          resolve();
        })
        .catch(error => {
          console.error('Erreur lors de l’accès au microphone: ', error);
          reject(error);
        });
    });
  }

  stopRecording() {
    if (this.mediaRecorder) {
      this.mediaRecorder.stop();
      console.log('Enregistrement terminé');
    }
  }

  private handleDataAvailable(event: BlobEvent) {
    // Traiter les données ici ou les envoyer à un backend
    console.log(event.data);
  }
}
