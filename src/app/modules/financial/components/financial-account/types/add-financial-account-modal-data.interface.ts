import { CustomFormGroup } from 'src/app/shared/form-builder/form-builder.component';
import { FINANCIAL_ACCOUNT_TYPES } from '../constants/finantial-account-types';

export interface SubmitFinancialAccountModalData {
  submitIrAccount: (form: CustomFormGroup) => void;
  submitInternationalAccount: (form: CustomFormGroup) => void;
  submitCryptocurrencyAccount: (form: CustomFormGroup) => void;
  usedIn?: 'stakeholder';
  step?: FINANCIAL_ACCOUNT_TYPES;
}
