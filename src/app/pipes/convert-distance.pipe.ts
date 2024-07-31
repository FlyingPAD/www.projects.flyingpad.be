import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertDistance',
  standalone: true
})
export class ConvertDistancePipe implements PipeTransform {
  transform(value: number, fromUnit: string, toUnit: string): string {
    let convertedValue = value;
    if (fromUnit === 'Kilometers' && toUnit === 'Miles') {
      convertedValue = value * 0.621371;
    } else if (fromUnit === 'Miles' && toUnit === 'Kilometers') {
      convertedValue = value / 0.621371;
    }
    return `${convertedValue} ${toUnit}`;
  }
}