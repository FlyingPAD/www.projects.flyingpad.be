import { Component } from '@angular/core';
import { StoryComponent } from '../../features/games/story/story.component';
import { CommonModule } from '@angular/common';
import { TrainerNotesComponent } from "../../features/games/trainer-notes/trainer-notes.component";
import { slideInAnimation } from '../../animations/animations';
import { DiceRollComponent } from "../../features/games/dice-roll/dice-roll.component";

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [CommonModule, StoryComponent, TrainerNotesComponent, DiceRollComponent],
  templateUrl: './games.component.html',
  styleUrl: './games.component.scss',
  animations: [slideInAnimation]
})
export class GamesComponent {
  currentGame: string = 'trainer'

  selectGame(gameName: string) {
    this.currentGame = gameName
  }
}