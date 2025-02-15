import { Injectable, Type } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(private dialog: MatDialog) {}

  open(component: Type<any>, config: MatDialogConfig = {}): MatDialogRef<any> {
    return this.dialog.open(component, config);
  }

  close(ref: MatDialogRef<any>): void {
    ref.close();
  }
}
