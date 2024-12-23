import { AfterViewInit, Component } from '@angular/core';
import { FormControl2 } from 'src/app/shared/components/form-builder2/form-builder2.component';
import { CustomFormGroup } from 'src/app/shared/form-builder/form-builder.component';
import { TableConfig2 } from 'src/app/shared/models/table-config';
import { TableComponent } from '../../../../shared/components/tables/table/table.component';
const data = [
  {
    customerId: 'C001',
    firstName: 'محمد',
    lastName: 'احمدی',
    phoneNumber: '09123456789',
    customerType: 'حقوقی',
    referrerFullName: 'علی رضایی',
    address: 'تهران، خیابان ولیعصر، کوچه ۱۲، پلاک ۸',
  },
  {
    customerId: 'C002',
    firstName: 'زهرا',
    lastName: 'حسینی',
    phoneNumber: '09391234567',
    customerType: 'حقیقی',
    referrerFullName: 'فاطمه مرادی',
    address: 'مشهد، بلوار وکیل‌آباد، پلاک ۲۵',
  },
  {
    customerId: 'C003',
    firstName: 'علی',
    lastName: 'کریمی',
    phoneNumber: '09187654321',
    customerType: 'حقیقی',
    referrerFullName: 'محمد نجفی',
    address: 'شیراز، خیابان زند، مجتمع آریا، طبقه دوم',
  },
  {
    customerId: 'C004',
    firstName: 'سمیرا',
    lastName: 'عباسی',
    phoneNumber: '09221234567',
    customerType: 'حقوقی',
    referrerFullName: 'شرکت پارس‌کو',
    address: 'اصفهان، میدان نقش‌جهان، ساختمان مرکزی',
  },
  {
    customerId: 'C005',
    firstName: 'رضا',
    lastName: 'جعفری',
    phoneNumber: '09361112222',
    customerType: 'حقیقی',
    referrerFullName: 'حسن یوسفی',
    address: 'تبریز، خیابان امام، پلاک ۱۱۰',
  },
];

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css',
})
export class CustomerComponent implements AfterViewInit {
  tableConfig2!: TableConfig2;

  constructor() {
    const controls = {
      search: new FormControl2('', {
        label: 'جستجو بر اساس نام / نام خانوادگی',
        type: 'search',
        validators: [],
      }),
      searchPhone: new FormControl2('', {
        label: 'جستجو بر اساس شماره تماس',
        type: 'search',
        validators: [],
      }),
      customerCode: new FormControl2('', {
        label: 'جستجو بر اساس کد مشتری',
        type: 'search',
        validators: [],
      }),
    };
    this.tableConfig2 = {
      title: 'لیست مشتریان',
      form: new CustomFormGroup(controls),
      tableHeader: [
        'کد مشتری', // Customer ID
        'نام مشتری', // First Name
        'نام خانوادگی مشتری', // Last Name
        'شماره تماس', // Phone Number
        'نوع مشتری', // Customer Type
        'نام و نام خانوادگی معرف', // Referrer Full Name
        'آدرس', // Address
      ],
      tableBody: data,
    };
  }

  ngAfterViewInit(): void {}
}
