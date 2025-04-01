import {
  InternationalAccountValues,
  IrBankAccountValues,
  CryptocurrencyAccountValues,
} from '../components/add-financial-account-modal/controls';

export enum FINANCIAL_ACCOUNT_TYPES {
  IR = 'ایرانی',
  INTERNATIONAL = 'بین المللی',
  CRYPTOCURRENCY = 'رمز ارز',
}

export const IR_BANK_ACCOUNT_DATA: IrBankAccountValues[] = [
  {
    bankIdentity: FINANCIAL_ACCOUNT_TYPES.IR, // هویت بانک
    bankName: 'بانک ملی ایران', // نام بانک
    currencyUnit: 'ریال', // واحد ارزی
    cardNumber: '1234-5678-9012-3456', // شماره کارت
    ibanNumber: 'IR123456789012345678901234', // شماره شبا
    cardholderFullName: 'علی رضایی', // نام کامل روی کارت
    accountType: 'جاری', // نوع حساب (پس انداز/جاری)
    initialBalance: 1000000, // موجودی اولیه
    minimumTransferFee: 500, // حداقل هزینه انتقال
    maximumTransferFee: 20000, // ماکزیمم هزینه انتقال
    accountNumber: '987654321', // شماره حساب
  },
  {
    bankIdentity: FINANCIAL_ACCOUNT_TYPES.IR,
    bankName: 'بانک صادرات ایران',
    currencyUnit: 'ریال',
    cardNumber: '6543-2109-8765-4321',
    ibanNumber: 'IR987654321098765432109876',
    cardholderFullName: 'زهرا محمدی',
    accountType: 'پس انداز',
    initialBalance: 500000,
    minimumTransferFee: 300,
    maximumTransferFee: 15000,
    accountNumber: '123456789',
  },
];
export const INTERNATIONAL_ACCOUNT_DATA: InternationalAccountValues[] = [
  {
    bankIdentity: FINANCIAL_ACCOUNT_TYPES.INTERNATIONAL,
    bankName: 'المشرق',
    currencyUnit: 'درهم',
    bankCountry: 'امارات',
    cardNumber: '5678-1234-8765-4321',
    ibanNumber: 'US123456789012345678901234',
    cardholderFullName: 'John Doe',
    accountType: 'Savings', // پس انداز/جاری
    initialBalance: 5000,
    minimumTransferFee: 10,
    maximumTransferFee: 100,
    swift: 'HSBCUS33XXX',
    cardType: 'Visa',
  },
  {
    bankIdentity: FINANCIAL_ACCOUNT_TYPES.INTERNATIONAL,
    bankName: 'CitiBank',
    currencyUnit: 'یورو',
    bankCountry: 'آمریکا',
    cardNumber: '1234-5678-9012-3456',
    ibanNumber: 'DE123456789012345678901234',
    cardholderFullName: 'Jane Smith',
    accountType: 'Current', // جاری
    initialBalance: 10000,
    minimumTransferFee: 20,
    maximumTransferFee: 150,
    swift: 'CITIUS33XXX',
    cardType: 'MasterCard',
  },
];
export const CRYPTOCURRENCY_ACCOUNT_DATA: CryptocurrencyAccountValues[] = [
  {
    bankIdentity: FINANCIAL_ACCOUNT_TYPES.CRYPTOCURRENCY,
    accountNumber: '0x123abc456def789ghi',
    qrCode: 'https://example.com/qrcode1',
    memo: 'Transfer for investment', // توضیح
    type: 'Bitcoin',
    transferPlatform: 'Binance',
    initialBalance: 0.5, // موجودی اولیه
    minimumTransferFee: 0.001, // حداقل هزینه انتقال
    maximumTransferFee: 0.01, // ماکزیمم هزینه انتقال
  },
  {
    bankIdentity: FINANCIAL_ACCOUNT_TYPES.CRYPTOCURRENCY,
    accountNumber: '0x789ghi123abc456def',
    qrCode: 'https://example.com/qrcode2',
    memo: 'Transfer for trading', // توضیح
    type: 'Ethereum',
    transferPlatform: 'Coinbase',
    initialBalance: 2.3, // موجودی اولیه
    minimumTransferFee: 0.005, // حداقل هزینه انتقال
    maximumTransferFee: 0.02, // ماکزیمم هزینه انتقال
  },
];
