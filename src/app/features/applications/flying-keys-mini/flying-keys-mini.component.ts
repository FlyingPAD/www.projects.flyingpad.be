import { Component, HostListener, inject } from '@angular/core';
import { AudioService } from '../../../services/audio.service';
import { Router } from '@angular/router';
import { KeysService } from '../../../services/keys.service';
import { KeyStation } from '../../../models/key-station';
import { Note } from '../../../models/note';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-flying-keys-mini',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './flying-keys-mini.component.html',
  styleUrl: './flying-keys-mini.component.scss'
})
export class FlyingKeysMiniComponent 
{
  #audioService = inject(AudioService)
  keysService = inject(KeysService)
  #router = inject(Router)

  // Station

  keyStation :       KeyStation   = new KeyStation(this.#audioService, this.keysService)
  currentVolume :    number       = 0.2
  showNotes :        boolean      = true

  CKeyPressed :      boolean  = false
  CSharpKeyPressed : boolean  = false
  DKeyPressed :      boolean  = false
  DSharpKeyPressed : boolean  = false
  EKeyPressed :      boolean  = false
  FKeyPressed :      boolean  = false
  FSharpKeyPressed : boolean  = false
  GKeyPressed :      boolean  = false
  GSharpKeyPressed : boolean  = false
  AKeyPressed :      boolean  = false
  ASharpKeyPressed : boolean  = false
  BKeyPressed :      boolean  = false
  
  playNote( keyStation : KeyStation, note : Note, durationInSeconds : number )
  {
    keyStation.playNote(note, durationInSeconds, this.currentVolume)
  }

  triggerShowNotesMaster()
  {
    this.showNotes = !this.showNotes
  }

  triggerShowNotes(station : KeyStation)
  {
    station.showNotes = !station.showNotes
  }
  triggerShowNotesFr(station : KeyStation)
  {
    station.showNotesFr = !station.showNotesFr
  }
  triggerShowEnharmony(station : KeyStation)
  {
    station.showEnharmony = !station.showEnharmony
  }
  triggerShowFrequencies(station : KeyStation)
  {
    station.showFrequency = !station.showFrequency
  }

  volumeUp()
  {
    if(this.currentVolume >= 1) this.currentVolume = 1
    else this.currentVolume += 0.1
  }
  volumeDown()
  {
    if(this.currentVolume <= 0) this.currentVolume = 0
    else this.currentVolume -= 0.1
  }

  @HostListener('window:keydown', ['$event'])
  onKeyPress(event: KeyboardEvent) 
  {
    switch (event.code) 
    {
      case 'Backspace':
        this.#router.navigateByUrl('/tools')
        break
      case 'Enter':
        this.triggerShowNotesMaster()
        break
      case 'NumpadAdd':
        this.volumeUp()
        break
      case 'NumpadSubtract':
        this.volumeDown()
        break
      case 'KeyD':
        this.lightKey(this.keyStation.notes[0])
        this.playNote(this.keyStation, this.keyStation.notes[0], 0.5)
        break
      case 'KeyR':
        this.lightKey(this.keyStation.notes[1])
        this.playNote(this.keyStation, this.keyStation.notes[1], 0.5)
        break
      case 'KeyF':
        this.lightKey(this.keyStation.notes[2])
        this.playNote(this.keyStation, this.keyStation.notes[2], 0.5)
        break
      case 'KeyT':
        this.lightKey(this.keyStation.notes[3])
        this.playNote(this.keyStation, this.keyStation.notes[3], 0.5)
        break
      case 'KeyG':
        this.lightKey(this.keyStation.notes[4])
        this.playNote(this.keyStation, this.keyStation.notes[4], 0.5)
        break
      case 'KeyH':
        this.lightKey(this.keyStation.notes[5])
        this.playNote(this.keyStation, this.keyStation.notes[5], 0.5)
        break
      case 'KeyU':
        this.lightKey(this.keyStation.notes[6])
        this.playNote(this.keyStation, this.keyStation.notes[6], 0.5)
        break
      case 'KeyJ':
        this.lightKey(this.keyStation.notes[7])
        this.playNote(this.keyStation, this.keyStation.notes[7], 0.5)
        break
      case 'KeyI':
        this.lightKey(this.keyStation.notes[8])
        this.playNote(this.keyStation, this.keyStation.notes[8], 0.5)
        break
      case 'KeyK':
        this.lightKey(this.keyStation.notes[9])
        this.playNote(this.keyStation, this.keyStation.notes[9], 0.5)
        break
      case 'KeyO':
        this.lightKey(this.keyStation.notes[10])
        this.playNote(this.keyStation, this.keyStation.notes[10], 0.5)
        break
      case 'KeyL':
        this.lightKey(this.keyStation.notes[11])
        this.playNote(this.keyStation, this.keyStation.notes[11], 0.5)
        break
    }
  }

  lightKey(note : Note) 
  { 
    note.pressed = true
    setTimeout(() => 
    { 
      note.pressed = false 
    }, 75) 
  }
}
