import { Injectable } from '@angular/core';
import { ScrollService } from './scroll.service';
import { LoadingSnackbarService } from './loading-snackbar.service';
import { FormArray2, FormControl2 } from 'src/app/shared/components/form-builder2/form-builder2.component';
import { ErrorWithFormLabel } from '../utils/error-with-form-label';
import { CustomFormGroup } from 'src/app/shared/form-builder/form-builder.component';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class FormSubmitService {
  constructor(
    public loadingSnackbar: LoadingSnackbarService,
    private scroll: ScrollService,

    private location: Location,
  ) {}

  onSend(formLabel: string) {
    this.loadingSnackbar.openLoading(`درحال ارسال فرم "${formLabel}"`);
  }
  onfulfilled(formLabel: string) {
    this.loadingSnackbar.openSuccess(`فرم ${formLabel} با موفقیت ذخیره شده`);
  }

  successNav(text: string) {
    this.location.back();
    this.scroll.scrollMainContentToTop();
    setTimeout(() => {
      this.loadingSnackbar.openSuccessTop(text);
    }, 5000);
  }

  onError(error_: any, formArray: FormArray2, setStep: (formIndex: number) => void) {
    this.loadingSnackbar.close();

    if (error_ instanceof ErrorWithFormLabel) {
      const { error, label } = error_;
      formArray.controls.forEach((fg, FormIndex) => {
        const _fg = fg as CustomFormGroup;
        if (_fg.rootLabel === label) {
          for (const key in _fg.controls) {
            if (_fg.controls[key] instanceof FormControl2 && key in error) {
              const formControl = _fg.controls[key] as FormControl2;
              formControl.setErrors(error[key]);

              this.loadingSnackbar.openError(`خطا در فرم "${label}"`);
              setTimeout(() => setStep(FormIndex), 500);
              setTimeout(() => this.scroll.scrollIntoView(formControl.label as string), 1200);

              break;
            } else {
              this.loadingSnackbar.openError(`خطا در فرم "${label}"`);
            }
          }
        }
      });
    }
  }
}
