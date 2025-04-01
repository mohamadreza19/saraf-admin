import { Component, inject } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { FormSubmitService } from 'src/app/core/services/form-submit.service';
import { BankAccountApiService } from 'src/app/shared/apis/bank-account-api.service';
import { CityApiService } from 'src/app/shared/apis/city-api.service';
import { CountryApiService, CountyResponse } from 'src/app/shared/apis/country-api.service';
import {
  FormArray2,
  FormControl2,
  FormSubmitEmit,
} from 'src/app/shared/components/form-builder2/form-builder2.component';
import { CustomFormGroup } from 'src/app/shared/form-builder/form-builder.component';
import { BankAccountRouterLinkQuery } from '../../../../types';
import { FormBuilder3Component } from '../../../../../../../../shared/components/form-builder3/form-builder3.component';

@Component({
  selector: 'app-ir-mutate',
  standalone: true,
  imports: [FormBuilder3Component],
  templateUrl: './ir-mutate.component.html',
  styleUrl: './ir-mutate.component.css',
})
export class IrMutateComponent {
  formArray = new FormArray2([]);
  step = 0;
  title = ' ثبت حساب ایرانی';
  formSubmit = inject(FormSubmitService);
  constructor(
    public route: ActivatedRoute,
    public bankAccountApi: BankAccountApiService,

    private countryApi: CountryApiService,
    private cityApi: CityApiService,
  ) {}

  generateForm(): CustomFormGroup {
    const controls: IRControls = {
      bankName: new FormControl2('', {
        label: 'نام بانک',
        type: 'text',
        validators: [Validators.required],
      }),
      branchName: new FormControl2('', {
        label: 'نام شعبه',
        type: 'text',
        validators: [Validators.required],
      }),
      cardNumber: new FormControl2('', {
        label: 'شماره کارت',
        type: 'text',
        validators: [Validators.required],
      }),
      irNumber: new FormControl2('', {
        label: 'شماره  شبا',
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
    const { currencyType, country, city }: IRControls = form.controls as any;
    currencyType.setValue(currencyTypeId);
    currencyType.disable();

    if (countries) {
      country.options = countries.map((c) => c.title);
      country.setObjOptions(countries);
      setTimeout(() => {
        country.setValue(countries.find((c) => c.countryPreCode.includes('98'))?.title);

        country.disable();
      }, 400);
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
      await lastValueFrom(this.bankAccountApi.postIr(focusedForm.getValues()));

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

export interface IRControls {
  bankName: FormControl2;
  branchName: FormControl2;
  cardNumber: FormControl2;
  irNumber: FormControl2;
  accountNumber: FormControl2;
  country: FormControl2;
  city: FormControl2;
  currencyType: FormControl2;
}
