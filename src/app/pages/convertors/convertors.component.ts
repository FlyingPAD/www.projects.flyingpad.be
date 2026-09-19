import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ConvertTemperaturePipe } from '../../pipes/convert-temperature.pipe';
import { ConvertDistancePipe } from '../../pipes/convert-distance.pipe';
import { ConvertMassPipe } from '../../pipes/convert-mass.pipe';
import { ConvertVolumePipe } from '../../pipes/convert-volume.pipe';

@Component({
  selector: 'app-convertors',
  templateUrl: './convertors.component.html',
  styleUrl: './convertors.component.scss',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    ConvertTemperaturePipe,
    ConvertDistancePipe,
    ConvertMassPipe,
    ConvertVolumePipe
  ]
})
export class ConvertorsComponent implements OnInit {
  #fb = inject(FormBuilder);

  public activeConverter = '';
  public temperatureForm!: FormGroup;
  public distanceForm!: FormGroup;
  public massForm!: FormGroup;
  public volumeForm!: FormGroup;
  public temperatureUnits = ['Celsius', 'Fahrenheit'];
  public distanceUnits = ['Kilometers', 'Miles'];
  public massUnits = ['Kilograms', 'Pounds'];
  public volumeUnits = ['Liters', 'Gallons'];

  ngOnInit(): void {
    this.temperatureForm = this.#fb.group({
      value: [10],
      fromUnit: ['Celsius'],
      toUnit: ['Fahrenheit']
    });
    this.distanceForm = this.#fb.group({
      value: [10],
      fromUnit: ['Kilometers'],
      toUnit: ['Miles']
    });
    this.massForm = this.#fb.group({
      value: [10],
      fromUnit: ['Kilograms'],
      toUnit: ['Pounds']
    });
    this.volumeForm = this.#fb.group({
      value: [10],
      fromUnit: ['Liters'],
      toUnit: ['Gallons']
    });

    this.temperatureForm.get('fromUnit')?.valueChanges.subscribe(() => {
      this.updateToUnit(this.temperatureForm, this.temperatureUnits);
    });
    this.distanceForm.get('fromUnit')?.valueChanges.subscribe(() => {
      this.updateToUnit(this.distanceForm, this.distanceUnits);
    });
    this.massForm.get('fromUnit')?.valueChanges.subscribe(() => {
      this.updateToUnit(this.massForm, this.massUnits);
    });
    this.volumeForm.get('fromUnit')?.valueChanges.subscribe(() => {
      this.updateToUnit(this.volumeForm, this.volumeUnits);
    });

    this.updateToUnit(this.temperatureForm, this.temperatureUnits);
    this.updateToUnit(this.distanceForm, this.distanceUnits);
    this.updateToUnit(this.massForm, this.massUnits);
    this.updateToUnit(this.volumeForm, this.volumeUnits);
  }

  public updateToUnit(form: FormGroup, units: string[]): void {
    const fromUnit = form.get('fromUnit')?.value;
    const toUnit = units.find(unit => unit !== fromUnit) || '';
    form.get('toUnit')?.setValue(toUnit);
  }

  public toggleConverter(key: string): void {
    this.activeConverter = this.activeConverter === key ? '' : key;
  }
}
