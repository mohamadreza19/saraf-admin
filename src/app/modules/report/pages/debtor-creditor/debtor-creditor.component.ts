import { Component } from '@angular/core';
import { FormControl2 } from 'src/app/shared/components/form-builder2/form-builder2.component';
import { CustomFormGroup } from 'src/app/shared/form-builder/form-builder.component';
import { TableConfig } from 'src/app/shared/models/table-config';
import { TableComponent } from '../../../../shared/components/tables/table/table.component';
const debtorsCreditorsData = [
  {
    customerCode: '1001',
    firstName: 'علی',
    lastName: 'رضایی',
    status: 'بدهکار', // Customer is a debtor
    toman: '۵۰۰,۰۰۰,۰۰۰',
    dirham: '۲۰,۰۰۰',
    dollar: '۱۵,۰۰۰',
    euro: '۱۰,۰۰۰',
    yen: '۱,۵۰۰,۰۰۰',
    otherCurrencies: '۵۰۰ فرانک',
  },
  {
    customerCode: '1002',
    firstName: 'زهرا',
    lastName: 'کریمی',
    status: 'بستانکار', // Customer is a creditor
    toman: '۷۵۰,۰۰۰,۰۰۰',
    dirham: '۴۰,۰۰۰',
    dollar: '۲۰,۰۰۰',
    euro: '۵,۰۰۰',
    yen: '۲,۰۰۰,۰۰۰',
    otherCurrencies: '۱۰۰ لیر',
  },
  {
    customerCode: '1003',
    firstName: 'محمد',
    lastName: 'جعفری',
    status: 'بدهکار', // Customer is a debtor
    toman: '۱,۲۰۰,۰۰۰,۰۰۰',
    dirham: '۳۰,۰۰۰',
    dollar: '۲۵,۰۰۰',
    euro: '۱۵,۰۰۰',
    yen: '۱,۷۰۰,۰۰۰',
    otherCurrencies: '۲۰۰ یوان',
  },
  {
    customerCode: '1004',
    firstName: 'فاطمه',
    lastName: 'عباسی',
    status: 'بستانکار', // Customer is a creditor
    toman: '۳۰۰,۰۰۰,۰۰۰',
    dirham: '۱۰,۰۰۰',
    dollar: '۵,۰۰۰',
    euro: '۲,۰۰۰',
    yen: '۵۰۰,۰۰۰',
    otherCurrencies: '۵۰ روبل',
  },
  {
    customerCode: '1005',
    firstName: 'حسن',
    lastName: 'اسدی',
    status: 'بدهکار', // Customer is a debtor
    toman: '۸۰۰,۰۰۰,۰۰۰',
    dirham: '۲۵,۰۰۰',
    dollar: '۱۲,۰۰۰',
    euro: '۷,۰۰۰',
    yen: '۲,۲۰۰,۰۰۰',
    otherCurrencies: '۳۰۰ فرانک',
  },
  {
    customerCode: '1006',
    firstName: 'مریم',
    lastName: 'حسینی',
    status: 'بستانکار', // Customer is a creditor
    toman: '۱,۵۰۰,۰۰۰,۰۰۰',
    dirham: '۵۰,۰۰۰',
    dollar: '۳۰,۰۰۰',
    euro: '۲۰,۰۰۰',
    yen: '۳,۰۰۰,۰۰۰',
    otherCurrencies: '۱۵۰ لیر',
  },
];

@Component({
  selector: 'app-debtor-creditor',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './debtor-creditor.component.html',
  styleUrl: './debtor-creditor.component.css',
})
export class DebtorCreditorComponent {
  tableConfig!: TableConfig;

  constructor() {
    const controls = {
      searchCustomerCode: new FormControl2('', {
        label: 'جستجو بر اساس کد مشتری',
        type: 'search',
        validators: [],
      }),
    };

    this.tableConfig = {
      title: 'گزارش بدهکاران و بستانکاران',
      form: new CustomFormGroup(controls),
      tableHeader: [
        'کد مشتری', // Customer ID
        'نام مشتری', // Customer First Name
        'نام خانوادگی مشتری', // Customer Last Name
        'وضیعت',
        'تومان', // Amount in Toman
        'درهم', // Amount in Dirham
        'دلار', // Amount in Dollar
        // Additional currencies dynamically added here
        'یورو', // Example additional currency
        'ین', // Example additional currency
        'ارزهای دیگر', // Placeholder for more currencies
      ],
      customStylePerColumn: {
        بدهکار: ' p-1 rounded-md bg-red-100 text-red-700',
        بستانکار: ' p-1 rounded-md bg-green-100 text-green-700',
      },
      tableBody: debtorsCreditorsData, // Placeholder for the data
    };
  }
}
