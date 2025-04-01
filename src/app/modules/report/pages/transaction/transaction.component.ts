import { Component } from '@angular/core';
import { FormControl2 } from 'src/app/shared/components/form-builder2/form-builder2.component';
import { CustomFormGroup } from 'src/app/shared/form-builder/form-builder.component';
import { TableConfig } from 'src/app/shared/models/table-config';
import { TableComponent } from '../../../../shared/components/tables/table/table.component';
const transactionsData = [
  {
    customerId: 'C001',
    firstName: 'محمد',
    lastName: 'احمدی',
    dateTime: '1402/10/21 - 14:30',
    documentNumber: 'D001',
    transactionType: 'خرید',
    amount: '10,000',
    initialCurrency: 'دلار',
    exchangeRate: '42,000',
    targetAmount: '420,000,000',
    targetCurrency: 'ریال',
    description: 'خرید ارز برای واردات',
    exchangerName: 'صرافی تهران',
    beneficiaryAccount: 'شماره حساب 123456789',
    exchanger: 'علی رضایی',
    receiptNumber: 'R001',
  },
  {
    customerId: 'C002',
    firstName: 'زهرا',
    lastName: 'حسینی',
    dateTime: '1402/10/22 - 11:45',
    documentNumber: 'D002',
    transactionType: 'فروش',
    amount: '5,000',
    initialCurrency: 'یورو',
    exchangeRate: '45,000',
    targetAmount: '225,000,000',
    targetCurrency: 'ریال',
    description: 'فروش ارز مسافرتی',
    exchangerName: 'صرافی مشهد',
    beneficiaryAccount: 'شماره حساب 987654321',
    exchanger: 'فاطمه مرادی',
    receiptNumber: 'R002',
  },
  // Add more mock data as needed
];
@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css',
})
export class TransactionComponent {
  tableConfig!: TableConfig;

  constructor() {
    const controls = {
      searchName: new FormControl2('', {
        label: 'جستجو بر اساس نام / نام خانوادگی',
        type: 'search',
        validators: [],
      }),
      searchCurrency: new FormControl2('', {
        label: 'جستجو بر اساس ارز',
        type: 'select', // Assume a dropdown for selecting currencies
        options: ['دلار', 'یورو', 'ریال', 'همه'], // Sample currencies
        validators: [],
      }),
      searchTransactionType: new FormControl2('', {
        label: 'جستجو بر اساس نوع معامله',
        type: 'select',
        options: ['خرید', 'فروش', 'انتقال', 'همه'],
        validators: [],
      }),
      from: new FormControl2('', {
        label: 'از تاریخ',
        type: 'date',
        validators: [],
      }),
      to: new FormControl2('', {
        label: 'تا تاریخ',
        type: 'date',
        validators: [],
      }),
      searchReceipt: new FormControl2('', {
        label: 'جستجو بر اساس شماره فیش',
        type: 'search',
        validators: [],
      }),
    };

    this.tableConfig = {
      title: 'گزارش معاملات',
      form: new CustomFormGroup(controls),
      tableHeader: [
        'کد مشتری', // Customer ID
        'نام مشتری', // First Name
        'نام خانوادگی مشتری', // Last Name
        'تاریخ/ساعت', // Date/Time
        'شماره سند', // Document Number
        'نوع معامله', // Transaction Type
        'مقدار', // Amount
        'ارز اولیه', // Initial Currency
        'نرخ تبدیل', // Exchange Rate
        'مقدار ارز مقابل', // Target Amount
        'ارز مقابل', // Target Currency
        'شرح سند', // Description
        'نام صراف', // Exchanger Name
        'حساب ذینفع', // Beneficiary Account
        'صراف', // Exchanger
        'شماره فیش', // Receipt Number
      ],
      tableBody: transactionsData,
    };
  }
}
