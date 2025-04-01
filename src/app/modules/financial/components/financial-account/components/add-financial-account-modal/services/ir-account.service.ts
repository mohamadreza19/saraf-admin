import { Injectable } from '@angular/core';
import { FormControl2 } from 'src/app/shared/components/form-builder2/form-builder2.component';
import { IrBankAccount } from '../controls';
import { CustomFormGroup } from 'src/app/shared/form-builder/form-builder.component';
import { BANK_ACCOUNT_TYPES } from '../constants';
import { FINANCIAL_ACCOUNT_TYPES } from '../../../constants/finantial-account-types';

@Injectable({
  providedIn: 'root',
})
export class IrAccountService {
  public form!: CustomFormGroup;
  constructor() {}

  initiateIrForm(submit: (form: CustomFormGroup) => void) {
    const controls = this.initiateControls(Object.values(BANK_ACCOUNT_TYPES), FINANCIAL_ACCOUNT_TYPES.IR);
    this.form = new CustomFormGroup(controls, 'ثبت حساب ایرانی', 'ثبت', submit);
  }
  private initiateControls(BANK_ACCOUNT_TYPES: string[], bankIdentity: string): IrBankAccount {
    return {
      bankIdentity: new FormControl2(bankIdentity, {
        label: 'هویت بانک',
        type: 'text',
        validators: [],
      }),
      currencyUnit: new FormControl2('', {
        label: 'واحد ارزی',
        type: 'select',
        options: ['ریال'],
        selectedOptionIndex: 0,
        validators: [],
      }),
      bankName: new FormControl2('test-bank1', {
        label: 'نام بانک',
        type: 'text',
        validators: [],
      }),

      //
      accountNumber: new FormControl2('', {
        label: 'شماره حساب',
        type: 'text',
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
        label: ' حداقل هزینه انتقال',
        type: 'text',
        validators: [],
      }),
      maximumTransferFee: new FormControl2('', {
        label: 'ماکزیمم هزینه انتقال',
        type: 'text',
        validators: [],
      }),
    };
  }
}
