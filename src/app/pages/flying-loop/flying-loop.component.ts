import { Component, inject, OnInit } from '@angular/core';
import { Button } from '../../interfaces/button';
import { Character } from '../../interfaces/character';
import { BUTTONS, CHARACTERS } from '../../data/app-data';
import { AudioLoopService } from '../../services/audio-loop.service';

@Component({
  selector: 'app-flying-loop',
  standalone: true,
  templateUrl: './flying-loop.component.html',
  styleUrls: ['./flying-loop.component.scss'],
})
export class FlyingLoopComponent implements OnInit {
  audioService = inject(AudioLoopService)

  buttons: Button[] = BUTTONS
  characters: Character[] = CHARACTERS

  draggedButton: Button | null = null
  isDragging = false

  ngOnInit(): void {
    this.preloadImages()
    const trackNames = this.buttons.map((button) => `${button.name}.mp3`)
    this.audioService.loadAllTracks(trackNames).then(() => {
      console.log('All tracks loaded')
    }).catch((error) => {
      console.error('Error loading tracks:', error)
    })
  }

  preloadImages(): void {
    const allImages = [
      ...this.buttons.map((button) => `assets/${button.fileName}.png`),
      ...this.characters.map((character) => `assets/${character.fileName}.png`),
      'assets/background.jpg',
    ]

    allImages.forEach((imagePath) => {
      const img = new Image()
      img.src = imagePath
      img.onerror = () => console.warn(`Failed to preload image: ${imagePath}`)
      console.log(`Préchargement de l'image : ${imagePath}`)
    })
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

    if (this.draggedButton) {
      if (character.assignedButton) {
        this.audioService.toggleTrack(character.assignedButton, false)
        this.releaseButton(character.assignedButton)
      }

      character.assignedButton = this.draggedButton.name
      character.color = this.draggedButton.color
      character.fileName = this.draggedButton.fileName

      this.audioService.toggleTrack(this.draggedButton.name, true)

      console.log(
        `Bouton ${this.draggedButton.name} appliqué au personnage ${characterIndex}`
      )
    }

    this.onDragEnd()
  }

  releaseButton(buttonName: string): void {
    const character = this.characters.find(
      (char) => char.assignedButton === buttonName
    )

    if (character) {
      character.assignedButton = undefined
      character.color = 'black'
      character.fileName = 'neutral-001'

      this.audioService.toggleTrack(buttonName, false)
      console.log(`Track ${buttonName} stopped`)
    }
  }

  isButtonAssigned(button: Button): boolean {
    return this.characters.some(
      (character) => character.assignedButton === button.name
    )
  }

  stopAllTracks(): void {
    this.audioService.stopAllTracks()
    this.characters.forEach((character) => {
      character.assignedButton = undefined
      character.color = 'black'
      character.fileName = 'neutral-001'
    })
    console.log('All tracks stopped and characters reset.')
  }
}