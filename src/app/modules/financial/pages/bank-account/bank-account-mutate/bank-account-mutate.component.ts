import { Component } from '@angular/core';
import {
  CustomFormControl,
  CustomFormGroup,
  FormBuilderComponent,
} from 'src/app/shared/form-builder/form-builder.component';
import {
  FormBuilder2Component,
  FormControl2,
} from '../../../../../shared/components/form-builder2/form-builder2.component';
import { toggleFormControlsVisibility } from 'src/app/shared/utils/toggle-form-controls-visibility.util';

@Component({
  selector: 'app-bank-account-mutate',
  standalone: true,
  imports: [FormBuilderComponent, FormBuilder2Component],
  templateUrl: './bank-account-mutate.component.html',
  styleUrl: './bank-account-mutate.component.css',
})
export class BankAccountMutateComponent {
  forms: CustomFormGroup[] = [];
  accountType!: FormControl2;
  constructor() {
    this.forms = [this.generateAccountForm()];
  }

  generateAccountForm() {
    this.accountType = new FormControl2('', {
      type: 'select',
      label: 'نوع حساب',

      options: ['بانکی', 'رمز ارزی', 'مجازی'],
      selectedOptionIndex: 0,
      validators: [],
    });
    const controls = {
      accountType: this.accountType,
      bankName: new FormControl2('', {
        type: 'text',
        label: 'نام بانک/صرافی/کیف پول',
        // showIf: ['accountType', 'بانکی'],
        validators: [],
      }),
      amountType: new FormControl2('', {
        type: 'select',
        // showIf: ['accountType', 'بانکی'],
        label: 'نوع مبلغ',
        options: ['ریال', 'دلار', 'یورو'],
        validators: [],
      }),
      accountNumber: new FormControl2('', {
        type: 'text',

        label: 'شماره حساب',
        validators: [],
      }),
      cardNumber: new FormControl2('', {
        type: 'text',
        label: 'شماره کارت',
        // showIf: ['accountType', 'بانکی'],
        validators: [],
      }),
      iban: new FormControl2('', {
        type: 'text',
        label: 'شماره شبا',
        // showIf: ['accountType', 'بانکی'],
        validators: [],
      }),
      savingsType: new FormControl2('', {
        type: 'select',
        label: 'نوع حساب',
        options: ['پس انداز', 'جاری'],
        // showIf: ['accountType', 'بانکی'],
        validators: [],
      }),
      balance: new FormControl2('', {
        type: 'text',
        // showIf: ['accountType', 'بانکی'],
        label: 'موجودی',
        validators: [],
      }),
      minTransferFee: new FormControl2('', {
        type: 'text',
        // showIf: ['accountType', 'بانکی'],
        label: 'مینیمم هزینه انتقال',
        validators: [],
      }),
      maxTransferFee: new FormControl2('', {
        type: 'text',
        // showIf: ['accountType', 'بانکی'],
        label: 'ماکزیمم هزینه انتقال',
        validators: [],
      }),
      isActive: new FormControl2(false, {
        type: 'checkbox',
        label: '',
        options: ['فعال'],

        validators: [],
      }),
      transferPlatform: new FormControl2('', {
        type: 'text',
        label: 'بستر انتقال',
        // showIf: ['accountType', 'رمز ارزی'],
        validators: [],
      }),
    };

    this.accountType.valueChanges.subscribe((value) => {
      switch (value) {
        case 'بانکی':
          toggleFormControlsVisibility(controls, [
            'accountType',
            'bankName',
            'amountType',
            'accountNumber',
            'cardNumber',
            'iban',
            'savingsType',
            'balance',
            'minTransferFee',
            'maxTransferFee',
          ]);
          break;
        case 'رمز ارزی':
          toggleFormControlsVisibility(controls, ['accountType', 'transferPlatform']);
          break;

        default:
          break;
      }
    });

    return new CustomFormGroup(controls, 'افزودن حساب', 'ذخیره');
  }
}
