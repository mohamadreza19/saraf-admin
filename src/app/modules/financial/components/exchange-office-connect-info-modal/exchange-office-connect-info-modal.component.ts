import { Component } from '@angular/core';
import { FormControl2, FormBuilder2Component } from 'src/app/shared/components/form-builder2/form-builder2.component';
import { CustomFormGroup } from 'src/app/shared/form-builder/form-builder.component';

@Component({
  selector: 'app-exchange-office-connect-info-modal',
  standalone: true,
  imports: [FormBuilder2Component],
  templateUrl: './exchange-office-connect-info-modal.component.html',
  styleUrl: './exchange-office-connect-info-modal.component.css',
})
export class ExchangeOfficeConnectInfoModalComponent {
  form!: CustomFormGroup;

  constructor() {
    const controls = {
      phoneNumber: new FormControl2('', {
        label: 'شماره همراه',
        type: 'text',
        validators: [],
      }),
      files: new FormControl2('', {
        label: 'عکس پروفایل',
        type: 'files',
        validators: [],
      }),
      firstName: new FormControl2('', {
        label: 'نام',
        type: 'text',
        validators: [],
      }),
      lastName: new FormControl2('', {
        label: 'نام خانوادگی',
        type: 'text',
        validators: [],
      }),
      exchangeServerAddress: new FormControl2('', {
        label: 'آدرس سرور صرافی',
        type: 'text',
        validators: [],
      }),
      adminServerAddress: new FormControl2('', {
        label: 'آدرس سرور ادمین',
        type: 'text',
        validators: [],
      }),
      adminConnectionPort: new FormControl2('', {
        label: 'پورت اتصال فرانت به ادمین',
        type: 'text',
        validators: [],
      }),
      exchangeDatabaseAddress: new FormControl2('', {
        label: 'آدرس دیتابیس صرافی',
        type: 'text',
        validators: [],
      }),
      exchangeDatabasePort: new FormControl2('', {
        label: 'پورت دیتابیس صرافی',
        type: 'text',
        validators: [],
      }),
    };

    this.form = new CustomFormGroup(controls, 'اطلاعات اتصال', 'ثبت');
  }
}
