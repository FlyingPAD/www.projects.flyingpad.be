import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-leap-year',
  templateUrl: './leap-year.component.html',
  styleUrl: './leap-year.component.scss',
  imports: [CommonModule, ReactiveFormsModule, RouterLink]
})
export class LeapYearComponent implements OnInit {
  public isALeapYear: boolean | undefined;
  public form: FormGroup = new FormGroup({
    year: new FormControl(new Date().getFullYear(), [
      Validators.required,
      Validators.min(-4500000000),
      Validators.max(5000000000)
    ])
  });

  ngOnInit(): void {
    this.checkLeapYear(this.form.get('year')?.value);
    this.form.get('year')?.valueChanges.subscribe(year => this.checkLeapYear(year));
  }

  private checkLeapYear(year: string): void {
    const numericYear = parseInt(year, 10);
    this.isALeapYear = !isNaN(numericYear) ? this.isLeapYear(numericYear) : undefined;
  }

  private isLeapYear(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }
}
