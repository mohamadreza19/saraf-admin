import { Component } from '@angular/core';
import { HeaderButtonsComponent } from '../../../financial/components/header-buttons/header-buttons.component';
import { ExchangeTableComponent } from 'src/app/modules/dashboard/components/view/exchange-table/exchange-table.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bank',
  standalone: true,
  imports: [HeaderButtonsComponent, ExchangeTableComponent],
  templateUrl: './bank.component.html',
})
export class BankComponent {
  table1Label = 'لیست بانک ها';
  table1Keys: string[];
  table1Body: any[];
  table1ForbiddenKeysInItem: string[];
  table1IconsUrl!: string[];

  constructor(private router: Router) {
    this.table1Keys = ['اسم', 'شهر', 'عنوان', 'وضعیت'];
    this.table1Body = [
      {
        name: 'بانک ملی',
        logo: 'https://bmi.ir/fa/uploadedfiles/dynamicpagesfiles/2019_10_26/logo__e53e707996__7b6ea8f7fb.jpg',
        city: 'تهران',
        title: 'بانک ملی ایران',
        status: 'فعال',
      },
      {
        name: 'بانک توسعه',
        logo: 'https://logoyab.com/wp-content/uploads/2024/08/Tosee-Taavon-Bank-Logo-1030x1030.png',
        city: 'تهران',
        title: 'بانک توسعه ',
        status: 'فعال',
      },
    ];
    this.table1ForbiddenKeysInItem = ['logo'];
    this.table1IconsUrl = this.table1Body.map((item) => item.logo);
  }
  navigateToAddBank() {
    this.router.navigate(['/geographical/bank/add']);
  }
  navigateToDash() {
    this.router.navigate(['/dashboard']);
  }
}
