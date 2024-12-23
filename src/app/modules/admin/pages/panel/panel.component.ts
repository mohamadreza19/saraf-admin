import { Component } from '@angular/core';
import { ExchangeTableComponent } from '../../../dashboard/components/view/exchange-table/exchange-table.component';
import { HeaderButtonsComponent } from '../../../financial/components/header-buttons/header-buttons.component';
import { Panel } from 'src/app/shared/models/panel.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [ExchangeTableComponent, HeaderButtonsComponent],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss',
})
export class PanelComponent {
  table1Label = 'لیست پنل ها';
  table1Body: any[] = [];
  table1Keys: string[] = [];
  constructor(private router: Router) {
    this.table1Keys = ['ماژول', 'واحد های پولی', 'قیمت', 'مدت', 'وضعیت', 'تاریخ افزودن'];
    this.table1Body = [
      {
        modules: 'نقره',
        currencyUnits: 'تومان',
        price: '1000',
        period: 'یک ماهه',
        status: 'فعال',
        dateAdd: '1403/12/12',
      },
      {
        modules: 'صرافی',
        currencyUnits: 'دلار',
        price: '1500',
        period: 'سه ماهه',
        status: 'فعال',
        dateAdd: '1403/12/12',
      },
      {
        modules: 'طلا',
        currencyUnits: 'دلار',
        price: '2000',
        period: 'شش ماهه',
        status: 'فعال',
        dateAdd: '1403/12/12',
      },
    ];
  }

  primaryNavigate() {
    this.router.navigate(['/admin/panel/add']);
  }
  lightNavigate() {
    this.router.navigate(['/dashboard']);
  }
}
