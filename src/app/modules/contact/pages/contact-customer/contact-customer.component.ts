import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { HeaderButtonsComponent } from '../../../financial/components/header-buttons/header-buttons.component';
import { ExchangeTableComponent } from 'src/app/modules/dashboard/components/view/exchange-table/exchange-table.component';
import { Ticket } from 'src/app/shared/models/ticket-interface';

import { TableComponent } from '../../../../shared/components/tables/table/table.component';
import { TableConfig } from 'src/app/shared/models/table-config';
import { CustomFormControl } from 'src/app/shared/form-builder/form-builder.component';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { ModalService } from 'src/app/core/services/modal.service';
import { ContactCustomerCommunicationModalComponent } from './components/contact-customer-communication-modal/contact-customer-communication-modal.component';
const logo =
  'https://daftarensha.ir/wp-content/uploads/2024/09/%D9%BE%D8%B3%D8%B1-%D8%A8%DA%86%D9%87-%D8%AE%D9%88%D8%B4%DA%AF%D9%84-%D8%A8%D8%B1%D8%A7%DB%8C-%D9%BE%D8%B1%D9%88%D9%81%D8%A7%DB%8C%D9%84-.jpeg';
@Component({
  selector: 'app-contact-customer',
  standalone: true,
  imports: [HeaderButtonsComponent, ExchangeTableComponent, TableComponent, ButtonComponent],
  templateUrl: './contact-customer.component.html',
})
export class ContactCustomerComponent implements AfterViewInit {
  tableConfig!: TableConfig;
  @ViewChild('answerButton') answerButton!: TemplateRef<any>;

  dummyData = [
    {
      ticketNumber: '123456789',
      logo: logo,
      userType: 'کار مند',
      operation: 'دریافت',
      priority: 'مهم',
      response: 'بله',
      status: 'پاسخ داده شد',
    },
    {
      ticketNumber: '123456789',
      logo: logo,
      userType: 'صراف',
      operation: 'دریافت',
      priority: 'مهم',
      response: 'بله تست تست تست تست تست تست تست تست تست ',
      status: 'پاسخ داده شد',
    },
    {
      ticketNumber: '123456789',
      logo: logo,
      userType: 'کار مند',
      operation: 'ارسال',
      priority: 'متوسط',
      response: 'بله تست تست تست تست تست تست تست تست تست ',
      status: 'پاسخ داده شد',
    },
    // Add more rows as needed...
  ];
  constructor(private router: Router, private modal: ModalService) {}
  ngAfterViewInit(): void {
    const controls = {
      search: new CustomFormControl(null, {
        label: 'جستوجو',

        type: 'search',
        validators: [],
      }),
      priority: new CustomFormControl(null, {
        label: 'الویت',
        options: ['مهم', 'متوسط'],

        type: 'select',
        validators: [],
      }),
      sort: new CustomFormControl(null, {
        type: 'checkbox',
        options: ['کارمند', ' صرافی'],
        label: '',
        validators: [],
      }),
      status: new CustomFormControl(null, {
        label: 'وضعیت',
        options: ['پاسخ داده شد', 'پاسخ نشده'],

        type: 'select',
        validators: [],
      }),
    };

    this.tableConfig = {
      title: 'تیکت ها ',
      tableHeader: ['شماره تیکت', 'آواتار', 'نوع کاربر', 'ارسال/دریافت', ' درجه اهمیت', 'پاسخ', 'وضعیت'],
      form: new FormGroup(controls),
      tableBody: this.dummyData,
      customStylePerColumnVal: {
        مهم: 'text-red-500 bg-red-100 rounded-lg p-1',
        متوسط: 'text-orange-500 bg-orange-100  rounded-lg p-1',
      },
      actions: [
        {
          templateRef: this.answerButton,
        },
      ],
      assetIndexFromBody: 1,
    };
  }
  navigatePrimary() {
    this.router.navigate(['/contact/customer/add']);
  }
  navigateLight() {
    this.router.navigate(['/dashboard']);
  }
  openCommunication() {
    this.modal.open(ContactCustomerCommunicationModalComponent);
  }
}
