import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertMass',
  standalone: true
})
export class ConvertMassPipe implements PipeTransform {
  transform(value: number, fromUnit: string, toUnit: string): string {
    let convertedValue = value;
    if (fromUnit === 'Kilograms' && toUnit === 'Pounds') {
      convertedValue = value * 2.20462;
    } else if (fromUnit === 'Pounds' && toUnit === 'Kilograms') {
      convertedValue = value / 2.20462;
    }
    return `${convertedValue.toFixed(2)} ${toUnit}`;
  }
}