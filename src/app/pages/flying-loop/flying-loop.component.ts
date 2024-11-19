import { Component, inject, OnInit } from '@angular/core'
import { Button } from '../../models/button'
import { Character } from '../../models/character'
import { BUTTONS, CHARACTERS } from '../../data/app-data'
import { AudioLoopService } from '../../services/audio-loop.service'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-flying-loop',
  standalone: true,
  imports: [CommonModule],
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

  characterCount: number = 7; // Valeur initiale
  minCharacters: number = 1;
  maxCharacters: number = 10;

  backgrounds: { url: string; type: 'image' | 'video' }[] = [
    { url: '/assets/flying-loop/back-01.jpg', type: 'image' },
    { url: '/assets/flying-loop/back-02.jpg', type: 'image' },
    { url: '/assets/flying-loop/back-03.jpg', type: 'image' },
    { url: '/assets/flying-loop/back-04.mp4', type: 'video' },
    { url: '/assets/flying-loop/back-05.mp4', type: 'video' }
  ];

  isLoading: boolean = true
  currentBackground: { url: string; type: 'image' | 'video' } = this.backgrounds[0];

  ngOnInit(): void {
    this.preloadAssets(); // Précharge toutes les ressources
    const trackNames = this.buttons.map(button => `${button.name}.mp3`)
    this.audioService.loadAllTracks(trackNames)
      .then(() => console.log('All tracks loaded'))
      .catch(error => console.error('Error loading tracks:', error))
  }

  generateCharacters(): void {
    const existingCharacters = [...this.characters]; // Sauvegarde de l'état actuel
  
    // Réinitialiser les personnages supprimés
    if (this.characterCount < existingCharacters.length) {
      const charactersToRemove = existingCharacters.slice(this.characterCount);
      charactersToRemove.forEach(character => {
        if (character.assignedButton) {
          this.audioService.stopTrack(character.assignedButton); // Stopper la musique
        }
      });
    }
  
    // Générer les nouveaux personnages
    this.characters = Array.from({ length: this.characterCount }, (_, index) => {
      const existingCharacter = existingCharacters[index]; // Récupérer l'existant si possible
      if (existingCharacter) {
        return existingCharacter; // Conserver les données existantes
      }
      // Sinon, créer un nouveau personnage neutre
      return new Character(index + 1, 'neutral', 'neutral-001', 'black');
    });
  
    this.updateCharacterWidth(); // Met à jour la largeur dynamique
  }

  increaseCharacterCount(): void {
    if (this.characterCount < this.maxCharacters) {
      this.characterCount++;
      this.generateCharacters(); // Régénère les personnages uniquement si nécessaire
    }
  }
  
  decreaseCharacterCount(): void {
    if (this.characterCount > this.minCharacters) {
      this.characterCount--;
      this.generateCharacters(); // Régénère les personnages uniquement si nécessaire
    }
  }

  updateCharacterWidth(): void {
    document.documentElement.style.setProperty('--character-count', this.characterCount.toString());
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

  preloadAssets(): void {
    const preloadPromises: Promise<void>[] = [];

    // Précharger les backgrounds
    this.backgrounds.forEach(background => {
      preloadPromises.push(new Promise<void>(resolve => {
        if (background.type === 'image') {
          const img = new Image();
          img.src = background.url;
          img.onload = () => resolve();
        } else if (background.type === 'video') {
          const video = document.createElement('video');
          video.src = background.url;
          video.onloadeddata = () => resolve();
        }
      }));
    });

    // Précharger les images des personnages
    this.characters.forEach(character => {
      preloadPromises.push(new Promise<void>(resolve => {
        const img = new Image();
        img.src = `/assets/flying-loop/${character.fileName}.png`;
        img.onload = () => resolve();
      }));
    });

    // Marquer le préchargement comme terminé une fois toutes les ressources chargées
    Promise.all(preloadPromises).then(() => {
      this.isLoading = false; // Chargement terminé
      console.log('All assets preloaded');
    });
  }

}