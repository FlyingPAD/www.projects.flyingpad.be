import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ConvertTemperaturePipe } from '../../pipes/convert-temperature.pipe';
import { ConvertDistancePipe } from '../../pipes/convert-distance.pipe';
import { ConvertMassPipe } from '../../pipes/convert-mass.pipe';
import { ConvertVolumePipe } from '../../pipes/convert-volume.pipe';
import { ButtonTopComponent } from '../../components/button-top/button-top.component';
import { ButtonBackComponent } from '../../components/button-back/button-back.component';

@Component({
  selector: 'app-convertors',
  standalone: true,
  templateUrl: './convertors.component.html',
  styleUrls: ['./convertors.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ConvertTemperaturePipe,
    ConvertDistancePipe,
    ConvertMassPipe,
    ConvertVolumePipe,
    ButtonTopComponent,
    ButtonBackComponent
  ],
})
export class ConvertorsComponent {
  temperature : boolean = false
  temperatureToggle():void{ this.temperature = !this.temperature}
  distance : boolean = false
  distanceToggle():void{ this.distance = !this.distance}
  mass : boolean = false
  massToggle():void{ this.mass = !this.mass}
  volume : boolean = false
  volumeToggle():void{ this.volume = !this.volume}

  temperatureForm: FormGroup
  distanceForm: FormGroup
  massForm: FormGroup
  volumeForm: FormGroup

  temperatureUnits = ['Celsius', 'Fahrenheit']
  distanceUnits = ['Kilometers', 'Miles']
  massUnits = ['Kilograms', 'Pounds']
  volumeUnits = ['Liters', 'Gallons']

  toTemperatureUnit: string
  toDistanceUnit: string
  toMassUnit: string
  toVolumeUnit: string

  constructor(private fb: FormBuilder) {
    this.temperatureForm = this.fb.group({
      value: [10],
      fromUnit: ['Celsius'],
      toUnit: ['Fahrenheit']
    })

    this.distanceForm = this.fb.group({
      value: [10],
      fromUnit: ['Kilometers'],
      toUnit: ['Miles']
    })

    this.massForm = this.fb.group({
      value: [10],
      fromUnit: ['Kilograms'],
      toUnit: ['Pounds']
    })

    this.volumeForm = this.fb.group({
      value: [10],
      fromUnit: ['Liters'],
      toUnit: ['Gallons']
    })

    this.toTemperatureUnit = this.temperatureUnits[1]
    this.toDistanceUnit = this.distanceUnits[1]
    this.toMassUnit = this.massUnits[1]
    this.toVolumeUnit = this.volumeUnits[1]

    this.temperatureForm.get('fromUnit')?.valueChanges.subscribe(value => {
      this.updateTemperatureToUnit(value)
    })

    this.distanceForm.get('fromUnit')?.valueChanges.subscribe(value => {
      this.updateDistanceToUnit(value)
    })

    this.massForm.get('fromUnit')?.valueChanges.subscribe(value => {
      this.updateMassToUnit(value)
    })

    this.volumeForm.get('fromUnit')?.valueChanges.subscribe(value => {
      this.updateVolumeToUnit(value)
    })
  }

  updateTemperatureToUnit(fromUnit: string) {
    this.toTemperatureUnit = this.temperatureUnits.find(unit => unit !== fromUnit) || ''
    this.temperatureForm.get('toUnit')?.setValue(this.toTemperatureUnit)
  }

  updateDistanceToUnit(fromUnit: string) {
    this.toDistanceUnit = this.distanceUnits.find(unit => unit !== fromUnit) || ''
    this.distanceForm.get('toUnit')?.setValue(this.toDistanceUnit)
  }

  updateMassToUnit(fromUnit: string) {
    this.toMassUnit = this.massUnits.find(unit => unit !== fromUnit) || ''
    this.massForm.get('toUnit')?.setValue(this.toMassUnit)
  }

  updateVolumeToUnit(fromUnit: string) {
    this.toVolumeUnit = this.volumeUnits.find(unit => unit !== fromUnit) || ''
    this.volumeForm.get('toUnit')?.setValue(this.toVolumeUnit)
  }
}
