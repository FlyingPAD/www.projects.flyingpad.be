import { ValidatorFn, AbstractControl } from '@angular/forms';

export function validYearValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const isValid = !isNaN(control.value) && Number.isInteger(Number(control.value));
    return isValid ? null : {'validYear': {value: control.value}};
  };
}
