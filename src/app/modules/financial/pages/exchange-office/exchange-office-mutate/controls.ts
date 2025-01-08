import { TemplateRef } from '@angular/core';
import { AmountFormControl, FormControl2 } from 'src/app/shared/components/form-builder2/form-builder2.component';
import {
  ExchangeOfficeEmployCommonControls,
  LegalControls,
} from 'src/app/shared/types/exchange-office-employ-common-controls';

export interface ExchangeOfficeControls extends ExchangeOfficeEmployCommonControls, LegalControls {}

export interface ExchangeOfficeControls2 {
  requestedModules: FormControl2;

  discount: FormControl2;
  receipt_: FormControl2;

  //
  bankAccount: FormControl2;

  hasDepositMade: FormControl2;
  noNeedReceipt: FormControl2;
  receipt: FormControl2;
}

export interface ExchangeOfficeControls3 {
  docType: FormControl2;

  docs: FormControl2;
  docExpireDate: FormControl2;
}
