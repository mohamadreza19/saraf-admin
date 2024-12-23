import { Component, TemplateRef } from '@angular/core';
import { Receipt } from 'src/app/modules/financial/components/receipt/types';
import {
  ExchangeOfficeControls,
  ExchangeOfficeControls2,
  ExchangeOfficeControls3,
} from 'src/app/modules/financial/pages/exchange-office/exchange-office-mutate/controls';
import {
  AmountFormControl,
  FormControl2,
  FormBuilder2Component,
} from 'src/app/shared/components/form-builder2/form-builder2.component';
import { DOC_TYPES } from 'src/app/shared/constants/constants';
import { CustomFormGroup } from 'src/app/shared/form-builder/form-builder.component';

@Component({
  selector: 'app-employee-mutate',
  standalone: true,
  imports: [FormBuilder2Component],
  templateUrl: './employee-mutate.component.html',
})
export class EmployeeMutateComponent {
  form1!: CustomFormGroup;
  form3!: CustomFormGroup;

  timeoutId: any;
  constructor() {}
  ngAfterViewInit(): void {
    const controls = this.initiateControls();
    this.form1 = new CustomFormGroup(controls, 'اطلاعات شخصی', 'بعدی');
    this.handleForm1ControlsValuesChange(this.form1);

    const controls3 = this.initiateControls3();
    this.form3 = new CustomFormGroup(controls3, 'ثبت مدارک', 'ثبت');
    this.handleForm3ControlsValuesChange(this.form3);
  }

  initiateControls(): ExchangeOfficeControls {
    return {
      firstName: new FormControl2('', {
        type: 'text',
        label: 'نام',

        validators: [],
      }),
      lastName: new FormControl2('', {
        type: 'text',
        label: 'نام خانوادگی',

        validators: [],
      }),
      image: new FormControl2([], {
        type: 'files',
        filesLength: 1,
        label: 'بارگزاری یا انتخاب تصویر فردی',
        validators: [],

        allowedFileTypes: ['pdf', 'jpeg', 'png', 'jpg'],
      }),
      nicName: new FormControl2('', {
        type: 'text',
        label: 'نام مستعار',
        validators: [],
      }),
      phoneNumber: new FormControl2('', {
        type: 'phone-number',
        label: 'شماره تماس',
        validators: [],
      }),
      gender: new FormControl2('', {
        type: 'select',
        label: 'جنسیت',
        validators: [],
        options: ['مذکر', 'مونثه'],
      }),
      nationality: new FormControl2('', {
        type: 'select',
        label: 'ملیت',
        validators: [],
        options: ['ایرانی', 'آمریکایی', 'اماراتی'],
      }),
      nationalCode: new FormControl2('', {
        type: 'text',
        label: 'کد ملی',
        validators: [],
      }),
      fatherName: new FormControl2('', {
        type: 'text',
        label: 'نام پدر',
        validators: [],
      }),
      bornDate: new FormControl2('', {
        type: 'date',
        label: 'تاریخ تولد',
        validators: [],
      }),
      panelLanguage: new FormControl2('', {
        label: 'زبان پنل',
        type: 'select',
        validators: [],
      }),
      email: new FormControl2('', {
        type: 'email',
        label: 'ایمیل',
        validators: [],
      }),
      country: new FormControl2('', {
        type: 'select',
        label: 'کشور',
        validators: [],
        options: ['ایران', ' آمریکا', 'امارات'],
      }),
      city: new FormControl2('', {
        type: 'select',
        label: 'شهر',
        validators: [],
        options: ['تهران', 'بوشهر'],
      }),
      address: new FormControl2('', {
        type: 'text',
        label: 'آدرس',
        validators: [],
      }),
      zipCode: new FormControl2('', {
        type: 'text',
        label: 'کدپستی',
        validators: [],
      }),
      isLegal: new FormControl2('', {
        type: 'checkbox',
        label: 'حقوقی',
        validators: [],
      }),
      //
      companyOrStoreName: new FormControl2('', {
        type: 'text',
        label: 'نام شرکت  / فروشگاه',
        validators: [],
        show: false,
      }),
      companyPhoneNumber: new FormControl2('', {
        type: 'text',
        label: 'شماره تماس',
        validators: [],
        show: false,
      }),
      companyEmail: new FormControl2('', {
        type: 'text',
        label: 'ایمیل شرکت',
        validators: [],
        show: false,
      }),
      companyCountry: new FormControl2('', {
        type: 'text',
        label: 'کشور',
        validators: [],
        show: false,
      }),
      companyAddress: new FormControl2('', {
        type: 'text',
        label: 'آدرس',
        validators: [],
        show: false,
      }),
      companyZipCode: new FormControl2('', {
        type: 'text',
        label: 'کد پستی',
        validators: [],
        show: false,
      }),
    };
  }
  handleForm1ControlsValuesChange(form: CustomFormGroup) {
    const controls: ExchangeOfficeControls = form.controls as any;
    const {
      isLegal,
      companyOrStoreName,
      companyPhoneNumber,
      companyEmail,
      companyCountry,
      companyAddress,
      companyZipCode,
    } = controls;
    isLegal.valueChanges.subscribe((val) => {
      if (val == true) {
        companyOrStoreName.show = true;
        companyPhoneNumber.show = true;
        companyEmail.show = true;
        companyCountry.show = true;
        companyAddress.show = true;
        companyZipCode.show = true;
      } else {
        companyOrStoreName.show = false;
        companyPhoneNumber.show = false;
        companyEmail.show = false;
        companyCountry.show = false;
        companyAddress.show = false;
        companyZipCode.show = false;
      }
    });
  }

  initiateControls3(): ExchangeOfficeControls3 {
    return {
      docType: new FormControl2('', {
        label: 'نوع مدرک',
        type: 'select',
        options: Object.values(DOC_TYPES),
        validators: [],
      }),

      docExpireDate: new FormControl2('', {
        label: 'تاریخ انقضاء',
        type: 'date',
        show: false,
        validators: [],
      }),

      docs: new FormControl2('', {
        label: 'بارگزاری مدارک',
        type: 'files',
        validators: [],
      }),
    };
  }
  handleForm3ControlsValuesChange(form3: CustomFormGroup) {
    const controls: ExchangeOfficeControls3 = form3.controls as any;

    controls.docType.valueChanges.subscribe((val) => {
      switch (val) {
        case DOC_TYPES.hasExpire:
          controls.docExpireDate.show = true;
          break;
        case DOC_TYPES.noExpire:
          controls.docExpireDate.show = false;
          break;

        default:
          break;
      }
    });
  }
  handleCalculateReceipt(controls: ExchangeOfficeControls2) {
    const { currencyUnit, amount, discount, receipt_ } = controls;

    const percentage = calculatePercentage(Number(discount.value), Number(amount.value));

    const totalAmount = Number(amount.value) - Number(discount.value);
    const receipt: Receipt = {
      currencyUnit: currencyUnit.value || '0',
      amount: amount.value || '0',
      discount: discount.value || '0',
      discountPercent: String(percentage),
      totalAmount: String(totalAmount),
    };

    receipt_.setValue(receipt);

    function calculatePercentage(part: number, whole: number): number {
      return (part / whole) * 100;
    }
  }
}
