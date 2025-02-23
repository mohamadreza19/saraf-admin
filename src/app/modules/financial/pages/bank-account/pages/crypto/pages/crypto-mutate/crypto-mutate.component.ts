import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  FormArray2,
  FormControl2,
  FormSubmitEmit,
} from 'src/app/shared/components/form-builder2/form-builder2.component';
import { FormBuilder3Component } from '../../../../../../../../shared/components/form-builder3/form-builder3.component';
import { Validators } from '@angular/forms';
import { CustomFormGroup } from 'src/app/shared/form-builder/form-builder.component';
import { LanguageApiService } from 'src/app/shared/apis/language-api.service';
import { lastValueFrom } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CountryApiService } from 'src/app/shared/apis/country-api.service';
import { BankAccountApiService } from 'src/app/shared/apis/bank-account-api.service';
import { BankAccountRouterLinkQuery } from '../../../../types';
import { FormSubmitService } from 'src/app/core/services/form-submit.service';

@Component({
  selector: 'app-crypto-mutate',
  standalone: true,
  imports: [FormBuilder3Component],
  templateUrl: './crypto-mutate.component.html',
  styleUrl: './crypto-mutate.component.css',
})
export class CryptoMutateComponent implements OnInit, OnDestroy {
  formArray = new FormArray2([]);
  step = 0;

  // Localized title for the component
  title = $localize`ثبت حساب رمز ارز`;

  formSubmit = inject(FormSubmitService);

  constructor(public route: ActivatedRoute, private bankAccountApi: BankAccountApiService) {}

  generateForm() {
    const controls: CryptoControls = {
      currencyName: new FormControl2('', {
        label: $localize`نام ارز`, // Localized label
        type: 'text',
        validators: [Validators.required],
      }),
      accountNumber: new FormControl2('', {
        label: $localize`شماره حساب`, // Localized label
        type: 'text',
        validators: [Validators.required],
      }),
      memo: new FormControl2('', {
        label: $localize`memo`, // Localized label
        type: 'text',
        validators: [Validators.required],
      }),
      transferPlatform: new FormControl2('', {
        label: $localize`بستر انتقال ارز دیجیتال`, // Localized label
        type: 'text',
        validators: [Validators.required],
      }),
      currencyType: new FormControl2('', {
        label: $localize`نوع ارز`, // Localized label
        type: 'text',
        options: [],
        validators: [Validators.required],
      }),
    };

    return new CustomFormGroup(controls, $localize`ثبت حساب رمز ارز`, $localize`ذخیره`);
  }

  ngOnInit(): void {
    const { currencyTypeId, languageId } = this.route.snapshot.queryParams as BankAccountRouterLinkQuery;
    const form = this.generateForm();
    const { currencyType }: CryptoControls = form.controls as any;
    currencyType.setValue(currencyTypeId);
    currencyType.disable();

    this.formArray.push(form);
  }

  ngOnDestroy(): void {
    this.formArray.clear();
  }

  async submit({ focusedForm, setStep }: FormSubmitEmit) {
    this.formSubmit.onSend(focusedForm.rootLabel as string);
    try {
      await lastValueFrom(this.bankAccountApi.postCrypto(focusedForm.getValues()));
      this.formSubmit.onfulfilled(focusedForm.rootLabel as string);
      // Localized success message
      this.formSubmit.successNav($localize`حساب رمز ارز با موفقیت ذخیره شد.`);
    } catch (error) {
      this.formSubmit.onError(error, this.formArray, (formIndex) => setStep(formIndex));
    }
  }
}

export interface CryptoControls {
  currencyName: FormControl2;
  accountNumber: FormControl2;
  memo: FormControl2;
  transferPlatform: FormControl2;
  currencyType: FormControl2;
}
