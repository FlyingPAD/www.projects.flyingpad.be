import { Component, inject, OnInit } from '@angular/core'
import { Button } from '../../models/button'
import { Character } from '../../models/character'
import { BUTTONS, CHARACTERS } from '../../data/app-data'
import { AudioLoopService } from '../../services/audio-loop.service'

@Component({
  selector: 'app-flying-loop',
  standalone: true,
  templateUrl: './flying-loop.component.html',
  styleUrls: ['./flying-loop.component.scss']
})
export class FlyingLoopComponent implements OnInit {
  audioService = inject(AudioLoopService)

  buttons: Button[] = BUTTONS
  characters: Character[] = CHARACTERS

  draggedButton: Button | null = null
  isDragging = false
  canStopAllTracks = false;

  backgrounds: { url: string; type: 'image' | 'video' }[] = [
    { url: '/assets/flying-loop/back-01.jpg', type: 'image' },
    { url: '/assets/flying-loop/back-02.jpg', type: 'image' },
    { url: '/assets/flying-loop/back-03.jpg', type: 'image' },
    { url: '/assets/flying-loop/back-04.mp4', type: 'video' },
    { url: '/assets/flying-loop/back-05.mp4', type: 'video' }
  ];
  
  currentBackground: { url: string; type: 'image' | 'video' } = this.backgrounds[0];

  ngOnInit(): void {
    const trackNames = this.buttons.map(button => `${button.name}.mp3`)
    this.audioService.loadAllTracks(trackNames)
      .then(() => console.log('All tracks loaded'))
      .catch(error => console.error('Error loading tracks:', error))
  }

  changeBackground(background: { url: string; type: 'image' | 'video' }): void {
    if (this.currentBackground === background) {
      return; // Pas de changement si le fond est déjà affiché
    }
  
    this.currentBackground = background;
    console.log(`Background changed to: ${background.url}`);
  }

  onDragStart(event: DragEvent, button: Button): void {
    this.draggedButton = button
    this.isDragging = true
    event.dataTransfer?.setData('text/plain', JSON.stringify(button))
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault()
  }

  onDragEnd(): void {
    this.draggedButton = null
    this.isDragging = false
  }

  onDrop(event: DragEvent, characterIndex: number): void {
    const character = this.characters[characterIndex]

    if (!this.draggedButton) {
      console.error('No button is being dragged.')
      return
    }

    this.stopPreviousTrack(character)
    this.assignButtonToCharacter(character, this.draggedButton)
    this.playAssignedTrack(character)

    this.onDragEnd()
  }

  private stopPreviousTrack(character: Character): void {
    if (character.assignedButton) {
      this.audioService.stopTrack(character.assignedButton)
      console.log(`Stopped track for character: ${character.assignedButton}`)
    }
  }

  private assignButtonToCharacter(character: Character, button: Button): void {
    this.canStopAllTracks = true;
  
    character.exiting = true;
    character.entering = false;
  
    setTimeout(() => {
      character.assignedButton = button.name;
      character.color = button.color;
      character.fileName = button.fileName;
      character.exiting = false;
  
      character.entering = true;
  
      setTimeout(() => {
        character.entering = false;
      }, 500);
    }, 200);
  }

  private playAssignedTrack(character: Character): void {
    setTimeout(() => {
      if (character.assignedButton) {
        this.audioService.playTrack(character.assignedButton)
        console.log(`Playing track: ${character.assignedButton}`)

        setTimeout(() => {
          character.entering = false
        }, 500)
      }
    }, 200)
  }
  stopAllTracks(): void {
    if (!this.canStopAllTracks) {
      console.log('Stop All Tracks is disabled because all characters are already neutral.');
      return;
    }
  
    this.canStopAllTracks = false;
  
    this.audioService.stopAllTracks();
    this.characters.forEach(character => {
      character.exiting = true;
    });
  
    for (let index = 0; index < this.characters.length; index++) {
      const element = this.characters[index];
      setTimeout(() => {
        element.entering = true;
        element.resetCharacter();
      }, 100 * index);
      element.entering = false;
    }
  }  
  
  resetCharacter(character: Character): void {
    if (!character.assignedButton) {
      console.log(`Character ${character.name} is already neutral, no reset needed.`)
      return
    }
  
    this.audioService.stopTrack(character.assignedButton)
  
    character.exiting = true
    character.entering = false
  
    setTimeout(() => {
      character.resetCharacter()
  
      character.exiting = false
      character.entering = true
  
      setTimeout(() => {
        character.entering = false
      }, 500)
    }, 200)
  }
  
  isButtonAssigned(button: Button): boolean {
    return this.characters.some(character => character.assignedButton === button.name)
  }
}