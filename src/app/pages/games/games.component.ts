import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainerNotesComponent } from "../../features/games/trainer-notes/trainer-notes.component";
import { slideInAnimation } from '../../animations/animations';
import { DiceRollComponent } from "../../features/games/dice-roll/dice-roll.component";
import { HigherOrLowerComponent } from '../../features/games/higher-or-lower/higher-or-lower.component';

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [CommonModule, TrainerNotesComponent, DiceRollComponent, HigherOrLowerComponent],
  templateUrl: './games.component.html',
  styleUrl: './games.component.scss',
  animations: [slideInAnimation]
})
export class GamesComponent {
  currentGame: string = 'diceRoll'

  selectGame(gameName: string) {
    this.currentGame = gameName
  }
}