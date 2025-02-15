import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Receipt } from 'src/app/modules/financial/components/receipt/types';
import {
  ExchangeOfficeControls,
  ExchangeOfficeControls2,
  ExchangeOfficeControls3,
} from 'src/app/modules/resource/pages/exchange-office/exchange-office-mutate/controls';
import {
  AmountFormControl,
  FormControl2,
  FormBuilder2Component,
} from 'src/app/shared/components/form-builder2/form-builder2.component';
import { DOC_TYPES } from 'src/app/shared/constants/constants';
import { CustomFormGroup } from 'src/app/shared/form-builder/form-builder.component';
import { InputComponent } from '../../../../../../shared/components/input/input.component';
import { ButtonComponent } from '../../../../../../shared/components/button/button.component';
import { DocCombinedControls } from 'src/app/shared/models/doc-combined-controls.interface';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-employee-mutate',
  standalone: true,
  imports: [NgFor, NgIf, FormBuilder2Component, InputComponent, ButtonComponent],
  templateUrl: './employee-mutate.component.html',
})
export class EmployeeMutateComponent {
  docs: DocCombinedControls[] = [];
  @ViewChild('addDocsTemplate') addDocsTemplate!: TemplateRef<any>;
  forms: CustomFormGroup[] = [];

  timeoutId: any;
  constructor() {}
  ngAfterViewInit(): void {
    const controls = this.initiateControls();
    const form1 = new CustomFormGroup(controls, 'اطلاعات شخصی', 'بعدی');
    this.handleForm1ControlsValuesChange(form1);

    const controls2 = this.initiateDocControls();
    const form2 = new CustomFormGroup(controls2, 'ثبت مدارک', 'ثبت');

    this.forms.push(form1);
    this.forms.push(form2);
  }

  initiateControls() {
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

  initiateDocControls() {
    this.addDoc();
    const controls4 = {
      docs: new FormControl2([], {
        type: 'files',

        label: '',
        validators: [],

        templateRef: this.addDocsTemplate,
      }),
    };

    return controls4;
  }
  addDoc() {
    const controls = {
      selectDocTypes: new FormControl2('', {
        type: 'select',
        label: 'انواع مدارک',
        validators: [],
        options: ['پشت و روی کارت ملی', 'صفحه شناسنامه', 'گواهینامه', 'پاسپورت'],
        // showIf: [],
      }),
      filesControl: new FormControl2(null, {
        type: 'files',
        filesLength: 10,
        label: ' بارگزاری مدارک',

        validators: [],
      }),
      HasExpire: new FormControl2(false, {
        label: 'تاریخ دار',
        type: 'checkbox',
        validators: [],
      }),
      expireDate: new FormControl2('', {
        label: 'تاریخ انقضا',
        type: 'date',
        validators: [],
        show: false,
      }),
    };
    controls.HasExpire.valueChanges.subscribe((val) => {
      if (val) {
        controls.expireDate.show = true;
      } else {
        controls.expireDate.show = false;
      }
    });
    // this.docs.push(controls);
  }
  deleteDoc(docIndex: number) {
    this.docs = this.docs.filter((_, index) => index !== docIndex);
  }
  _valuesOfObject(obj: object): any {
    return Object.values(obj);
  }
}
