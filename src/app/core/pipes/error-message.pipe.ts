import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ValidationMessages } from '../constants/validation-messages';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl2 } from 'src/app/shared/components/form-builder2/form-builder2.component';

@Pipe({
  name: 'errorMessage',
  pure: false, // Mark the pipe as impure to ensure it recalculates whenever the control's state changes
})
export class ErrorMessagePipe implements PipeTransform {
  constructor() {}
  transform(control: FormControl2): string | null {
    // console.log(control.touched);
    if (!control || !control.errors || !control.touched) return null;
    for (const errorKey of Object.keys(control.errors) as Array<keyof typeof ValidationMessages>) {
      const error = control.errors[errorKey];
      const message = ValidationMessages[errorKey];
      // console.log(error);

      // If the message is a function, call it with the error object
      if (message) {
        // console.log(message);
        return typeof message === 'function' ? message(error) : message;
      }
    }

    return null; // If no matching error message is found
  }
}

export function errorMessageTransform(control: FormControl2): string | null {
  // console.log(control.touched);
  if (!control || !control.errors || !control.touched) return null;
  for (const errorKey of Object.keys(control.errors) as Array<keyof typeof ValidationMessages>) {
    const error = control.errors[errorKey];
    const message = ValidationMessages[errorKey];
    // console.log(error);

    // If the message is a function, call it with the error object
    if (message) {
      return typeof message === 'function' ? message(error) : message;
    }
  }

  return null; // If no matching error message is found
}
