import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Custom validator to check the number of files
export function lengthValidator(maxLength: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (value && value.length > maxLength) {
      return { length: { maxLength, actual: value.length } };
    }

    return null; // Validation passes
  };
}
