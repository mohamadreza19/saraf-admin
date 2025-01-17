import { FormGroup } from '@angular/forms';

export function getFormControlValues(formGroup: FormGroup): Record<string, any> {
  const result: Record<string, any> = {};

  Object.keys(formGroup.controls).forEach((key) => {
    result[key] = formGroup.get(key)?.value;
  });

  return result;
}
