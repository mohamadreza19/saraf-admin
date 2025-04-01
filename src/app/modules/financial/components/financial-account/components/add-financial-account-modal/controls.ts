import { FormControl2 } from 'src/app/shared/components/form-builder2/form-builder2.component';

export interface AccountType {
  accountType: FormControl2;
}
export interface BankIdentityControl {
  bankIdentity: FormControl2; // هویت بانک
}

interface IrAccount_InternationalAccountCommonControls {
  bankName: FormControl2; // نام بانک
  currencyUnit: FormControl2; // واحد ارزی

  cardNumber: FormControl2; // شماره کارت
  ibanNumber: FormControl2; // شماره شبا
  cardholderFullName: FormControl2; // نام کامل روی کارت
  accountType: FormControl2; // نوع حساب (پس انداز/جاری)
}
interface TransferControls {
  initialBalance: FormControl2; // موجودی اولیه
  minimumTransferFee: FormControl2; // حداقل هزینه انتقال
  maximumTransferFee: FormControl2; // ماکزیمم هزینه انتقال
}
interface CommonControls {
  bankType: FormControl2;
}
export interface IrBankAccount
  extends IrAccount_InternationalAccountCommonControls,
    TransferControls,
    BankIdentityControl {
  accountNumber: FormControl2; // شماره حساب
}

export interface InternationalAccount
  extends IrAccount_InternationalAccountCommonControls,
    TransferControls,
    BankIdentityControl {
  swift: FormControl2;
  cardType: FormControl2;
  bankCountry: FormControl2;
}

export interface CryptocurrencyAccount extends TransferControls, BankIdentityControl {
  accountNumber: FormControl2; // شماره حساب
  qrCode: FormControl2;
  memo: FormControl2;
  type: FormControl2;
  transferPlatform: FormControl2;
}

type ConvertToType<T, U> = {
  [K in keyof T]: U;
};
export type IrBankAccountValues = ConvertToType<IrBankAccount, any>;
export type InternationalAccountValues = ConvertToType<InternationalAccount, any>;
export type CryptocurrencyAccountValues = ConvertToType<CryptocurrencyAccount, any>;
export type BankIdentity = ConvertToType<BankIdentityControl, any>;
