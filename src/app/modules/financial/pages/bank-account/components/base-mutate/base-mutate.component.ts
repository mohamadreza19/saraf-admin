import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormSubmitService } from 'src/app/core/services/form-submit.service';
import { BankAccountApiService } from 'src/app/shared/apis/bank-account-api.service';
import {
  FormArray2,
  FormControl2,
  FormSubmitEmit,
} from 'src/app/shared/components/form-builder2/form-builder2.component';

import { BankAccountRouterLinkQuery } from '../../types';
import { CustomFormGroup } from 'src/app/shared/form-builder/form-builder.component';
import { Validators } from '@angular/forms';
import { CryptoControls } from '../../pages/crypto/pages/crypto-mutate/crypto-mutate.component';
import { lastValueFrom } from 'rxjs';
import { CountryApiService, CountyResponse } from 'src/app/shared/apis/country-api.service';
import { CityApiService } from 'src/app/shared/apis/city-api.service';
import { Country } from 'angular-phone-number-input/data-types/country';

@Component({
  selector: 'app-base-mutate',
  standalone: true,
  imports: [],
  templateUrl: './base-mutate.component.html',
  styleUrl: './base-mutate.component.css',
})
export class BaseMutateComponent {
  formArray = new FormArray2([]);
  step = 0;
  title = 'ثبت حساب ';
  type: 'visa' | 'master' = 'visa';
  formSubmit = inject(FormSubmitService);
  constructor(
    public route: ActivatedRoute,
    public bankAccountApi: BankAccountApiService,

    private countryApi: CountryApiService,
    private cityApi: CityApiService,
  ) {}

  generateForm(): CustomFormGroup {
    const controls: GlobalControls = {
      bankName: new FormControl2('', {
        label: 'نام بانک',
        type: 'text',
        validators: [Validators.required],
      }),
      cardName: new FormControl2('', {
        label: 'نام کارت',
        type: 'text',
        validators: [Validators.required],
      }),
      iban: new FormControl2('', {
        label: 'شماره شبا',
        type: 'text',
        validators: [Validators.required],
      }),
      swift: new FormControl2('', {
        label: 'کد سوئیفت',
        type: 'text',
        validators: [Validators.required],
      }),
      accountNumber: new FormControl2('', {
        label: 'شماره حساب',
        type: 'text',
        validators: [Validators.required],
      }),
      country: new FormControl2('', {
        label: 'کشور',
        type: 'select',
        options: [],
        optionObjImportantKey: 'id',
        validators: [Validators.required],
      }),
      city: new FormControl2('', {
        label: 'شهر',
        type: 'select',
        options: [],
        optionObjImportantKey: '_id',
        validators: [Validators.required],
      }),
      currencyType: new FormControl2('', {
        label: 'نوع ارز',
        type: 'text',

        validators: [Validators.required],
      }),
    };

    return new CustomFormGroup(controls, this.title, 'ذخیره');
  }

  async ngOnInit() {
    const { currencyTypeId, languageId } = this.route.snapshot.queryParams as BankAccountRouterLinkQuery;
    const countries = await lastValueFrom(this.countryApi.getAllByLanguageId(languageId));

    const form = this.generateForm() as CustomFormGroup;
    const { currencyType, country, city }: GlobalControls = form.controls as any;
    currencyType.setValue(currencyTypeId);
    currencyType.disable();

    if (countries) {
      country.options = countries.map((c) => c.title);
      country.setObjOptions(countries);
      setTimeout(() => country.setValue(country.options[0]), 400);
    }

    country.valueChanges.subscribe(async () => {
      const countryObj = country.getSelectedOptionAsObject() as CountyResponse;

      const cities = await lastValueFrom(this.cityApi.getAllByCountyId(countryObj.id));

      if (cities) {
        city.options = cities.map((c) => c.title);
        city.setObjOptions(cities);
        setTimeout(() => city.setValue(city.options[0]), 400);
      }
    });

    this.formArray.push(form);
  }
  async submit({ focusedForm, setStep }: FormSubmitEmit) {
    this.formSubmit.onSend(focusedForm.rootLabel as string);
    try {
      switch (this.type) {
        case 'master':
          await lastValueFrom(this.bankAccountApi.postMasterCard(focusedForm.getValues()));
          break;
        case 'visa':
          await lastValueFrom(this.bankAccountApi.postVisaCard(focusedForm.getValues()));
          break;

        default:
          break;
      }

      this.formSubmit.onfulfilled(focusedForm.rootLabel as string);
      this.formSubmit.successNav(this.title + 'با موفقیت انجام شد');
    } catch (error) {
      this.formSubmit.onError(error, this.formArray, (formIndex) => setStep(formIndex));
    }
  }
  ngOnDestroy(): void {
    this.formArray.clear();
  }
}
export interface GlobalControls {
  bankName: FormControl2;
  cardName: FormControl2;
  iban: FormControl2;
  swift: FormControl2;
  accountNumber: FormControl2;
  country: FormControl2;
  city: FormControl2;
  currencyType: FormControl2;
}
