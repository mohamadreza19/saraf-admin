import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Custom validator to check the number of files
export function fileLengthValidator(maxFiles: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const files = control.value as FileList;

    if (files && files.length > maxFiles) {
      return { fileLength: { maxFiles, actualFiles: files.length } };
    }

    return null; // Validation passes
  };
}
