import { Component } from '@angular/core';
import { HeaderButtonsComponent } from '../../../financial/components/header-buttons/header-buttons.component';
import { ExchangeTableComponent } from 'src/app/modules/dashboard/components/view/exchange-table/exchange-table.component';
import { Ticket } from 'src/app/shared/models/ticket-interface';

import { TableComponent } from '../../../../shared/components/tables/table/table.component';
import { TableConfig, TableConfig2 } from 'src/app/shared/models/table-config';
import { CustomFormControl } from 'src/app/shared/form-builder/form-builder.component';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
const logo =
  'https://daftarensha.ir/wp-content/uploads/2024/09/%D9%BE%D8%B3%D8%B1-%D8%A8%DA%86%D9%87-%D8%AE%D9%88%D8%B4%DA%AF%D9%84-%D8%A8%D8%B1%D8%A7%DB%8C-%D9%BE%D8%B1%D9%88%D9%81%D8%A7%DB%8C%D9%84-.jpeg';
@Component({
  selector: 'app-contact-customer',
  standalone: true,
  imports: [HeaderButtonsComponent, ExchangeTableComponent, TableComponent],
  templateUrl: './contact-customer.component.html',
  styleUrl: './contact-customer.component.scss',
})
export class ContactCustomerComponent {
  tableConfig!: TableConfig2;

  dummyData = [
    {
      ticketNumber: '123456789',
      logo: logo,
      userType: 'کار مند',
      priority: 'مهم',
      response: 'بله',
      status: 'پاسخ داده شد',
    },
    {
      ticketNumber: '123456789',
      logo: logo,
      userType: 'صراف',
      priority: 'مهم',
      response: 'بله تست تست تست تست تست تست تست تست تست ',
      status: 'پاسخ داده شد',
    },
    {
      ticketNumber: '123456789',
      logo: logo,
      userType: 'کار مند',
      priority: 'متوسط',
      response: 'بله تست تست تست تست تست تست تست تست تست ',
      status: 'پاسخ داده شد',
    },
    // Add more rows as needed...
  ];
  constructor(private router: Router) {
    const controls = {
      seach: new CustomFormControl(null, {
        label: 'جستوجو',
        showIf: [],
        type: 'search',
        validators: [],
      }),
      priority: new CustomFormControl(null, {
        label: 'الویت',
        options: ['مهم', 'متوسط'],
        showIf: [],
        type: 'select',
        validators: [],
      }),
      sort: new CustomFormControl(null, {
        type: 'checkbox',
        options: ['کارمند', ' صرافی'],
        label: '',
        validators: [],
        showIf: [],
      }),
      status: new CustomFormControl(null, {
        label: 'وضعیت',
        options: ['پاسخ داده شد', 'پاسخ نشده'],
        showIf: [],
        type: 'select',
        validators: [],
      }),
    };

    this.tableConfig = {
      title: 'تیکت ها ',
      tableHeader: ['شماره تیکت', 'آواتار', 'نوع کاربر', ' درجه اهمیت', 'پاسخ', 'وضعیت'],
      form: new FormGroup(controls),
      tableBody: this.dummyData,
      customStylePerColumnVal: {
        مهم: 'text-red-500 bg-red-100 rounded-lg p-1',
        متوسط: 'text-orange-500 bg-orange-100  rounded-lg p-1',
      },
      assetIndexFromBody: 1,
    };
  }

  navigatePrimary() {
    this.router.navigate(['/contact/customer/add']);
  }
  navigateLight() {
    this.router.navigate(['/dashboard']);
  }
}
