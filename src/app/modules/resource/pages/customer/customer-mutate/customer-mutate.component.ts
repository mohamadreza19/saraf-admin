import { AfterContentInit, AfterViewChecked, AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { HeaderButtonsComponent } from '../../../../financial/components/header-buttons/header-buttons.component';
import { CustomFormGroup } from '../../../../../shared/form-builder/form-builder.component';
import { FormBuilder2Component, FormControl2 } from 'src/app/shared/components/form-builder2/form-builder2.component';
import { toggleFormControlsVisibility } from 'src/app/shared/utils/toggle-form-controls-visibility.util';
import { DynamicControls1 } from './controls';
import { DebtorCreditorComponent } from '../../../../financial/components/debtor-creditor/debtor-creditor.component';
import { FinancialAccountComponent } from 'src/app/modules/financial/components/financial-account/financial-account.component';
import { NgFor } from '@angular/common';
import { InputComponent } from '../../../../../shared/components/input/input.component';
import { ButtonComponent } from '../../../../../shared/components/button/button.component';
import { DocCombinedControls } from '../../../types/doc-combined-controls.interface';

@Component({
  selector: 'app-customer-mutate',
  standalone: true,
  imports: [
    NgFor,
    HeaderButtonsComponent,
    FormBuilder2Component,
    DebtorCreditorComponent,
    FinancialAccountComponent,
    InputComponent,
    ButtonComponent,
  ],
  templateUrl: './customer-mutate.component.html',
  styleUrl: './customer-mutate.component.css',
})
export class CustomerMutateComponent implements AfterViewInit {
  forms: CustomFormGroup[] = [];
  @ViewChild('debtorCreditorTemplate') debtorCreditorTemplate!: TemplateRef<DebtorCreditorComponent>;
  @ViewChild('financialAccountTemplate') financialAccountTemplate!: TemplateRef<FinancialAccountComponent>;
  @ViewChild('addDocsTemplate') addDocsTemplate!: TemplateRef<any>;

  docs: DocCombinedControls[] = [];

  ngAfterViewInit(): void {
    this.initForms();
  }

  initForms() {
    this.forms.push(this.initForm1());
    this.forms.push(this.initForm2());

    this.forms.push(this.initForm4());

    this.handleControls1ValuesChange(this.forms[0]);
  }
  initForm1() {
    const controls = this.initiateControls1();
    const form1: CustomFormGroup = new CustomFormGroup(controls, 'اطلاعات شخصی', 'بعدی');
    return form1;
  }
  initForm2() {
    const controls2 = {
      // accountStatus: new FormControl2([], {
      //   type: 'select',
      //   label: 'وضعیت حساب',
      //   validators: [],
      //   options: ['بدهکار', 'بستانکار', 'بی حساب'],
      //   // showIf: [],
      // }),
      debtorCreditor: new FormControl2('', {
        label: '',
        type: 'text',
        templateRef: this.debtorCreditorTemplate,
        validators: [],
      }),
      financialAccounts: new FormControl2('', {
        label: '',
        type: 'text',
        validators: [],
        templateRef: this.financialAccountTemplate,
      }),
    };
    const form2: CustomFormGroup = new CustomFormGroup(controls2, 'اطلاعات مالی', 'بعدی');

    return form2;
  }

  initForm4() {
    this.addDoc();
    const controls4 = {
      docs: new FormControl2([], {
        type: 'files',

        label: '',
        validators: [],

        templateRef: this.addDocsTemplate,
      }),
    };
    const form4: CustomFormGroup = new CustomFormGroup(controls4, 'ثبت مدارک', 'ثبت');

    return form4;
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
    this.docs.push(controls);
  }
  deleteDoc(docIndex: number) {
    this.docs = this.docs.filter((_, index) => index !== docIndex);
  }
  initiateControls1(): DynamicControls1 {
    const isLegal = new FormControl2(false, {
      label: 'حقوقی',
      type: 'checkbox',
      validators: [],
    });
    return {
      phoneNumber: new FormControl2('', {
        type: 'phone-number',
        label: 'شماره تماس',
        validators: [],
        // showIf: [],
      }),
      file: new FormControl2([], {
        type: 'files',
        filesLength: 1,
        label: 'بارگزاری یا انتخاب تصویر فردی',
        validators: [],
        // showIf: [],
        allowedFileTypes: ['pdf', 'jpeg', 'png', 'jpg'],
      }),
      name: new FormControl2('', {
        type: 'text',
        label: 'اسم',
        // showIf: [],
        validators: [],
      }),

      username: new FormControl2('', {
        type: 'text',
        label: 'نام خانوادگی',
        validators: [],
        // showIf: [],
      }),
      nicName: new FormControl2('', {
        type: 'text',
        label: 'نام مستعار',
        validators: [],
        // showIf: [],
      }),

      gender: new FormControl2('', {
        type: 'select',
        label: 'جنسیت',
        validators: [],
        options: ['مذکر', 'مونثه'],
        // showIf: [],
      }),
      nationality: new FormControl2('', {
        type: 'select',
        label: 'ملیت',
        validators: [],
        options: ['ایرانی', 'آمریکایی', 'اماراتی'],
        // showIf: [],
      }),

      nationalCode: new FormControl2('', {
        type: 'text',
        label: 'کد ملی',
        validators: [],
        // showIf: [],
      }),
      fatherName: new FormControl2('', {
        type: 'text',
        label: 'نام پدر',
        validators: [],
        // showIf: [],
      }),
      bornDate: new FormControl2('', {
        type: 'date',
        label: 'تاریخ تولد',
        validators: [],
        // showIf: [],
      }),
      email: new FormControl2('', {
        type: 'email',
        label: 'ایمیل',
        validators: [],
        // showIf: [],
      }),
      isExchangeOffice: new FormControl2(false, {
        label: 'صراف هست',
        type: 'checkbox',
        validators: [],

        // showIf: [],
      }),
      country: new FormControl2('', {
        type: 'select',
        label: 'کشور',
        validators: [],
        options: ['ایران', ' آمریکا', 'امارات'],
        // showIf: [],
      }),
      city: new FormControl2('', {
        type: 'select',
        label: 'شهر',
        validators: [],
        options: ['تهران', 'بوشهر'],
        // showIf: [],
      }),
      address: new FormControl2('', {
        type: 'text',
        label: 'آدرس',
        validators: [],
        // showIf: [],
      }),
      zipCode: new FormControl2('', {
        type: 'text',
        label: 'کدپستی',
        validators: [],
        // showIf: [],
      }),
      isLegal: isLegal,
      // 'userType'=> 'حقوقی'
      companyOrStoreName: new FormControl2('', {
        type: 'text',
        label: 'نام شرکت  / فروشگاه',
        validators: [],
        show: false,
        // showIf: ['userType', 'حقوقی'],
      }),
      companyPhoneNumber: new FormControl2('', {
        type: 'phone-number',
        label: 'شماره تماس',
        validators: [],
        show: false,
        // showIf: ['userType', 'حقوقی'],
      }),
      companyEmail: new FormControl2('', {
        type: 'text',
        label: 'ایمیل شرکت',
        validators: [],
        show: false,
        // showIf: ['userType', 'حقوقی'],
      }),
      companyCountry: new FormControl2('', {
        type: 'text',
        label: 'کشور',
        validators: [],
        show: false,
        // showIf: ['userType', 'حقوقی'],
      }),
      companyAddress: new FormControl2('', {
        type: 'text',
        label: 'آدرس',
        validators: [],
        show: false,
        // showIf: ['userType', 'حقوقی'],
      }),
      companyZipCode: new FormControl2('', {
        type: 'text',
        label: 'کد پستی',
        validators: [],
        show: false,
        // showIf: ['userType', 'حقوقی'],
      }),
      //
    };
  }
  handleControls1ValuesChange(form1: CustomFormGroup) {
    const controls: DynamicControls1 = form1.controls as any;

    const { companyOrStoreName, companyPhoneNumber, companyEmail, companyCountry, companyAddress, companyZipCode } =
      controls;
    controls.isLegal.valueChanges.subscribe((val) => {
      console.log(val);
      if (val) toggleLegalControlsShow(true);
      else toggleLegalControlsShow(false);
    });

    function toggleLegalControlsShow(val: boolean) {
      companyOrStoreName.show = val;
      companyPhoneNumber.show = val;
      companyEmail.show = val;
      companyCountry.show = val;
      companyAddress.show = val;
      companyZipCode.show = val;
    }
  }
  _valuesOfObject(obj: object): any {
    return Object.values(obj);
  }
}
