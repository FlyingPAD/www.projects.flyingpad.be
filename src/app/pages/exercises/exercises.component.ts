import { Component } from '@angular/core';
import { LeapYearComponent } from "../../features/exercises/leap-year/leap-year.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-exercises',
  standalone: true,
  imports: [CommonModule, LeapYearComponent],
  templateUrl: './exercises.component.html',
  styleUrl: './exercises.component.scss'
})
export class ExercisesComponent {
  boolLeapYear : boolean = false

  triggerLeapYear()
  {
    this.boolLeapYear = !this.boolLeapYear
  }
}
