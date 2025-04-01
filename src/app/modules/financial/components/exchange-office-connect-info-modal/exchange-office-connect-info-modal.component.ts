import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl2,
  FormBuilder2Component,
  FormArray2,
} from 'src/app/shared/components/form-builder2/form-builder2.component';
import { CustomFormGroup } from 'src/app/shared/form-builder/form-builder.component';
import { FormBuilder3Component } from '../../../../shared/components/form-builder3/form-builder3.component';
import {
  AbstractMutateApiService,
  SingleFormMutateComponent,
} from 'src/app/core/base-components/single-form-mutate/single-form-mutate.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TConnectionDialog } from 'src/app/modules/resource/pages/exchange-office/types';
import { ConnectionApiService } from './connection-api.service';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-exchange-office-connect-info-modal',
  standalone: true,
  imports: [FormBuilder2Component, FormBuilder3Component],
  templateUrl: './exchange-office-connect-info-modal.component.html',
  styleUrl: './exchange-office-connect-info-modal.component.css',
})
export class ExchangeOfficeConnectInfoModalComponent
  extends SingleFormMutateComponent<ConnectionControls>
  implements OnInit
{
  override formSubmitLabel: string = $localize`ذخیره`;
  override entityApiService = inject(ConnectionApiService);
  override allowNavBack: boolean = false;

  // Dialog data and reference
  dialogData: TConnectionDialog = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<ExchangeOfficeConnectInfoModalComponent>);

  constructor() {
    super();
    this.controls = {
      ipServer: new FormControl2('', {
        label: $localize`آدرس سرور صرافی`,
        type: 'text',
        validators: [Validators.required],
      }),

      ipDatabase: new FormControl2('', {
        label: $localize`آدرس دیتابیس صرافی`,
        type: 'text',
        validators: [Validators.required],
      }),
      portDatabase: new FormControl2('', {
        label: $localize`پورت دیتابیس صرافی`,
        type: 'number',
        validators: [Validators.required],
      }),
    };

    this.entityId = this.dialogData.entityId;
    this.httpMethod = 'patch';
  }

  override handleAfterPatchInitialization(controls: ConnectionControls): void {
    this.formLabel = $localize`ویرایش اطلاعات اتصال` + ` ${this.dialogData.entityName} `;
    if (this.dialogData.connection.length) {
      const connection = this.dialogData.connection[0];

      controls.ipServer.setValue(connection.ipServer);
      controls.ipDatabase.setValue(connection.ipDatabase);
      controls.portDatabase.setValue(connection.portDatabase);
    }
  }

  onBack() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.onInit();
    console.log(this.httpMethod);
  }
}

export interface ConnectionControls {
  ipServer: FormControl2;
  ipDatabase: FormControl2;
  portDatabase: FormControl2;
}
