import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import {
  LoadingSnackbar,
  LoadingSnackbarComponent,
} from 'src/app/shared/components/snackbars/loading-snackbar/loading-snackbar.component';

@Injectable({
  providedIn: 'root',
})
export class LoadingSnackbarService {
  private ref!: MatSnackBarRef<unknown>;
  constructor(private snackBar: MatSnackBar) {}
  openSuccess(text: string) {
    this.ref = this.snackBar.openFromComponent(LoadingSnackbarComponent, {
      duration: 1900,

      data: {
        status: 'success',

        text: text,
      } as LoadingSnackbar,
    });
  }
  openSuccessTop(text: string) {
    this.ref = this.snackBar.openFromComponent(LoadingSnackbarComponent, {
      duration: 1900,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      data: {
        status: 'success',

        text: text,
      } as LoadingSnackbar,
    });
  }

  openError(text: string) {
    this.ref = this.snackBar.openFromComponent(LoadingSnackbarComponent, {
      duration: 1900,
      data: {
        status: 'error',
        text: text,
      } as LoadingSnackbar,
    });
  }
  openLoading(text: string) {
    this.ref = this.snackBar.openFromComponent(LoadingSnackbarComponent, {
      data: {
        status: 'loading',
        text: text,
      } as LoadingSnackbar,
    });
  }

  close() {
    if (this.ref) this.ref.dismiss();
    else throw Error('not ref found');
  }
}
