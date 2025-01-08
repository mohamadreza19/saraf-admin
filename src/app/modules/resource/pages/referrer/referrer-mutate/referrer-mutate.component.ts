import { Component } from '@angular/core';
import { CustomFormGroup } from 'src/app/shared/form-builder/form-builder.component';
import { HeaderButtonsComponent } from '../../../../financial/components/header-buttons/header-buttons.component';
import { toggleFormControlsVisibility } from 'src/app/shared/utils/toggle-form-controls-visibility.util';
import { FormBuilder2Component, FormControl2 } from 'src/app/shared/components/form-builder2/form-builder2.component';

@Component({
  selector: 'app-referrer-mutate',
  standalone: true,
  imports: [HeaderButtonsComponent, FormBuilder2Component],
  templateUrl: './referrer-mutate.component.html',
  styleUrl: './referrer-mutate.component.css',
})
export class ReferrerMutateComponent {
  forms: CustomFormGroup[] = [];
  userType!: FormControl2;
  hasCreditAccount!: FormControl2;
  currencyUnit!: FormControl2;
  constructor() {
    this.initForms();
  }

  initForms() {
    this.userType = new FormControl2('', {
      type: 'checkbox',
      label: 'حقوقی',
      validators: [],

      // showIf: [],
    });

    this.hasCreditAccount = new FormControl2('', {
      type: 'checkbox',
      label: 'حساب اعتباری دارد',

      validators: [],
    });

    this.currencyUnit = new FormControl2('', {
      type: 'select',
      label: 'واحد',
      validators: [],
      options: ['ریال ', 'master/visa', 'cryptocurrency'],
      selectedOptionIndex: 0,
      // showIf: [],
    });
    const controls = {
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
      userType: this.userType,
      // 'userType'=> 'حقوقی'
      companyOrStoreName: new FormControl2('', {
        type: 'text',
        label: 'نام شرکت  / فروشگاه',
        validators: [],
        // showIf: ['userType', 'حقوقی'],
      }),
      companyPhoneNumber: new FormControl2('', {
        type: 'phone-number',
        label: 'شماره تماس',
        validators: [],
        // showIf: ['userType', 'حقوقی'],
      }),
      companyEmail: new FormControl2('', {
        type: 'text',
        label: 'ایمیل شرکت',
        validators: [],
        // showIf: ['userType', 'حقوقی'],
      }),
      companyCountry: new FormControl2('', {
        type: 'text',
        label: 'کشور',
        validators: [],
        // showIf: ['userType', 'حقوقی'],
      }),
      companyAddress: new FormControl2('', {
        type: 'text',
        label: 'آدرس',
        validators: [],
        // showIf: ['userType', 'حقوقی'],
      }),
      companyZipCode: new FormControl2('', {
        type: 'text',
        label: 'کد پستی',
        validators: [],
        // showIf: ['userType', 'حقوقی'],
      }),
      //
    };
    const controls2 = {
      accountStatus: new FormControl2([], {
        type: 'select',
        label: 'وضعیت حساب',
        validators: [],
        options: ['بدهکار', 'بستانکار', 'بستانکار'],
        // showIf: [],
      }),
      currencyUnit: new FormControl2('', {
        type: 'select',
        label: 'واحد',
        validators: [],
        options: ['درهم'],
        // showIf: [],
      }),
      amount: new FormControl2('', {
        label: 'مبلغ',
        type: 'text',
        // showIf: [],
        validators: [],
      }),
      hasCreditAccount: this.hasCreditAccount,
      // hasCreditAccount =>  true
      creditAccountCurrencyUnit: new FormControl2('', {
        type: 'select',
        label: 'واحد',
        validators: [],
        options: ['درهم'],
        // showIf: ['haveCreditAccount', 'حساب اعتباری دارد'],
      }),
      creditAccountAmount: new FormControl2('', {
        label: 'مبلغ',
        type: 'text',
        // showIf: ['haveCreditAccount', 'حساب اعتباری دارد'],
        validators: [],
      }),
    };
    const controls3 = {
      currencyUnit: this.currencyUnit,
      // ir card
      country: new FormControl2('', {
        type: 'select',
        label: 'کشور',
        validators: [],
        options: ['ایران', ' امریکا', 'امارات'],
        // showIf: [],
      }),
      city: new FormControl2('', {
        type: 'select',
        label: 'شهر',
        validators: [],
        options: ['تهران', 'بوشهر'],
        // showIf: [],
      }),

      bankBranchName: new FormControl2('', {
        type: 'text',
        label: 'نام شعبه بانکی',
        validators: [],
        // showIf: ['currencyUnit', 'ریال'],
      }),
      bankBranchCode: new FormControl2('', {
        type: 'text',
        label: 'کد شعبه بانکی',
        validators: [],
        // showIf: ['currencyUnit', 'ریال'],
      }),
      bankAccountNumber: new FormControl2('', {
        type: 'text',
        label: 'شماره حساب بانکی',
        validators: [],
        // showIf: ['currencyUnit', 'ریال'],
      }),
      bankCardNumber: new FormControl2('', {
        label: 'شماره کارت',
        type: 'text',
        // showIf: ['currencyUnit', 'ریال'],
        validators: [],
      }),
      IBAN: new FormControl2('', {
        type: 'text',
        label: 'شماره شبای بانکی',
        // showIf: ['currencyUnit', 'ریال'],
        validators: [],
      }),
      // master / visa
      foreignCardType: new FormControl2('', {
        type: 'select',
        label: 'نوع حساب',
        validators: [],
        options: ['master', 'visa'],
        // showIf: ['currencyUnit', 'master/visa'],
      }),
      foreignCardCountry: new FormControl2('', {
        type: 'select',
        label: 'کشور',
        validators: [],
        options: ['ایران', ' امریکا', 'امارات'],
        // showIf: ['currencyUnit', 'master/visa'],
      }),
      foreignCardCity: new FormControl2('', {
        type: 'select',
        label: 'شهر',
        validators: [],
        options: ['تهران', 'بوشهر'],
        // showIf: ['currencyUnit', 'master/visa'],
      }),
      bankName: new FormControl2('', {
        type: 'text',
        label: 'نام بانک',
        options: ['AFN Bank', 'RED bank'],
        validators: [],
        // showIf: ['currencyUnit', 'master/visa'],
      }),
      nameOnCard: new FormControl2('', {
        type: 'text',
        label: 'نام روی کارت',
        validators: [],
        // showIf: ['currencyUnit', 'master/visa'],
      }),
      foreignIBAN: new FormControl2('', {
        type: 'text',
        label: 'IBAN',
        validators: [],
        // showIf: ['currencyUnit', 'master/visa'],
      }),
      swift: new FormControl2('', {
        type: 'text',
        label: 'SWIFT',
        validators: [],
        // showIf: ['currencyUnit', 'master/visa'],
      }),
      // cryptocurrency currency
      cryptocurrencyType: new FormControl2('', {
        type: 'select',
        label: 'رمز ارز',
        validators: [],
        options: ['BTC', 'BNB'],
        // showIf: ['currencyUnit', 'cryptocurrency'],
      }),
      cryptocurrencyTransferPlatform: new FormControl2('', {
        type: 'select',
        label: 'بستر انتقال',
        validators: [],
        options: ['TRC20', 'ERC20'],
        // showIf: ['currencyUnit', 'cryptocurrency'],
      }),
      cryptocurrencywalletAddress: new FormControl2('', {
        label: 'شماره حساب کیف پول',
        type: 'text',
        // showIf: ['currencyUnit', 'cryptocurrency'],
        validators: [],
      }),
      cryptocurrencyMemo: new FormControl2('', {
        label: 'memo',
        type: 'text',
        // showIf: ['currencyUnit', 'cryptocurrency'],
        validators: [],
      }),
    };
    const controls4 = {
      documentType: new FormControl2('', {
        type: 'select',
        label: 'انواع مدارک',
        validators: [],
        options: ['تاریخ دار', 'همیشگی'],
        // showIf: [],
      }),
      docs: new FormControl2([], {
        type: 'files',
        filesLength: 10,
        label: ' بارگزاری مدارک',
        validators: [],
        // showIf: [],
        allowedFileTypes: ['pdf', 'png', 'jpg', 'jpeg'],
      }),
      activeStatus: new FormControl2([], {
        type: 'checkbox',
        label: '',
        validators: [],
        options: ['فعال'],
        // showIf: [],
      }),
    };

    const form1: CustomFormGroup = new CustomFormGroup(controls, 'اطلاعات شخصی', 'بعدی');
    const form2: CustomFormGroup = new CustomFormGroup(controls2, 'اطلاعات مالی', 'بعدی');
    const form3: CustomFormGroup = new CustomFormGroup(controls3, 'ثبت  حساب', 'ثبت');
    const form4: CustomFormGroup = new CustomFormGroup(controls4, 'ثبت مدارک', 'ثبت');

    // this.forms.push(form1);
    // this.forms.push(form2);

    this.forms = [form1, form2, form3, form4];
    if (this.userType.value) {
      toggleFormControlsVisibility(controls, [
        'userType',
        'phoneNumber',
        'file',
        'name',
        'username',
        'nicName',
        'gender',
        'nationality',
        'nationalCode',
        'fatherName',
        'bornDate',
        'email',
        'country',
        'city',
        'address',
        'zipCode',
        //
        'companyOrStoreName',
        'companyPhoneNumber',
        'companyEmail',
        'companyCountry',
        'companyAddress',
        'companyZipCode',
      ]);
    } else {
      toggleFormControlsVisibility(controls, [
        'userType',
        'phoneNumber',
        'file',
        'name',
        'username',
        'nicName',
        'gender',
        'nationality',
        'nationalCode',
        'fatherName',
        'bornDate',
        'email',
        'country',
        'city',
        'address',
        'zipCode',
      ]);
    }

    this.userType.valueChanges.subscribe((value) => {
      if (value) {
        toggleFormControlsVisibility(controls, [
          'userType',
          'phoneNumber',
          'file',
          'name',
          'username',
          'nicName',
          'gender',
          'nationality',
          'nationalCode',
          'fatherName',
          'bornDate',
          'email',
          'country',
          'city',
          'address',
          'zipCode',
          //
          'companyOrStoreName',
          'companyPhoneNumber',
          'companyEmail',
          'companyCountry',
          'companyAddress',
          'companyZipCode',
        ]);
      } else {
        toggleFormControlsVisibility(controls, [
          'userType',
          'phoneNumber',
          'file',
          'name',
          'username',
          'nicName',
          'gender',
          'nationality',
          'nationalCode',
          'fatherName',
          'bornDate',
          'email',
          'country',
          'city',
          'address',
          'zipCode',
        ]);
      }
    });

    if (this.hasCreditAccount.value) {
      toggleFormControlsVisibility(controls2, [
        'accountStatus',
        'currencyUnit',
        'amount',
        'hasCreditAccount',
        //
        'creditAccountCurrencyUnit',
        'creditAccountAmount',
      ]);
    } else {
      toggleFormControlsVisibility(controls2, [
        'accountStatus',
        'currencyUnit',
        'amount',
        'hasCreditAccount',
        //
        // "creditAccountCurrencyUnit",
        // "creditAccountAmount",
      ]);
    }
    this.hasCreditAccount.valueChanges.subscribe((value) => {
      if (value) {
        toggleFormControlsVisibility(controls2, [
          'accountStatus',
          'currencyUnit',
          'amount',
          'hasCreditAccount',
          //
          'creditAccountCurrencyUnit',
          'creditAccountAmount',
        ]);
      } else {
        toggleFormControlsVisibility(controls2, [
          'accountStatus',
          'currencyUnit',
          'amount',
          'hasCreditAccount',
          //
          // "creditAccountCurrencyUnit",
          // "creditAccountAmount",
        ]);
      }
    });

    this.currencyUnit.valueChanges.subscribe((value) => {
      switch (value) {
        case 'ریال ':
          toggleFormControlsVisibility(controls3, [
            'currencyUnit',
            'country',
            'city',
            'bankBranchName',
            'bankBranchCode',
            'bankAccountNumber',
            'bankCardNumber',
            'IBAN',
          ]);
          break;
        case 'master/visa':
          toggleFormControlsVisibility(controls3, [
            'currencyUnit',

            'foreignCardType',
            'foreignCardCountry',
            'foreignCardCity',
            'bankName',
            'nameOnCard',
            'foreignIBAN',
            'swift',
          ]);
          break;
        case 'cryptocurrency':
          toggleFormControlsVisibility(controls3, [
            'currencyUnit',
            'cryptocurrencyType',
            'cryptocurrencyTransferPlatform',
            'cryptocurrencywalletAddress',
            'cryptocurrencyMemo',
          ]);
          break;

        default:
          break;
      }
    });
  }
}
