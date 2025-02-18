import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpStatusCode,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ValidationMessages } from '../constants/validation-messages';
import { FieldsError, ServerFieldsError } from 'src/app/shared/types/validator-error.interface';
import { LoadingSnackbar } from 'src/app/shared/components/snackbars/loading-snackbar/loading-snackbar.component';
import { LoadingSnackbarService } from '../services/loading-snackbar.service';

@Injectable()
export class BadRequestInterceptor implements HttpInterceptor {
  constructor(private loadingSnackbar: LoadingSnackbarService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((e: HttpErrorResponse) => {
        if (e.status == HttpStatusCode.BadRequest || e.status == HttpStatusCode.Unauthorized) {
          console.log(e);
          const errors = BadRequestError.getErrors(e.error);

          if ('unknown' in errors) {
            this.loadingSnackbar.openError('خطای ناشناخته');
          }
          return throwError(errors);
        } else return throwError(e);

        // Return the error to the caller
      }),
    );
  }
}

class BadRequestError {
  private static errors: {
    [key: string]: FieldsError;
  } = {
    ['unknown']: { unknown: true },
  };

  static getErrors(error: any) {
    if (typeof error === 'object') {
      for (let validateKey of Object.keys(ValidationMessages)) {
        if ('data' in error) {
          if ('field' in error.data) {
            const { field } = error.data;
            const message = 'exists';
            // mongo duplicate err

            this.checkValidateKeyAndSetErrors(field, message, validateKey);
          }

          for (let key in error.data) {
            const message = error.data[key];

            this.checkValidateKeyAndSetErrors(key, message, validateKey);
          }
        } else {
          for (let key in error) {
            const message = error[key];

            this.checkValidateKeyAndSetErrors(key, message, validateKey);
          }
        }
      }
    }

    return this.errors;
  }

  private static checkValidateKeyAndSetErrors(fieldName: string, message: string, validateKey: string) {
    if (typeof message == 'string' && message.toLowerCase().includes(validateKey)) {
      this.errors = {};
      this.errors[fieldName] = { [validateKey]: true };
    }
  }
}
