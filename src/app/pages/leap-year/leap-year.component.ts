import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { BottomIconBackComponent } from "../../components/bottom-bar-icons/bottom-icon-back/bottom-icon-back.component";
import { BottomToggleEntityInfoComponent } from "../../components/bottom-bar-icons/bottom-toggle-entity-info/bottom-icon-about.component";
import { BottomIconSettingsComponent } from "../../components/bottom-bar-icons/bottom-icon-settings/bottom-icon-settings.component";
import { BottomBarComponent } from "../../components/bottom-bar/bottom-bar.component";
import { SpacerComponent } from "../../components/spacer/spacer.component";
import { BottomIconToTopComponent } from "../../components/bottom-bar-icons/bottom-icon-to-top/bottom-icon-to-top.component";

@Component({
    selector: 'app-leap-year',
    templateUrl: './leap-year.component.html',
    styleUrls: ['./leap-year.component.scss'],
    imports: [CommonModule, ReactiveFormsModule, BottomIconBackComponent, BottomToggleEntityInfoComponent, BottomIconSettingsComponent, BottomBarComponent, SpacerComponent, BottomIconToTopComponent]
})
export class LeapYearComponent implements OnInit {
  public isALeapYear: boolean | undefined
  public form: FormGroup = new FormGroup({
    year: new FormControl(new Date().getFullYear(), [
      Validators.required,
      Validators.min(-4500000000),
      Validators.max(5000000000)
    ])
  })

  ngOnInit() {
    this.checkLeapYear(this.form.get('year')?.value)
    this.form.get('year')?.valueChanges.subscribe(year => {
      this.checkLeapYear(year)
    })
  }

  private checkLeapYear(year: string): void {
    let numericYear = parseInt(year, 10)

    if (!isNaN(numericYear)) this.isALeapYear = this.isLeapYear(numericYear)
    else this.isALeapYear = undefined
  }

  private isLeapYear(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
  }
}