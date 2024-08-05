import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-leap-year',
  templateUrl: './leap-year.component.html',
  styleUrls: ['./leap-year.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class LeapYearComponent implements OnInit {
  isALeapYear: boolean | undefined;
  form: FormGroup = new FormGroup({
    year: new FormControl(new Date().getFullYear(), [
      Validators.required,
      Validators.min(-4500000000),
      Validators.max(5000000000)
    ])
  })

  ngOnInit() {
    this.checkLeapYear(this.form.get('year')?.value);
    this.form.get('year')?.valueChanges.subscribe(year => {
      this.checkLeapYear(year)
    })
  }

  private checkLeapYear(year: string): void {
    const numericYear = parseInt(year, 10)
    if (!isNaN(numericYear)) {
      this.isALeapYear = this.isLeapYear(numericYear)
    } else {
      this.isALeapYear = undefined
    }
  }

  private isLeapYear(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
  }
}