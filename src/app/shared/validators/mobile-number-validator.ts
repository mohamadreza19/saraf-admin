import { AbstractControl, ValidatorFn } from '@angular/forms';
import { parsePhoneNumberFromString, isValidPhoneNumber } from 'libphonenumber-js';

export function mobileNumberValidator(dialCode: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const mobileNumber = control.value;

    if (!mobileNumber) {
      return null; // Allow empty values (use Validators.required if needed)
    }

    // Combine the dial code and mobile number
    const fullNumber = dialCode + mobileNumber;

    // Parse the phone number
    const phoneNumber = parsePhoneNumberFromString(fullNumber);

    // Manual length check for Iranian numbers (+98)
    if (
      phoneNumber &&
      phoneNumber.country === 'IR' &&
      phoneNumber.nationalNumber.length !== 10 // Iranian mobile numbers should be 10 digits
    ) {
      return { pattern: true }; // Invalid phone number
    }

    // Check if the phone number is valid
    if (!phoneNumber || !isValidPhoneNumber(phoneNumber.number)) {
      return { pattern: true }; // Phone number is invalid
    }

    return null; // Validation passed
  };
}
