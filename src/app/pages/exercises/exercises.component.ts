import { Component } from '@angular/core';
import { LeapYearComponent } from "../../features/exercises/leap-year/leap-year.component";
import { CommonModule } from '@angular/common';
import { CountdownComponent } from '../../features/exercises/countdown/countdown.component';

@Component({
  selector: 'app-exercises',
  standalone: true,
  imports: [CommonModule, LeapYearComponent, CountdownComponent],
  templateUrl: './exercises.component.html',
  styleUrl: './exercises.component.scss'
})
export class ExercisesComponent {
  boolCountDown: boolean = true;
  boolLeapYear: boolean = false;

  triggerCountDown(): void {
    this.boolCountDown = true;
    this.boolLeapYear = false;
  }

  triggerLeapYear(): void {
    this.boolCountDown = false;
    this.boolLeapYear = true;
  }
}
