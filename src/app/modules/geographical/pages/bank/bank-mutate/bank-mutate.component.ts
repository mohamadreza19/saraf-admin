import { Component, inject, OnInit } from '@angular/core';

import { FormControl2 } from 'src/app/shared/components/form-builder2/form-builder2.component';
import { SingleFormMutateComponent } from 'src/app/core/base-components/single-form-mutate/single-form-mutate.component';
import { Validators } from '@angular/forms';
import { fileLengthValidator } from 'src/app/shared/validators/file-length-validator';
import { FormBuilder3Component } from '../../../../../shared/components/form-builder3/form-builder3.component';
import { CountryApiService, CountyResponse } from 'src/app/shared/apis/country-api.service';
import { CityApiService } from 'src/app/shared/apis/city-api.service';
import { Language, LanguageApiService } from 'src/app/shared/apis/language-api.service';
import { lastValueFrom } from 'rxjs';
import { CurrencyApiService } from 'src/app/shared/apis/currency-api.service';
import { BankApiService } from 'src/app/shared/apis/bank-api.service';
import { SwitchComponent } from '../../../../../shared/components/swtichs/switch/switch.component';

@Component({
  selector: 'app-bank-mutate',
  standalone: true,
  imports: [FormBuilder3Component, SwitchComponent],
  templateUrl: './bank-mutate.component.html',
  styleUrl: './bank-mutate.component.scss',
})
export class BankMutateComponent extends SingleFormMutateComponent<BankControls> implements OnInit {
  override successText: string = $localize`بانک با موفقیت ذخیره شد`;
  override formSubmitLabel: string = $localize`ذخیره`;

  country = inject(CountryApiService);
  city = inject(CityApiService);
  lan = inject(LanguageApiService);
  currency = inject(CurrencyApiService);
  override entityApiService = inject(BankApiService);

  constructor() {
    super();

    this.controls = {
      language: new FormControl2('', {
        type: 'select',
        label: $localize`زبان`,
        validators: [Validators.required],
        optionObjImportantKey: 'id',
      }),
      title: new FormControl2('', {
        type: 'text',
        label: $localize`عنوان`,
        validators: [Validators.required],
      }),

      country: new FormControl2('', {
        type: 'select',
        label: $localize`کشور`,
        optionObjImportantKey: 'id',
        validators: [Validators.required],
      }),
      city: new FormControl2('', {
        type: 'select',
        label: $localize`شهر`,
        optionObjImportantKey: '_id',
        validators: [Validators.required],
      }),

      currency: new FormControl2('', {
        label: $localize`واحد پول`,
        type: 'select',
        validators: [Validators.required],
        optionObjImportantKey: 'id',
      }),
      icon: new FormControl2([], {
        type: 'files',
        label: $localize`لوگو`,
        validators: [Validators.required, fileLengthValidator(1)],
      }),
      explain: new FormControl2('', {
        type: 'text',
        label: $localize`توضیحات`,
        validators: [Validators.required],
      }),
    };
  }

  override async handleAfterPostInitialization(controls: BankControls) {
    this.formLabel = $localize`افزودن بانک`;

    const {
      language: languageControl,
      country: countryControl,
      city: cityControl,
      currency: currencyControl,
    } = controls;

    const languages = await lastValueFrom(this.lan.getAllLanguages());

    if (languages.length) {
      languageControl.setObjOptions(languages);
      const options = languages.map((l) => l.title);
      languageControl.options = options;
      setTimeout(() => {
        languageControl.setValue(options[0]);
      }, 500);
    }

    languageControl.valueChanges.subscribe(async () => {
      const selected = languageControl.getSelectedOptionAsObject() as Language;
      const countries = await lastValueFrom(this.country.getAllByLanguageId(selected.id));
      const currencies = await lastValueFrom(this.currency.getAllByLanguageId(selected.id));

      if (countries.length) {
        countryControl.setObjOptions(countries);
        const options = countries.map((l) => l.title);
        countryControl.options = options;
        setTimeout(() => countryControl.setValue(options[0]), 300);
      }
      if (currencies.length) {
        currencyControl.setObjOptions(currencies);
        const options = currencies.map((cu) => cu.title);
        currencyControl.options = options;
        setTimeout(() => currencyControl.setValue(options[0]), 300);
      }
    });

    countryControl.valueChanges.subscribe(async () => {
      const country = countryControl.getSelectedOptionAsObject() as CountyResponse;
      const cities = await lastValueFrom(this.city.getAllByCountyId(country.id));

      if (cities.length) {
        cityControl.setObjOptions(cities);
        cityControl.options = cities.map((l) => l.title);
        const options = cities.map((l) => l.title);
        setTimeout(() => cityControl.setValue(options[0]), 300);
      }
    });
  }

  ngOnInit(): void {
    this.onInit();
  }
}

interface BankControls {
  title: FormControl2;
  language: FormControl2;
  explain: FormControl2;
  icon: FormControl2;
  currency: FormControl2;
  country: FormControl2;
  city: FormControl2;
}
