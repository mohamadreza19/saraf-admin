import { Injectable } from '@angular/core';
import {
  FormArray2,
  FormControl2,
  PhoneControl,
} from 'src/app/shared/components/form-builder2/form-builder2.component';
import { Personal_LegalControls } from '../types/personal-legal.interface';
import { Validators } from '@angular/forms';
import { Gender } from 'src/app/shared/types/gender.enum';
import { CountyPreCode, getCountriesCode } from 'src/app/core/utils/get-countrire-code.util';
import { CustomFormGroup } from 'src/app/shared/form-builder/form-builder.component';
import { FormLabels } from '../constants';
import { AbstractFormService } from 'src/app/shared/types/abstract-form-service.interface';
import { CountryApiService, CountyResponse } from 'src/app/shared/apis/country-api.service';
import { CityApiService, CityResponse } from 'src/app/shared/apis/city-api.service';
import { Language, LanguageApiService } from 'src/app/shared/apis/language-api.service';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { ConvertControlsToAny } from 'src/app/shared/types/convert-controls-to-any';
import { Exchange, ExchangeApiService } from 'src/app/shared/apis/exchange-api.service';
import { convertGregorianTOJalali } from 'src/app/core/utils/convertGregorianToJalali';
import { fileLengthValidator } from 'src/app/shared/validators/file-length-validator';
import { mobileNumberValidator } from 'src/app/shared/validators/mobile-number-validator';
import { lengthValidator } from 'src/app/shared/validators/length-validator';

@Injectable({
  providedIn: 'root',
})
export class PersonalFormService implements AbstractFormService {
  data!: Exchange;
  mainForm!: CustomFormGroup;
  languages: Language[] = [];

  constructor(
    private languageApi: LanguageApiService,
    private countryApi: CountryApiService,
    private cityApi: CityApiService,
    public exchangeApi: ExchangeApiService,
  ) {}
  async apisCall(language$: BehaviorSubject<Language | null>) {
    // this.languages = await lastValueFrom(this.languageApi.getAllLanguages());
    // language$.next(this.languages[0]);
  }
  generateControls(): PersonalControls {
    const mobileCode = new FormControl2('', {
      label: '', // Marked for translation
      type: 'select',
      show: false,
      validators: [],
      options: [],
      optionObjImportantKey: 'dialCode',
    });

    return {
      language: new FormControl2('', {
        label: $localize`زبان پنل`, // Marked for translation
        type: 'select',
        options: [],
        optionObjImportantKey: 'id',
        validators: [Validators.required],
      }),
      mobileCode: mobileCode,
      mobile: new PhoneControl(
        '',
        {
          type: 'phone-number',
          show: true,
          label: $localize`شماره تماس`, // Marked for translation
          validators: [Validators.required],
        },
        mobileCode,
      ) as any,
      name: new FormControl2('', {
        type: 'text',
        label: $localize`:@@nameLabel:نام`, // Marked for translation
        validators: [Validators.required, Validators.minLength(2)],
      }),
      family: new FormControl2('', {
        type: 'text',
        label: $localize`نام خانوادگی`, // Marked for translation
        validators: [Validators.required, Validators.minLength(2)],
      }),
      picture: new FormControl2([], {
        type: 'files',
        label: $localize`بارگزاری یا انتخاب تصویر فردی`, // Marked for translation
        validators: [Validators.required, fileLengthValidator(1)],
        allowedFileTypes: ['pdf', 'jpeg', 'png', 'jpg'],
      }),
      nationalcode: new FormControl2('', {
        type: 'number',
        label: $localize`کد ملی`, // Marked for translation
        validators: [Validators.required, lengthValidator(10)],
      }),
      fathername: new FormControl2('', {
        type: 'text',
        label: $localize`نام پدر`, // Marked for translation
        validators: [Validators.required],
      }),
      nikename: new FormControl2('', {
        type: 'text',
        label: $localize`نام مستعار`, // Marked for translation
        validators: [Validators.required, Validators.maxLength(50)],
      }),
      gender: new FormControl2(true, {
        type: 'radio-checkbox',
        label: $localize`مذکر`, // Marked for translation
        validators: [Validators.required],
        options: [$localize`:@@maleOption:مذکر`, $localize`:@@femaleOption:مونث`], // Marked for translation
      }),
      isExchange: new FormControl2(false, {
        label: $localize`صراف هستم`, // Marked for translation
        type: 'checkbox',
        validators: [],
      }),
      birthday: new FormControl2('', {
        type: 'date',
        label: $localize`تاریخ تولد`, // Marked for translation
        validators: [Validators.required],
      }),
      email: new FormControl2('', {
        type: 'text',
        label: $localize`ایمیل`, // Marked for translation
        validators: [Validators.required, Validators.email],
      }),
      nationality: new FormControl2('', {
        type: 'select',
        label: $localize`ملیت`, // Marked for translation
        validators: [Validators.required],
      }),
      country: new FormControl2('', {
        type: 'select',
        label: $localize`کشور`, // Marked for translation
        validators: [Validators.required],
        optionObjImportantKey: 'id',
        options: [],
      }),
      city: new FormControl2('', {
        type: 'select',
        label: $localize`شهر`, // Marked for translation
        validators: [Validators.required],
        optionObjImportantKey: '_id',
        options: [],
      }),
      address: new FormControl2('', {
        type: 'text',
        label: $localize`آدرس`, // Marked for translation
        validators: [Validators.required, Validators.minLength(5)],
      }),
      postalcode: new FormControl2('', {
        type: 'text',
        label: $localize`کدپستی`, // Marked for translation
        validators: [Validators.required],
      }),
      location: new FormControl2(null, {
        label: $localize`انتخاب موقعیت روی نقشه`, // Marked for translation
        type: 'map',
        validators: [Validators.required],
      }),
      nature: new FormControl2(false, {
        type: 'checkbox',
        label: $localize`حقوقی`, // Marked for translation
        validators: [],
      }),
    };
  }

  generateForm() {
    const controls = this.generateControls();

    const form = new CustomFormGroup(controls, FormLabels.Personal, $localize`ادامه`);
    this.mainForm = form;
    return form;
  }
  beforeInit(data: Exchange, formStep$: BehaviorSubject<number>): void {
    this.data = data;
    // formStep$.next(data.step - 1 || 0);

    if (data) {
      setTimeout(() => formStep$.next(data.step - 1), 2000);
    }
  }
  async init(formArray: FormArray2, legalForm: CustomFormGroup, language$: BehaviorSubject<Language | null>) {
    const languages = await lastValueFrom(this.languageApi.getAllLanguages());
    if (!this.data) {
      language$.next(languages[0]);
    }

    const {
      language,
      mobile,
      mobileCode,
      name,
      family,
      picture,
      nationalcode,
      fathername,
      nikename,
      gender,
      nationality,
      isExchange,
      birthday,
      email,
      country,
      city,
      address,
      postalcode,
      location,
      nature,
    }: PersonalControls = this.mainForm.controls as any;
    if (languages.length) {
      language.setObjOptions(languages);
      language.options = languages.map((l) => l.title);
    }
    if (this.data) {
      const mountedLanguage = languages.find((l) => l.id == this.data.language) as Language;
      const countries = await lastValueFrom(this.countryApi.getAllByLanguageId(mountedLanguage.id));
      language.setValue(mountedLanguage.title);
      mobile.setValue(this.data.mobile);
      language$.next(mountedLanguage);
      //

      //
      const preCodes: CountyPreCode[] = countries.map((c) => ({
        dialCode: c.countryPreCode,
        code: c.countryPreCode,
        name: c.nikeName,
      }));

      mobileCode.setObjOptions(preCodes);
      mobileCode.options = preCodes.map((p) => `(${p.name} ${p.dialCode})`);
      const mountedMobileCode = preCodes.find((codes) =>
        codes.dialCode.includes(this.data.mobileCode),
      ) as CountyPreCode;
      if (mountedMobileCode) {
        mobileCode.setValue(`(${mountedMobileCode.name} ${mountedMobileCode.dialCode})`);

        mobile.setValidators([Validators.required, mobileNumberValidator(mountedMobileCode.dialCode)]);
      }
      //
      name.setValue(this.data.name);
      //
      family.setValue(this.data.family);
      //
      picture.setValue([this.data.picture]);
      //
      nationalcode.setValue(this.data.nationalcode);
      //
      fathername.setValue(this.data.fathername);
      //
      nikename.setValue(this.data.nikename);
      //
      gender.setValue(this.data.gender ? true : false);
      //
      nationality.setValue(this.data.nationality);
      //
      isExchange.setValue(this.data.isExchange ? true : false);

      //
      birthday.setValue(convertGregorianTOJalali(this.data.birthday));
      //
      email.setValue(this.data.email);

      //
      const options = countries.map((c) => c.title);
      const mountedCountry = countries.find((c) => c.id == this.data.country);
      country.setObjOptions(countries);
      country.options = options;
      country.setValue(mountedCountry?.title);

      //
      const cities = await lastValueFrom(this.cityApi.getAllByCountyId(this.data.country));
      if (cities) {
        city.setObjOptions(cities);
        city.options = cities.map((c) => c.title);
        city.setValue(city.options[0]);
      }
      //
      address.setValue(this.data.address);
      //
      postalcode.setValue(this.data.postalcode);
      //
      location.setValue([Number(this.data.location.lat), Number(this.data.location.lng)]);
      //
      nature.setValue(this.data.nature ? true : false);
      if (this.data.nature) {
        formArray.insert(1, legalForm);
      }
    }

    language.valueChanges.subscribe(async (v) => {
      const LanObj = language.getSelectedOptionAsObject() as Language;
      if (LanObj) {
        language$.next(LanObj);
        const countries = await lastValueFrom(this.countryApi.getAllByLanguageId(LanObj.id));
        if (countries) {
          const countriesOptions = countries.map((c) => c.title);
          country.setObjOptions(countries);
          country.options = countriesOptions;
          country.setValue(country.options[0]);

          nationality.options = countriesOptions;

          const preCodes: CountyPreCode[] = countries.map((c) => ({
            dialCode: c.countryPreCode,
            code: c.countryPreCode,
            name: c.nikeName,
          }));

          mobileCode.setObjOptions(preCodes);
          mobileCode.options = preCodes.map((p) => `(${p.name} ${p.dialCode})`);
          mobileCode.setValue(mobileCode.options[0]);
          mobile.setValidators([Validators.required, mobileNumberValidator(preCodes[0].dialCode)]);
        }
      }
    });

    country.valueChanges.subscribe(async () => {
      const countryObj = country.getSelectedOptionAsObject() as CountyResponse;

      if (countryObj) {
        const cities = await lastValueFrom(this.cityApi.getAllByCountyId(countryObj.id));
        if (cities) {
          city.setObjOptions(cities);
          city.options = cities.map((c) => c.title);
          city.setValue(city.options[0]);
        }
      }
    });

    nature.valueChanges.subscribe((v: boolean) => {
      const legalIndex = (formArray.controls as CustomFormGroup[]).findIndex((f) => f.rootLabel == FormLabels.Legal);
      if (v) {
        if (legalIndex == -1) {
          formArray.insert(1, legalForm);
        }
      } else if (legalIndex !== -1) formArray.removeAt(legalIndex);
    });
  }

  submit(exchangeId: string, values: ConvertControlsToAny<PersonalControls>) {
    if (exchangeId) return this.exchangeApi.patchExchangeById(exchangeId, values);
    else return this.exchangeApi.addExchange(values);
  }

  observerNatureControl() {}
}
export interface PersonalControls extends Personal_LegalControls {
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
