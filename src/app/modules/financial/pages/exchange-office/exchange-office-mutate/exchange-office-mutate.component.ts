import { AfterViewInit, Component, ComponentRef, Input, OnInit, TemplateRef, Type, ViewChild } from '@angular/core';
import {
  FormControl2,
  FormBuilder2Component,
  AmountFormControl,
} from 'src/app/shared/components/form-builder2/form-builder2.component';
import {
  CustomFormControl,
  CustomFormGroup,
  FormBuilderComponent,
} from 'src/app/shared/form-builder/form-builder.component';
import { FormBuilderConfig, FormConfig, Input as FormInput } from 'src/app/shared/models/form-builder-config.interface';
import { ExchangeOfficeControls, ExchangeOfficeControls2, ExchangeOfficeControls3 } from './controls';
import { FormControl } from '@angular/forms';
import { NgTemplateOutlet } from '@angular/common';
import { ReceiptComponent } from '../../../components/receipt/receipt.component';
import { Receipt } from '../../../components/receipt/types';
import { last } from 'rxjs';
import { Currency, DOC_TYPES, MODULE_PERIOD } from 'src/app/shared/constants/constants';

@Component({
  selector: 'app-exchange-office-mutate',
  standalone: true,
  imports: [FormBuilderComponent, FormBuilder2Component, NgTemplateOutlet, ReceiptComponent],
  templateUrl: './exchange-office-mutate.component.html',
})
export class ExchangeOfficeMutateComponent implements AfterViewInit {
  // receipt
  receipt_!: FormControl2;
  @ViewChild('receiptComRef') receiptComRef!: TemplateRef<any>;
  //
  form1!: CustomFormGroup;
  form2!: CustomFormGroup;
  form3!: CustomFormGroup;

  timeoutId: any;
  constructor() {
    const controls3 = {
      documentType: new CustomFormControl('', {
        type: 'select',
        label: 'انواع مدارک',
        validators: [],
        options: ['تاریخ دار', 'همیشگی'],
        showIf: [],
      }),
      docs: new CustomFormControl([], {
        type: 'files',
        filesLength: 10,
        label: ' بارگزاری مدارک',
        validators: [],
        showIf: [],
        allowedFileTypes: ['pdf', 'png', 'jpg', 'jpeg'],
      }),
      activeStatus: new CustomFormControl([], {
        type: 'checkbox',
        label: '',
        validators: [],
        options: ['فعال'],
        showIf: [],
      }),
    };
  }
  ngAfterViewInit(): void {
    const controls = this.initiateControls();
    this.form1 = new CustomFormGroup(controls, 'اطلاعات شخصی', 'بعدی');
    this.handleForm1ControlsValuesChange(this.form1);

    const controls2 = this.initiateControls2();
    this.form2 = new CustomFormGroup(controls2, 'اطلاعات مالی', 'بعدی');
    this.handleForm2ControlsValuesChange(this.form2);

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
  initiateControls2(): ExchangeOfficeControls2 {
    this.receipt_ = new FormControl2('', {
      type: 'text',
      label: '',
      validators: [],
      templateRef: this.receiptComRef,
    });
    const currencyUnit = new FormControl2('', {
      type: 'select',
      label: '',
      show: false,
      options: Object.values(Currency),
      validators: [],
    });

    return {
      requestedModules: new FormControl2('', {
        label: 'ماژول های درخواستی',
        type: 'select',
        options: ['خرید فروش ارز'],
        validators: [],
      }),
      extensionPeriod: new FormControl2('', {
        label: 'مدت تمدید',
        type: 'select',
        options: MODULE_PERIOD,
        validators: [],
      }),
      amount: new AmountFormControl(
        '',
        {
          label: 'مبلغ قابل واریز',
          type: 'amount',
          validators: [],
        },
        currencyUnit,
      ),
      currencyUnit: currencyUnit,
      discount: new FormControl2('', {
        label: 'تخفیف',
        type: 'text',
        validators: [],
      }),
      receipt_: this.receipt_,
      bankAccount: new FormControl2('', {
        label: 'به حساب',
        type: 'select',
        options: ['1', '2'],
        validators: [],
      }),
      hasDepositMade: new FormControl2('', {
        label: 'واریز انجام شده ',
        type: 'checkbox',
        validators: [],
      }),
      noNeedReceipt: new FormControl2(true, {
        label: 'واریز بدون مدرک مورد تایید است',
        type: 'checkbox',
        show: false,
        validators: [],
      }),
      receipt: new FormControl2('', {
        label: 'بارگزاری رسید واریز',
        type: 'files',
        show: false,
        validators: [],
      }),
      // receipt: false,
    };
  }
  handleForm2ControlsValuesChange(form2: CustomFormGroup) {
    const controls: ExchangeOfficeControls2 = form2.controls as any;

    controls.hasDepositMade.valueChanges.subscribe((val) => {
      if (val) {
        controls.noNeedReceipt.show = true;
        controls.receipt.show = false;
        if (!controls.noNeedReceipt.value) {
          controls.receipt.show = false;
        }
      } else {
        controls.noNeedReceipt.show = false;
        controls.receipt.show = false;
      }
    });

    controls.noNeedReceipt.valueChanges.subscribe((val) => {
      if (!val) {
        controls.receipt.show = true;
      } else {
        controls.receipt.show = false;
      }
    });

    form2.valueChanges.subscribe(() => {
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
      }

      this.timeoutId = setTimeout(() => {
        this.handleCalculateReceipt(controls);
      }, 600);
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
