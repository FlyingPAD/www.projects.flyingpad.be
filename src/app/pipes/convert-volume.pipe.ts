import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertVolume',
  standalone: true
})
export class ConvertVolumePipe implements PipeTransform {
  transform(value: number, fromUnit: string, toUnit: string): string {
    let convertedValue = value;
    if (fromUnit === 'Liters' && toUnit === 'Gallons') {
      convertedValue = value * 0.264172;
    } else if (fromUnit === 'Gallons' && toUnit === 'Liters') {
      convertedValue = value / 0.264172;
    }
    return `${convertedValue.toFixed(2)} ${toUnit}`;
  }
}