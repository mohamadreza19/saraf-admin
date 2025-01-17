import { Injectable } from '@angular/core';
import { FormControl2 } from 'src/app/shared/components/form-builder2/form-builder2.component';
import { CryptocurrencyAccount, InternationalAccount } from '../controls';
import { CustomFormGroup } from 'src/app/shared/form-builder/form-builder.component';
import { FINANCIAL_ACCOUNT_TYPES } from '../../../constants/finantial-account-types';
import { BANK_ACCOUNT_TYPES } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class InternationalAccountService {
  public form!: CustomFormGroup;
  constructor() {}

  initiateForm(submit: (form: CustomFormGroup) => void) {
    const controls2 = this.initiateControls2(FINANCIAL_ACCOUNT_TYPES.INTERNATIONAL, Object.values(BANK_ACCOUNT_TYPES));
    this.form = new CustomFormGroup(controls2, 'ثبت حساب بین المللی', 'ثبت', submit);
  }
  private initiateControls2(bankIdentity: string, BANK_ACCOUNT_TYPES: string[]): InternationalAccount {
    return {
      bankIdentity: new FormControl2(bankIdentity, {
        label: 'هویت بانک',
        type: 'text',
        validators: [],
      }),
      bankName: new FormControl2('test-bank1', {
        label: 'نام بانک',
        type: 'text',
        validators: [],
      }),
      currencyUnit: new FormControl2('', {
        label: 'واحد ارزی',
        type: 'select',
        options: ['دلار'], // Add more currency options if needed
        selectedOptionIndex: 0,
        validators: [],
      }),
      cardNumber: new FormControl2('', {
        label: 'شماره کارت',
        type: 'text',
        validators: [],
      }),
      ibanNumber: new FormControl2('', {
        label: 'شماره شبا',
        type: 'text',
        validators: [],
      }),
      cardholderFullName: new FormControl2('', {
        label: 'نام کامل روی کارت',
        type: 'text',
        validators: [],
      }),
      accountType: new FormControl2('', {
        label: 'نوع حساب',
        type: 'select',
        options: BANK_ACCOUNT_TYPES,
        selectedOptionIndex: 0,
        validators: [],
      }),
      initialBalance: new FormControl2('', {
        label: 'موجودی اولیه',
        type: 'text',
        validators: [],
      }),
      minimumTransferFee: new FormControl2('', {
        label: 'حداقل هزینه انتقال',
        type: 'text',
        validators: [],
      }),
      maximumTransferFee: new FormControl2('', {
        label: 'ماکزیمم هزینه انتقال',
        type: 'text',
        validators: [],
      }),
      swift: new FormControl2('', {
        label: 'SWIFT کد',
        type: 'text',
        validators: [],
      }),
      cardType: new FormControl2('', {
        label: 'نوع کارت',
        type: 'select',
        options: ['Debit', 'Credit'], // Example options
        selectedOptionIndex: 0,
        validators: [],
      }),
      bankCountry: new FormControl2('', {
        label: 'کشور بانک',
        type: 'text',
        validators: [],
      }),
    };
  }
}
