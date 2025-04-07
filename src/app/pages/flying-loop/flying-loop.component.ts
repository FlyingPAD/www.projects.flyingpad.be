// flying-loop.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { Character } from '../../models/character';
import { available_characters as availChars, displayed_characters as activeChars } from '../../data/app-data';
import { AudioLoopService } from '../../services/audio-loop.service';
import { PreloadService, Asset } from '../../services/preload.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-flying-loop',
    imports: [CommonModule, RouterModule],
    templateUrl: './flying-loop.component.html',
    styleUrls: ['./flying-loop.component.scss']
})
export class FlyingLoopComponent implements OnInit {
  audioSvc = inject(AudioLoopService);
  preloadSvc = inject(PreloadService);

  // Renommage pour plus de concision
  availChars: Character[] = availChars;
  activeChars: Character[] = activeChars;

  draggedChar: Character | null = null;
  isDragging = false;
  canStopAll = false;

  charCount = 7;
  minChars = 1;
  maxChars = 21;

  bgList: { url: string; type: 'image' | 'video' }[] = [
    { url: '/assets/flying-loop/back-01.jpg', type: 'image' },
    { url: '/assets/flying-loop/back-02.jpg', type: 'image' },
    { url: '/assets/flying-loop/back-03.jpg', type: 'image' },
    { url: '/assets/flying-loop/back-04.mp4', type: 'video' },
    { url: '/assets/flying-loop/back-05.mp4', type: 'video' }
  ];
  
  isLoading = true;
  progress = 0;
  currentBg = this.bgList[0];

  ngOnInit(): void {
    const assets: Asset[] = [
      ...this.bgList,
      ...[...this.availChars, ...this.activeChars].map(char => ({
        url: `/assets/flying-loop/${char.fileName}.png`,
        type: 'image' as 'image'
      }))
    ];
  
    this.preloadSvc.preloadAssets(assets).subscribe({
      next: (p: number) => {
        this.progress = p;
      },
      complete: () => {
        this.isLoading = false;
        console.log('All assets preloaded');
      },
      error: err => {
        console.error('Error preloading assets', err);
        this.isLoading = false;
      }
    });
  
    const trackNames = this.availChars.map(c => `${c.fileName}.mp3`);
    this.audioSvc.loadAllTracks(trackNames)
      .then(() => console.log('All tracks loaded'))
      .catch(error => console.error('Error loading tracks:', error));
  }  

  generateChars(): void {
    const existing = [...this.activeChars];

    if (this.charCount < existing.length) {
      const toRemove = existing.slice(this.charCount);
      toRemove.forEach(char => {
        if (char.assignedButton) {
          this.audioSvc.stopTrack(char.assignedButton);
        }
      });
    }

    this.activeChars = Array.from({ length: this.charCount }, (_, i) => {
      return existing[i] || new Character(i + 1, 'neutral', 'neutral-001', 'black', '');
    });

    this.updateCharWidth();
  }

  incCharCount(): void {
    if (this.charCount < this.maxChars) {
      this.charCount++;
      this.generateChars();
    }
  }

  decCharCount(): void {
    if (this.charCount > this.minChars) {
      this.charCount--;
      this.generateChars();
    }
  }

  updateCharWidth(): void {
    document.documentElement.style.setProperty('--character-count', this.charCount.toString());
  }

  changeBg(bg: { url: string; type: 'image' | 'video' }): void {
    if (this.currentBg === bg) return;
    this.currentBg = bg;
    console.log(`Background changed to: ${bg.url}`);
  }

  onDragStart(event: DragEvent, char: Character): void {
    this.draggedChar = char;
    this.isDragging = true;
    event.dataTransfer?.setData('text/plain', JSON.stringify(char));
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onDragEnd(): void {
    this.draggedChar = null;
    this.isDragging = false;
  }

  onDrop(event: DragEvent, index: number): void {
    const targetChar = this.activeChars[index];
    if (!this.draggedChar) {
      console.error('No button is being dragged.');
      return;
    }
    this.stopPreviousTrack(targetChar);
    this.assignChar(targetChar, this.draggedChar);
    this.playAssigned(targetChar);
    this.onDragEnd();
  }

  private stopPreviousTrack(char: Character): void {
    if (char.assignedButton) {
      this.audioSvc.stopTrack(char.assignedButton);
      console.log(`Stopped track for character: ${char.assignedButton}`);
    }
  }

  private assignChar(target: Character, source: Character): void {
    this.canStopAll = true;
    target.exiting = true;
    target.entering = false;

    setTimeout(() => {
      target.assignedButton = source.fileName;
      target.color = source.color;
      target.fileName = source.fileName;
      target.exiting = false;
      target.entering = true;
      setTimeout(() => target.entering = false, 500);
    }, 200);
  }

  private playAssigned(char: Character): void {
    setTimeout(() => {
      if (char.assignedButton) {
        this.audioSvc.playTrack(char.assignedButton);
        console.log(`Playing track: ${char.assignedButton}`);
        setTimeout(() => char.entering = false, 500);
      }
    }, 200);
  }

  stopAll(): void {
    if (!this.canStopAll) {
      console.log('Stop All is disabled because all characters are already neutral.');
      return;
    }
    this.canStopAll = false;
    this.audioSvc.stopAllTracks();
    this.activeChars.forEach(char => char.exiting = true);
    this.activeChars.forEach((char, i) => {
      setTimeout(() => {
        char.entering = true;
        char.resetCharacter();
      }, 100 * i);
      char.entering = false;
    });
  }

  resetChar(char: Character): void {
    if (!char.assignedButton) {
      console.log(`Character ${char.name} is already neutral, no reset needed.`);
      return;
    }
    this.audioSvc.stopTrack(char.assignedButton);
    char.exiting = true;
    char.entering = false;
    char.isMuted = false;
    char.isSolo = false;
    
    setTimeout(() => {
      char.resetCharacter();
      char.exiting = false;
      char.entering = true;
      setTimeout(() => char.entering = false, 500);
    }, 200);
  }

  isAssigned(char: Character): boolean {
    return this.activeChars.some(c => c.assignedButton === char.fileName);
  }
  
  muteChar(char: Character): void {
    if (!char.assignedButton) {
      console.warn(`Character ${char.name} is neutral, nothing to mute.`);
      return;
    }
    if (char['isMuted']) {
      this.audioSvc.unmuteTrack(char.assignedButton);
      char['isMuted'] = false;
      console.log(`Unmuted track: ${char.assignedButton}`);
    } else {
      this.audioSvc.muteTrack(char.assignedButton);
      char['isMuted'] = true;
      console.log(`Muted track: ${char.assignedButton}`);
    }
  }
  
  soloChar(char: Character): void {
    if (!char.assignedButton) {
      console.warn(`Character ${char.name} is neutral, cannot solo.`);
      return;
    }
    if (char['isSolo']) {
      this.audioSvc.unsoloTrack();
      char['isSolo'] = false;
      console.log(`Solo mode deactivated for track: ${char.assignedButton}`);
    } else {
      this.audioSvc.soloTrack(char.assignedButton);
      char['isSolo'] = true;
      console.log(`Solo mode activated for track: ${char.assignedButton}`);
    }
  }
  
  isSoloActive(): boolean {
    return this.activeChars.some(c => c.isSolo);
  }
}