import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-leap-year',
  templateUrl: './leap-year.component.html',
  styleUrls: ['./leap-year.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class LeapYearComponent {
  isALeapYear: boolean | undefined;
  form: FormGroup = new FormGroup({
    year: new FormControl(new Date().getFullYear(), [
      Validators.required,
      Validators.min(-4500000000),
      Validators.max(5000000000)
    ])
  });

  constructor() {
    this.form.get('year')?.valueChanges.subscribe(year => {
      this.handleYearInput(year);
    });
  }

  private handleYearInput(year: string): void {
    let cleaned = year.replace(/[^0-9-]/g, ''); // Remove non-numeric characters except minus sign
    if (cleaned.startsWith('-')) {
      if (cleaned.length > 1) {
        cleaned = '-' + cleaned.slice(1).replace(/-/g, ''); // Ensure only one minus sign at the beginning
      }
    } else {
      cleaned = cleaned.replace(/-/g, ''); // Remove minus signs if not at the beginning
    }
    
    if (cleaned !== year) {
      this.form.get('year')?.setValue(cleaned, { emitEvent: false });
    }

    const numericYear = parseInt(cleaned, 10);
    if (!isNaN(numericYear)) {
      if (numericYear < -4500000000) {
        this.form.get('year')?.setValue(-4500000000, { emitEvent: false });
      } else if (numericYear > 5000000000) {
        this.form.get('year')?.setValue(5000000000, { emitEvent: false });
      } else {
        this.process(numericYear);
      }
    } else {
      this.isALeapYear = undefined; // Reset leap year status when input is not valid
    }
  }

  private process(year: number): void {
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
      this.isALeapYear = true;
    } else {
      this.isALeapYear = false;
    }
  }
}
