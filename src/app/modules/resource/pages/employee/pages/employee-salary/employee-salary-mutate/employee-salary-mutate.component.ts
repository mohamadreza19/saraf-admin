import { Component, OnInit } from '@angular/core';
import { CURRENCIES } from 'src/app/modules/financial/constants/receive-pay-common-constants';
import {
  AmountFormControl,
  FormControl2,
  FormBuilder2Component,
} from 'src/app/shared/components/form-builder2/form-builder2.component';
import { CustomFormGroup } from 'src/app/shared/form-builder/form-builder.component';
const fakeProfileImgUrl = 'assets/images/gray-avatar-placeholder.jpg';
@Component({
  selector: 'app-employee-salary-mutate',
  templateUrl: './employee-salary-mutate.component.html',
  styleUrls: ['./employee-salary-mutate.component.css'],
  standalone: true,
  imports: [FormBuilder2Component],
})
export class EmployeeSalaryMutateComponent implements OnInit {
  form!: CustomFormGroup;
  constructor() {
    const currencyList = new FormControl2('', {
      label: '',
      type: 'select',
      options: Object.values(CURRENCIES),
      validators: [],
    });
    const controls = {
      costType: new FormControl2('هزینه', {
        type: 'text',
        label: 'نوع',
        validators: [],
      }),
      costType2: new FormControl2('پرداخت حقوق', {
        label: 'پرداخت حقوق',
        type: 'text',
        validators: [],
      }),
      detailed: new FormControl2('حقوق جناب محمد محمدی', {
        type: 'text',
        label: 'تفصیلی',
        validators: [],
      }),
      //
      firstName: new FormControl2('محمد', {
        label: 'نام',
        type: 'text',
        validators: [],
      }),
      lastName: new FormControl2('محمدی', {
        label: 'نام خانوادگی',
        type: 'text',
        validators: [],
      }),
      phoneNumber: new FormControl2('09012446811', {
        label: 'تلفن همراه',
        type: 'text',
        validators: [],
      }),
      profileImg: new FormControl2(fakeProfileImgUrl, {
        type: 'readonly-img',
        label: 'عکس پروفایل',
        validators: [],
      }),
      amount: new AmountFormControl(
        '',
        {
          type: 'amount',
          label: 'مبلغ',
          validators: [],
        },
        currencyList,
      ),
      fund: new FormControl2('', {
        label: 'صندق',
        type: 'select',
        options: ['fund1', 'fund2'],
        validators: [],
      }),
      bankAccount: new FormControl2('', {
        options: ['حساب-۱', 'حساب-۲'],
        type: 'select',
        label: 'حساب',
        validators: [],
      }),
      employeeType: new FormControl2('', {
        options: ['ایرانی', 'بین الملل', 'کریپتو'],
        label: 'نوع حساب کارمند',
        type: 'select',
        validators: [],
      }),
      receipt: new FormControl2(null, {
        label: 'رسید',
        type: 'files',
        validators: [],
      }),
      description: new FormControl2('', {
        label: 'توضیحات',
        type: 'text',
        validators: [],
      }),
    };
    controls.costType.disable();
    controls.costType2.disable();
    controls.detailed.disable();
    controls.firstName.disable();
    controls.lastName.disable();
    controls.profileImg.disable();
    controls.phoneNumber.disable();
    this.form = new CustomFormGroup(controls, '', 'ثبت');
  }

  ngOnInit() {}
}
