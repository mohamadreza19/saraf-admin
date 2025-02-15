import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function phoneNumberValidator(countryCode: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const phoneNumber = control.value;

    if (!phoneNumber) {
      return null; // Allow empty values (use Validators.required if needed)
    }

    // Define regex patterns for different countries
    const phonePatterns: { [key: string]: RegExp } = {
      '+1': /^[2-9]\d{9}$/, // US: 10 digits, starting with 2-9
      '+44': /^7\d{9}$/, // UK: 10 digits, starting with 7
      '+91': /^[6-9]\d{9}$/, // India: 10 digits, starting with 6-9
      '+86': /^1\d{10}$/, // China: 11 digits, starting with 1
    };

    const pattern = phonePatterns[countryCode];

    if (!pattern) {
      return { invalidCountryCode: true }; // Invalid country code
    }

    if (!pattern.test(phoneNumber)) {
      return { invalidPhoneNumber: true }; // Invalid phone number format
    }

    return null; // Valid phone number
  };
}
