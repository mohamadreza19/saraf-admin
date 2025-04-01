import { catchError, throwError } from 'rxjs';
import { ErrorWithFormLabel } from './error-with-form-label';

export function errorNormalizedWithFormLabel(formLabel: string) {
  return catchError((e) => {
    const normalizedError = new ErrorWithFormLabel(formLabel, e);
    return throwError(() => normalizedError);
  });
}
