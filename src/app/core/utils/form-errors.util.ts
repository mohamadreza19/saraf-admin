import { inject, Injectable } from '@angular/core';
import { FormControl2 } from 'src/app/shared/components/form-builder2/form-builder2.component';
import { CustomFormGroup } from 'src/app/shared/form-builder/form-builder.component';
import { ServerFieldsError } from 'src/app/shared/types/validator-error.interface';
import { ScrollService } from '../services/scroll.service';
import { LoadingSnackbarService } from '../services/loading-snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class FormError {
  private static form: CustomFormGroup;
  private static error: ServerFieldsError;
  private static loadingSnackbar: LoadingSnackbarService;
  private static scroll: ScrollService;

  constructor(private loadingSnackbar: LoadingSnackbarService, private scroll: ScrollService) {}

  // static formChain(form: CustomFormGroup) {
  //   this.form = form;
  //   return this;
  // }
  private static errorChain(error: ServerFieldsError) {
    this.error = error;
    return this;
  }
  private static loadingSnackbarChain(loadingSnackbar: LoadingSnackbarService) {
    this.loadingSnackbar = loadingSnackbar;
    return this;
  }
  private static scrollChain(scroll: ScrollService) {
    this.scroll = scroll;
    return this;
  }
  setErrors(form: CustomFormGroup, error: ServerFieldsError) {
    for (let key in error) {
      // Object.values(form.controls).forEach((c) => {
      //   c.setErrors(null);
      // });

      const control = form.get(key) as FormControl2;

      if (control) {
        setTimeout(() => {
          control.markAllAsTouched();
          control.setErrors(error[key]);
          this.loadingSnackbar.openError(` خطا در ${control.label}`);

          this.scroll.scrollIntoView(control.label as string);
        }, 1000);
      } else {
        this.loadingSnackbar.openError('خطای ناشناخته');
      }
      break;
    }
  }
}
