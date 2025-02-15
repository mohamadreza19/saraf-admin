import { Injectable } from '@angular/core';
import { LoadingSnackbarService } from './loading-snackbar.service';
import { ScrollService } from './scroll.service';
import { FormArray2 } from 'src/app/shared/components/form-builder2/form-builder2.component';
import { ErrorWithFormLabel } from '../utils/error-with-form-label';

export class FormErrorBuilder {
  static loadingSnackbar: LoadingSnackbarService;
  static scroll: ScrollService;

  static setLoadingAndScrollChain(loadingSnackbar: LoadingSnackbarService, scroll: ScrollService) {
    this.loadingSnackbar = loadingSnackbar;
    this.scroll = scroll;
    return this;
  }
  setFormLabelAndSetStep(formsLabel: string[], setStep: (index: number) => void) {}
  static processErrorChain(error: ErrorWithFormLabel, formArray: FormArray2) {
    return this;
  }
}
