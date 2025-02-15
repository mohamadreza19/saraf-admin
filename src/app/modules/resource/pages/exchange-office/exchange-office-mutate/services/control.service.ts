import { Injectable, TemplateRef } from '@angular/core';
import { Validators } from '@angular/forms';
import { getCountriesCode } from 'src/app/core/utils/get-countrire-code.util';
import { FormControl2, PhoneControl } from 'src/app/shared/components/form-builder2/form-builder2.component';
import { Gender } from 'src/app/shared/types/gender.enum';

@Injectable({
  providedIn: 'root',
})
export class ControlService {
  constructor() {}
  generatePersonalControls(): PersonalControls {
    const countries = getCountriesCode();
    const mobileCode = new FormControl2('', {
      label: 'qwe',
      type: 'select',
      show: false,
      validators: [],
      options: countries.map((c) => `${c.code} (+${c.dialCode})`),
      selectedOptionIndex: 0,
    });
    mobileCode.setObjOptions(countries);
    return {
      mobileCode: mobileCode,
      mobile: new PhoneControl(
        '918768811',
        {
          type: 'phone-number',
          show: true,
          label: 'شماره تماس',
          validators: [Validators.required], // Required and a valid Iranian phone number
        },
        mobileCode,
      ) as any,
      name: new FormControl2('ali', {
        type: 'text',
        label: 'نام',
        validators: [Validators.required, Validators.minLength(2)], // Required, minimum length 2
      }),
      family: new FormControl2('rezaee', {
        type: 'text',
        label: 'نام خانوادگی',
        validators: [Validators.required, Validators.minLength(2)], // Required, minimum length 2
      }),
      picture: new FormControl2(
        ['http://185.110.191.40:2020/public/exchange-pic/Gemini_Generated_Image_lhgifflhgifflhgi-1737691248896.jpeg'],
        {
          type: 'files',
          filesLength: 1,
          label: 'بارگزاری یا انتخاب تصویر فردی',
          validators: [Validators.required], // File upload is required
          allowedFileTypes: ['pdf', 'jpeg', 'png', 'jpg'],
        },
      ),
      nationalcode: new FormControl2('1234567891', {
        type: 'text',
        label: 'کد ملی',
        validators: [Validators.required, Validators.pattern(/^\d{10}$/)], // Required, exactly 10 digits
      }),
      fathername: new FormControl2('ali', {
        type: 'text',
        label: 'نام پدر',
        validators: [Validators.required], // Required
      }),
      nikename: new FormControl2('mrzar', {
        type: 'text',
        label: 'نام مستعار',
        validators: [Validators.required, Validators.maxLength(50)], // Optional, maximum length 50
      }),
      gender: new FormControl2('', {
        type: 'select',
        label: 'جنسیت',
        validators: [Validators.required], // Required
        options: Object.values(Gender),
        selectedOptionIndex: 0,
      }),
      nationality: new FormControl2('ایرانی', {
        type: 'select',
        label: 'ملیت',
        validators: [Validators.required], // Required
        options: ['ایرانی', 'آمریکایی', 'اماراتی'],
      }),
      isExchange: new FormControl2(true, {
        label: 'صراف هست',
        type: 'checkbox',
        validators: [], // No validators
      }),

      birthday: new FormControl2(new Date().getTime(), {
        type: 'date',
        label: 'تاریخ تولد',
        validators: [Validators.required], // Required
      }),
      language: new FormControl2('', {
        label: 'زبان پنل',
        type: 'select',
        options: ['فارسی', 'انگلیسی'],
        validators: [Validators.required], // Required
      }),
      email: new FormControl2('test@email.com', {
        type: 'email',
        label: 'ایمیل',
        validators: [Validators.required, Validators.email], // Valid email format
      }),
      country: new FormControl2('', {
        type: 'select',
        label: 'کشور',
        validators: [Validators.required], // Required
        options: [],
      }),
      city: new FormControl2('', {
        type: 'select',
        label: 'شهر',
        validators: [Validators.required], // Required
        options: [],
      }),
      address: new FormControl2('test address', {
        type: 'text',
        label: 'آدرس',
        validators: [Validators.required, Validators.minLength(5)], // Required, minimum length 5
      }),
      postalcode: new FormControl2('1234567891', {
        type: 'text',
        label: 'کدپستی',
        validators: [Validators.required, Validators.pattern(/^\d{10}$/)], // Required, exactly 10 digits
      }),
      location: new FormControl2([50, 50], {
        label: 'انتخاب موقعیت روی نقشه',
        type: 'map',
        validators: [Validators.required],
      }),
      nature: new FormControl2(false, {
        type: 'checkbox',
        label: 'حقوقی',
        validators: [], // No validators
      }),
    };
  }
  // generatePersonalControls(): PersonalControls {
  //   return {
  //     mobile: new FormControl2('', {
  //       type: 'phone-number',
  //       label: 'شماره تماس',
  //       validators: [Validators.required, Validators.pattern(/^09\d{9}$/)], // Required and a valid Iranian phone number
  //     }),
  //     name: new FormControl2('', {
  //       type: 'text',
  //       label: 'نام',
  //       validators: [Validators.required, Validators.minLength(2)], // Required, minimum length 2
  //     }),
  //     family: new FormControl2('', {
  //       type: 'text',
  //       label: 'نام خانوادگی',
  //       validators: [Validators.required, Validators.minLength(2)], // Required, minimum length 2
  //     }),
  //     picture: new FormControl2([], {
  //       type: 'files',
  //       filesLength: 1,
  //       label: 'بارگزاری یا انتخاب تصویر فردی',
  //       validators: [Validators.required], // File upload is required
  //       allowedFileTypes: ['pdf', 'jpeg', 'png', 'jpg'],
  //     }),
  //     nikename: new FormControl2('', {
  //       type: 'text',
  //       label: 'نام مستعار',
  //       validators: [Validators.required, Validators.maxLength(50)], // Optional, maximum length 50
  //     }),
  //     gender: new FormControl2('', {
  //       type: 'select',
  //       label: 'جنسیت',
  //       validators: [Validators.required], // Required
  //       options: ['مذکر', 'مونثه'],
  //     }),
  //     nationality: new FormControl2('', {
  //       type: 'select',
  //       label: 'ملیت',
  //       validators: [Validators.required], // Required
  //       options: ['ایرانی', 'آمریکایی', 'اماراتی'],
  //     }),
  //     isExchange: new FormControl2('', {
  //       label: 'صراف هست',
  //       type: 'checkbox',
  //       validators: [], // No validators
  //     }),
  //     nationalcode: new FormControl2('', {
  //       type: 'text',
  //       label: 'کد ملی',
  //       validators: [Validators.required, Validators.pattern(/^\d{10}$/)], // Required, exactly 10 digits
  //     }),
  //     fathername: new FormControl2('', {
  //       type: 'text',
  //       label: 'نام پدر',
  //       validators: [Validators.required], // Required
  //     }),
  //     birthday: new FormControl2('', {
  //       type: 'date',
  //       label: 'تاریخ تولد',
  //       validators: [Validators.required], // Required
  //     }),
  //     language: new FormControl2('', {
  //       label: 'زبان پنل',
  //       type: 'select',
  //       options: ['فارسی', 'انگلیسی'],
  //       validators: [Validators.required], // Required
  //     }),
  //     email: new FormControl2('', {
  //       type: 'email',
  //       label: 'ایمیل',
  //       validators: [Validators.required, Validators.email], // Valid email format
  //     }),
  //     country: new FormControl2('', {
  //       type: 'select',
  //       label: 'کشور',
  //       validators: [Validators.required], // Required
  //       options: ['ایران', ' آمریکا', 'امارات'],
  //     }),
  //     city: new FormControl2('', {
  //       type: 'select',
  //       label: 'شهر',
  //       validators: [Validators.required], // Required
  //       options: ['تهران', 'بوشهر'],
  //     }),
  //     address: new FormControl2('', {
  //       type: 'text',
  //       label: 'آدرس',
  //       validators: [Validators.required, Validators.minLength(5)], // Required, minimum length 5
  //     }),
  //     postalcode: new FormControl2('', {
  //       type: 'text',
  //       label: 'کدپستی',
  //       validators: [Validators.required, Validators.pattern(/^\d{10}$/)], // Required, exactly 10 digits
  //     }),
  //     location: new FormControl2('', {
  //       label: 'انتخاب موقعیت روی نقشه',
  //       type: 'map',
  //       validators: [Validators.required],
  //     }),
  //     nature: new FormControl2('', {
  //       type: 'checkbox',
  //       label: 'حقوقی',
  //       validators: [], // No validators
  //     }),
  //   };
  // }
  generateLegalControls(): LegalControls {
    const countries = getCountriesCode();
    const mobileCode = new FormControl2('', {
      label: 'qwe',
      type: 'select',
      show: false,
      validators: [],
      options: countries.map((c) => `${c.code} (+${c.dialCode})`),
      selectedOptionIndex: 0,
    });
    mobileCode.setObjOptions(countries);

    return {
      title: new FormControl2('test company', {
        type: 'text',
        label: 'نام شرکت  / فروشگاه',
        validators: [Validators.required], // Required when visible
      }),
      tel: new PhoneControl(
        '09032446913',
        {
          type: 'text',
          label: 'شماره تماس',
          validators: [Validators.required, Validators.pattern(/^09\d{9}$/)], // Required when visible, valid phone number
        },
        mobileCode,
      ),
      telCode: mobileCode,
      // companyEmail: new FormControl2('companyTest@gemail.com', {
      //   type: 'text',
      //   label: 'ایمیل شرکت',
      //   validators: [Validators.email], // Valid email format
      // }),
      country: new FormControl2('', {
        type: 'select',
        label: 'کشور',
        validators: [Validators.required], // Required when visible
        options: [],
      }),
      city: new FormControl2('', {
        type: 'select',
        label: 'شهر',
        validators: [Validators.required], // Required when visible,
        options: [],
      }),
      address: new FormControl2('eqweweq', {
        type: 'text',
        label: 'آدرس',
        validators: [Validators.required], // Required when visible
      }),
      location: new FormControl2([50, 50], {
        label: 'موقعیت روی نقشه',
        type: 'map',
        validators: [Validators.required],
      }),
      postalcode: new FormControl2('1234567891', {
        type: 'text',
        label: 'کد پستی',
        validators: [Validators.required, Validators.pattern(/^\d{10}$/)], // Required when visible, valid zip code
      }),
    };
  }
  // generateLegalControls(): LegalControls {
  //   return {
  //     companyOrStoreName: new FormControl2('', {
  //       type: 'text',
  //       label: 'نام شرکت  / فروشگاه',
  //       validators: [Validators.required], // Required when visible
  //     }),
  //     companyPhoneNumber: new FormControl2('', {
  //       type: 'text',
  //       label: 'شماره تماس',
  //       validators: [Validators.required, Validators.pattern(/^09\d{9}$/)], // Required when visible, valid phone number
  //     }),
  //     companyEmail: new FormControl2('', {
  //       type: 'text',
  //       label: 'ایمیل شرکت',
  //       validators: [Validators.email], // Valid email format
  //     }),
  //     companyCountry: new FormControl2('', {
  //       type: 'text',
  //       label: 'کشور',
  //       validators: [Validators.required], // Required when visible
  //     }),
  //     companyAddress: new FormControl2('', {
  //       type: 'text',
  //       label: 'آدرس',
  //       validators: [Validators.required], // Required when visible
  //     }),
  //     companyZipCode: new FormControl2('', {
  //       type: 'text',
  //       label: 'کد پستی',
  //       validators: [Validators.required, Validators.pattern(/^\d{10}$/)], // Required when visible, valid zip code
  //     }),
  //   };
  // }
  generateModulesControls(addModuleTemplate: TemplateRef<any>, preReceiptTemplate: TemplateRef<any>): ModulesControls {
    return {
      requestedModules: new FormControl2('', {
        label: 'ماژول های درخواستی',
        type: 'select',
        options: ['خرید فروش ارز'],
        validators: [],
        templateRef: addModuleTemplate,
      }),

      discount_: new FormControl2('', {
        label: 'تخفیف',
        type: 'number',
        validators: [],
      }),
      bankAccount: new FormControl2('', {
        label: 'به حساب',
        type: 'select',
        selectOptionsLength: 1,
        options: ['حسابی ثبت نشده'],
        validators: [Validators.required],
        selectedOptionIndex: 0,
      }),
      preReceipt_: new FormControl2(
        {
          total: '0',
          discount: '0',
          availablePrice: '0',
          currencyUnit: 'null',
        } as PreReceiptVal,
        {
          templateRef: preReceiptTemplate,
          label: '',
          type: 'text',
          validators: [],
        },
      ),
      isDeposit: new FormControl2('', {
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
    };
  }
  generateDocControls(addDocsTemplate: TemplateRef<any>) {
    return {
      docs_: new FormControl2('', {
        type: 'files',
        label: '',
        templateRef: addDocsTemplate,
        validators: [],
      }),
    };
  }
}
export interface Personal_LegalCommonControls {
  city: FormControl2;
  country: FormControl2;

  address: FormControl2;
  postalcode: FormControl2;
  location: FormControl2;
}
export interface PersonalControls extends Personal_LegalCommonControls {
  mobile: FormControl2;
  mobileCode: FormControl2;
  name: FormControl2;
  family: FormControl2;
  picture: FormControl2;
  nikename: FormControl2;
  gender: FormControl2;
  nationality: FormControl2;
  isExchange: FormControl2;
  nationalcode: FormControl2;
  fathername: FormControl2;
  birthday: FormControl2;
  language: FormControl2;
  email: FormControl2;
  // country: FormControl2;
  // city: FormControl2;
  // address: FormControl2;
  // postalcode: FormControl2;
  // location: FormControl2;
  nature: FormControl2; // legal
}

export interface LegalControls extends Personal_LegalCommonControls {
  title: FormControl2;
  tel: PhoneControl;
  telCode: FormControl2;
  // companyEmail: FormControl2;
}

export interface ModulesControls {
  requestedModules: FormControl2;
  discount_: FormControl2;
  bankAccount: FormControl2;
  preReceipt_: FormControl2;
  isDeposit: FormControl2;
  noNeedReceipt: FormControl2;
  receipt: FormControl2;
}

export interface PreReceiptVal {
  total: string;
  discount: string;
  availablePrice: string;
  currencyUnit: string;
}
