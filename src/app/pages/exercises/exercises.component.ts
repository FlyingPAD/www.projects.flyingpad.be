import { Component } from '@angular/core';
import { LeapYearComponent } from "../../features/exercises/leap-year/leap-year.component";
import { CommonModule } from '@angular/common';
import { CountdownComponent } from '../../features/exercises/countdown/countdown.component';
import { ChordWheelComponent } from '../../features/exercises/chord-wheel/chord-wheel.component';
import { slideInAnimation } from '../../animations/animations';
import { CircleOfFifthsComponent } from '../../features/exercises/circle-of-fifths/circle-of-fifths.component';
import { ConvertorsComponent } from '../../features/exercises/convertors/convertors.component';

@Component({
  selector: 'app-exercises',
  standalone: true,
  imports: [CommonModule, CountdownComponent, LeapYearComponent, ChordWheelComponent, CircleOfFifthsComponent, ConvertorsComponent],
  templateUrl: './exercises.component.html',
  styleUrl: './exercises.component.scss',
  animations: [slideInAnimation]
})
export class ExercisesComponent {
  currentExercise: string = 'countdown'

  selectTool(exerciseName: string) {
    this.currentExercise = exerciseName
  }
}