import { Component } from '@angular/core';
import { CustomFormControl, CustomFormGroup } from 'src/app/shared/form-builder/form-builder.component';
import { TableConfig } from 'src/app/shared/models/table-config';
import { HeaderButtonsComponent } from '../../components/header-buttons/header-buttons.component';
import { TableComponent } from '../../../../shared/components/tables/table/table.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bank-account',
  standalone: true,
  imports: [HeaderButtonsComponent, TableComponent],
  templateUrl: './bank-account.component.html',
  styleUrl: './bank-account.component.css',
})
export class BankAccountComponent {
  tableConfig!: TableConfig;

  constructor(private router: Router) {
    this.tableConfig = {
      title: 'حساب‌ها',
      form: this.generateForm(),
      tableHeader: [
        'نوع حساب',
        'نام بانک/صرافی/کیف پول',
        'نوع مبلغ',
        'شماره حساب',
        'شماره کارت',
        'شماره شبا',
        'نوع حساب (پس انداز/جاری)',
        'موجودی',
        'مینیمم هزینه انتقال',
        'ماکزیمم هزینه انتقال',
        'بستر انتقال',
        'فعال / غیرفعال',
      ],
      tableBody: [
        {
          accountType: 'بانکی',
          bankName: 'بانک ملی',
          amountType: 'ریال',
          accountNumber: '123456789',
          cardNumber: '6037991234567890',
          iban: 'IR123456789012345678901234',
          savingsType: 'جاری',
          balance: 1000000,
          minTransferFee: 1000,
          maxTransferFee: 50000,
          transferPlatform: '',
          isActive: 'فعال',
        },
        {
          accountType: 'رمز ارزی',
          bankName: '',
          amountType: 'دلار',
          accountNumber: '0xabc123def456',
          cardNumber: '',
          iban: '',
          savingsType: '',
          balance: 500,
          minTransferFee: 0,
          maxTransferFee: 10,
          transferPlatform: 'بستر Ethereum',
          isActive: 'غیرفعال',
        },
        {
          accountType: 'مجازی',
          bankName: '',
          amountType: 'یورو',
          accountNumber: 'virtual123456',
          cardNumber: '',
          iban: '',
          savingsType: '',
          balance: 1500,
          minTransferFee: 2,
          maxTransferFee: 50,
          transferPlatform: 'بستر PayPal',
          isActive: 'فعال',
        },
      ],
      customStylePerColumnVal: {
        فعال: 'p-1 rounded-lg bg-primary text-background',
        غیرفعال: 'p-1 rounded-lg bg-muted text-background',
      },
      actions: [],
    };
  }
  generateForm() {
    const controls = {
      search: new CustomFormControl('', {
        label: 'جستجو',
        type: 'search',

        validators: [],
      }),
      isActive: new CustomFormControl(false, {
        type: 'checkbox',
        label: '',
        options: ['فعال'],

        validators: [],
      }),
    };

    return new CustomFormGroup(controls);
  }
  navAdd() {
    this.router.navigate(['/financial/bank-account/add']);
  }
  navDash() {
    this.router.navigate(['/dashboard']);
  }
}
