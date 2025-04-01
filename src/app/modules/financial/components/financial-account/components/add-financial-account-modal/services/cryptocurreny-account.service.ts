import { Injectable } from '@angular/core';
import { FormControl2 } from 'src/app/shared/components/form-builder2/form-builder2.component';
import { CryptocurrencyAccount, InternationalAccount } from '../controls';
import { CustomFormGroup } from 'src/app/shared/form-builder/form-builder.component';
import { FINANCIAL_ACCOUNT_TYPES } from '../../../constants/finantial-account-types';

@Injectable({
  providedIn: 'root',
})
export class CryptocurrencyAccountService {
  public form!: CustomFormGroup;
  constructor() {}

  initiateForm(submit: (form: CustomFormGroup) => void) {
    const controls3 = this.initiateControls3(FINANCIAL_ACCOUNT_TYPES.CRYPTOCURRENCY);
    this.form = new CustomFormGroup(controls3, 'ثبت حساب رمز ارز', 'ثبت', submit);
  }
  initiateControls3(bankIdentity: string): CryptocurrencyAccount {
    return {
      bankIdentity: new FormControl2(bankIdentity, {
        label: 'هویت بانک',
        type: 'text',
        validators: [],
      }),
      accountNumber: new FormControl2('', {
        label: 'شماره حساب',
        type: 'text',
        validators: [],
      }),
      qrCode: new FormControl2(null, {
        label: 'بارگذاری QrCode',
        type: 'files',
        validators: [],
      }),
      memo: new FormControl2('', {
        label: 'memo',
        type: 'text',
        validators: [],
      }),
      type: new FormControl2('', {
        label: 'رمز ارز',
        type: 'select',
        options: ['USDT', 'BTC'],
        selectedOptionIndex: 0,
        validators: [],
      }),
      transferPlatform: new FormControl2('', {
        label: 'بستر انتقال',
        type: 'select',
        options: ['TRC20'],
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
