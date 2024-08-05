import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertTemperature',
  standalone: true
})
export class ConvertTemperaturePipe implements PipeTransform {
  transform(value: number, fromUnit: string, toUnit: string): string {
    let convertedValue = value;
    if (fromUnit === 'Celsius' && toUnit === 'Fahrenheit') {
      convertedValue = (value * 9 / 5) + 32;
    } else if (fromUnit === 'Fahrenheit' && toUnit === 'Celsius') {
      convertedValue = (value - 32) * 5 / 9;
    }
    return `${convertedValue.toFixed(2)} ° ${toUnit}`;
  }
}