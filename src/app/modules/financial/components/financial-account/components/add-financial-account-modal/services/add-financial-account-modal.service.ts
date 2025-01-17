import { Injectable } from '@angular/core';
import { CustomFormGroup } from 'src/app/shared/form-builder/form-builder.component';
import { IrAccountService } from './ir-account.service';
import { CryptocurrencyAccountService } from './cryptocurreny-account.service';
import { InternationalAccountService } from './international-account.service';
import { BANK_ACCOUNT_TYPES, BANK_ORIGIN } from '../constants';
import { SubmitFinancialAccountModalData } from '../../../types/add-financial-account-modal-data.interface';
import { FINANCIAL_ACCOUNT_TYPES } from '../../../constants/finantial-account-types';

@Injectable({
  providedIn: 'root',
})
export class AddFinancialAccountModalService {
  constructor(
    private ir: IrAccountService,
    private international: InternationalAccountService,
    private crypto: CryptocurrencyAccountService,
  ) {}

  initiateForms(data: SubmitFinancialAccountModalData) {
    this.ir.initiateIrForm(data.submitIrAccount);
    this.international.initiateForm(data.submitInternationalAccount);
    this.crypto.initiateForm(data.submitCryptocurrencyAccount);

    return this.handleChangeFormBasedStepChange(data.step);
  }
  handleChangeFormBasedStepChange(DataStep: string | undefined) {
    switch (DataStep) {
      case FINANCIAL_ACCOUNT_TYPES.IR:
        return this.ir.form;

      case FINANCIAL_ACCOUNT_TYPES.INTERNATIONAL:
        return this.international.form;

      case FINANCIAL_ACCOUNT_TYPES.CRYPTOCURRENCY:
        return this.crypto.form;

      default:
        return this.ir.form;
    }
  }
  initiateStep(DataStep: string | undefined) {
    switch (DataStep) {
      case FINANCIAL_ACCOUNT_TYPES.IR:
        return DataStep;

      case FINANCIAL_ACCOUNT_TYPES.INTERNATIONAL:
        return DataStep;

      case FINANCIAL_ACCOUNT_TYPES.CRYPTOCURRENCY:
        return DataStep;

      default:
        return FINANCIAL_ACCOUNT_TYPES.IR;
    }
  }
}
