import { Injectable } from '@angular/core';
import { AbstractFormService } from 'src/app/shared/types/abstract-form-service.interface';

import { Personal_LegalControls } from '../types/personal-legal.interface';
import { FormControl2, PhoneControl } from 'src/app/shared/components/form-builder2/form-builder2.component';
import { Validators } from '@angular/forms';
import { CustomFormGroup } from 'src/app/shared/form-builder/form-builder.component';
import { FormLabels } from '../constants';
import { ExchangeApiService, ExchangeCompany } from 'src/app/shared/apis/exchange-api.service';
import { ConvertControlsToAny } from 'src/app/shared/types/convert-controls-to-any';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { Language } from 'src/app/shared/apis/language-api.service';
import { CountryApiService, CountyResponse } from 'src/app/shared/apis/country-api.service';
import { CityApiService, CityResponse } from 'src/app/shared/apis/city-api.service';
import { CountyPreCode } from 'src/app/core/utils/get-countrire-code.util';

@Injectable({
  providedIn: 'root',
})
export class LegalFormService implements AbstractFormService {
  mainForm!: CustomFormGroup;
  data?: ExchangeCompany;
  constructor(
    private exchangeApi: ExchangeApiService,
    private countryApi: CountryApiService,
    private cityApi: CityApiService,
  ) {}
  beforeInit(data: ExchangeCompany): void {
    this.data = data;
  }
  async init(language$: BehaviorSubject<Language | null>) {
    const { title, tel, telCode, country, city, address, location, postalcode }: LegalControls = this.mainForm
      .controls as any;
    if (this.data) {
    }
    language$.subscribe(async (language) => {
      let mountedCountry: CountyResponse | undefined;
      let mountedCity: CityResponse | undefined;
      let mountedTelCode: CountyPreCode | undefined;

      if (language) {
        const countries = await lastValueFrom(this.countryApi.getAllByLanguageId(language.id));

        if (this.data) {
          const cities = await lastValueFrom(this.cityApi.getAllByCountyId(this.data?.country as string));
          title.setValue(this.data.title);
          //
          tel.setValue(this.data.tel);
          //

          mountedCountry = countries.find((c) => c.id === this.data?.country);
          //

          mountedCity = cities.find((city) => city._id === this.data?.city);
          //

          if (mountedCountry) {
            mountedTelCode = {
              dialCode: mountedCountry.countryPreCode,
              code: mountedCountry.countryPreCode,
              name: mountedCountry.nikeName,
            };
            country.options = countries.map((c) => c.title);
            country.setObjOptions(countries);
            country.setValue(mountedCountry.title);
          }
          if (mountedCity) {
            city.options = cities.map((c) => c.title);
            city.setObjOptions(cities);
            city.setValue(mountedCity.title);
          }

          address.setValue(this.data.address);
          //
          location.setValue([Number(this.data.location.lat), Number(this.data.location.lng)]);
          //
          postalcode.setValue(this.data.postalcode);
        } else {
          mountedCountry = countries[0];
          mountedTelCode = {
            dialCode: countries[0].countryPreCode,
            code: countries[0].countryPreCode,
            name: countries[0].nikeName,
          };
        }

        //
        const preCodes: CountyPreCode[] = countries.map((c) => ({
          dialCode: c.countryPreCode,
          code: c.countryPreCode,
          name: c.nikeName,
        }));

        telCode.setObjOptions(preCodes);

        telCode.options = preCodes.map((p) => `(${p.name} ${p.dialCode})`);
        if (mountedTelCode) {
          telCode.setValue(`(${mountedTelCode.name} ${mountedTelCode.dialCode})`);
        }
      }
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
    });
  }
  apisCall(): void {}
  generateControls(): LegalControls {
    const mobileCode = new FormControl2('', {
      label: 'qwe',
      type: 'select',
      show: false,
      validators: [],
      options: [],
      optionObjImportantKey: 'dialCode',
    });

    return {
      title: new FormControl2('', {
        type: 'text',
        label: 'نام شرکت  / فروشگاه',
        validators: [Validators.required], // Required when visible
      }),
      tel: new PhoneControl(
        '',
        {
          type: 'phone-number',
          label: 'شماره تماس',
          validators: [Validators.required], // Required when visible, valid phone number
        },
        mobileCode,
      ),
      telCode: mobileCode,

      country: new FormControl2('', {
        type: 'select',
        label: 'کشور',
        validators: [Validators.required], // Required when visible
        optionObjImportantKey: 'id',
        options: [],
      }),
      city: new FormControl2('', {
        type: 'select',
        label: 'شهر',
        validators: [Validators.required], // Required when visible,
        optionObjImportantKey: '_id',
        options: [],
      }),
      address: new FormControl2('', {
        type: 'text',
        label: 'آدرس',
        validators: [Validators.required], // Required when visible
      }),
      location: new FormControl2([50, 50], {
        label: 'موقعیت روی نقشه',
        type: 'map',
        validators: [Validators.required],
      }),
      postalcode: new FormControl2('', {
        type: 'text',
        label: 'کد پستی',
        validators: [Validators.required, Validators.pattern(/^\d{10}$/)], // Required when visible, valid zip code
      }),
    };
  }
  generateForm() {
    const controls = this.generateControls();
    const form = new CustomFormGroup(controls, FormLabels.Legal, 'بعدی');

    this.mainForm = form;

    return form;
  }
  submit(exchangeId: string, values: ConvertControlsToAny<LegalControls>) {
    return this.exchangeApi.patchCompanyInfoByExchangeId(exchangeId, values);
  }
}

export interface LegalControls extends Personal_LegalControls {
  tel: FormControl2;
  telCode: FormControl2;
  title: FormControl2;
}
