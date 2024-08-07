import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonTopComponent } from '../../../components/button-top/button-top.component';

@Component({
  selector: 'app-higher-or-lower',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonTopComponent],
  templateUrl: './higher-or-lower.component.html',
  styleUrls: ['./higher-or-lower.component.scss']
})
export class HigherOrLowerComponent {
  refLevel: number = 10;
  valueToFind: number = 0;
  userInputValue: number = 0;
  message: string = 'Please select your level';
  gameStart: boolean = false;
  level: string = '0';
  levelSelected: boolean = false;
  moves: number = 0;
  showTitleScreen: boolean = true;

  generateRandom(): void {
    const min = 1;
    const max = this.refLevel;
    this.valueToFind = Math.floor(Math.random() * (max - min + 1)) + min;
  }

  process() {
    if (this.userInputValue > this.valueToFind) {
      this.message = 'Lower';
    } else if (this.userInputValue < this.valueToFind) {
      this.message = 'Higher';
    } else {
      this.message = 'Correct!';
    }
    this.moves += 1;
    this.checkGameStatus();
  }

  startGame() {
    if (this.level === '0') {
      this.message = 'You need to select a level first!';
      return;
    }
    this.generateRandom();
    this.gameStart = true;
    this.message = 'Let\'s Go!!!';
    this.moves = 0;
  }

  checkGameStatus() {
    if (this.valueToFind === this.userInputValue) {
      this.message = 'VICTORY!';
      this.gameStart = false;
    }
  }

  selectLevel(level: number): void {
    if (level === 1) {
      this.refLevel = 10;
      this.level = '1';
    } else if (level === 2) {
      this.refLevel = 100;
      this.level = '2';
    } else if (level === 3) {
      this.refLevel = 1000;
      this.level = '3';
    }
    this.levelSelected = true;
    this.gameStart = false;
    this.message = `Level ${this.level}`;
  }

  confirmLevel() {
    this.levelSelected = false;
    this.message = `Level ${this.level}. Let's start!`;
    this.startGame();
  }

  goToLevelSelection() {
    this.showTitleScreen = false;
    this.message = 'Please select your level';
  }
}
