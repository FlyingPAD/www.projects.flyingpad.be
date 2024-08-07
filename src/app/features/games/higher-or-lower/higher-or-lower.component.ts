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
  message: string = 'Select your level';
  level: string = '0';
  moves: number = 0;
  title: boolean = true;
  configuration: boolean = false;
  gameStart: boolean = false;
  gameEnd: boolean = false;

  config(): void {
    this.message = 'Select your level'
    this.title = false;
    this.configuration = true;
    this.gameStart = false
    this.gameEnd = false
  }

  generateRandom(): void {
    const min = 1;
    const max = this.refLevel;
    this.valueToFind = Math.floor(Math.random() * (max - min + 1)) + min;
  }

  process(): void {
    if (this.userInputValue > this.valueToFind) {
      this.message = 'Lower';
    } else if (this.userInputValue < this.valueToFind) {
      this.message = 'Higher';
    } else {
      this.message = 'Correct!';
      this.checkGameStatus();
    }
    this.moves += 1;
  }

  startGame(): void {
    if (this.level === '0') {
      this.message = 'You need to select a level first!';
      return;
    }
    this.generateRandom();
    this.configuration = false
    this.gameStart = true;
    this.message = "Let's Go!!!";
    this.moves = 0;
  }

  checkGameStatus(): void {
    if (this.valueToFind === this.userInputValue) {
      this.message = 'VICTORY!';
      this.gameStart = false;
      this.gameEnd = true;
    }
  }

  selectLevel(level: number): void {
    if (level === 1) {
      this.refLevel = 10;
      this.level = '1';
    }
    if (level === 2) {
      this.refLevel = 100;
      this.level = '2';
    }
    if (level === 3) {
      this.refLevel = 1000;
      this.level = '3';
    }
  }
}
