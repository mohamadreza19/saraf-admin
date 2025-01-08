import { BankCheckbook } from '../models/bank-checkbook.interface';

// constants.ts
export const CUSTOMER_LIST = [
  { id: 1, name: 'علی رضایی', imgUrl: '/assets/images/gray-avatar-placeholder.jpg' },
  { id: 2, name: 'محسن نامجو', imgUrl: '/assets/images/gray-avatar-placeholder.jpg' },
  { id: 3, name: 'محسن امینی', imgUrl: '/assets/images/gray-avatar-placeholder.jpg' },
];

export const PAYMENT_METHODS = ['واریز به حساب', 'پرداخت نقدی', 'چک'];
export const PAYMENT_METHODS2 = [
  'پرداخت از حساب سامانه مشتری',
  'پرداخت از اعتبار',
  'چک',
  'پرداخت نقدی',
  'واریز به حساب صرافی',
];

export const BANK_CHECKBOOK: BankCheckbook[] = [
  {
    bankCheckbookNumber: '32131233',
    bankName: 'صادرات',
    checkAmount: '1000000',
    currencyUnit: 'ریال',
    description: ' تست تست',
  },
];
export enum CURRENCIES {
  USD = 'دلار',
  RIAL = 'ریال',
  DIRHAM = 'درهم',
  USDT = 'usdt',
}
