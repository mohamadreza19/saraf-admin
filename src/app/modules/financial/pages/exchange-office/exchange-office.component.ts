import { Component } from '@angular/core';
import { ExchangeTableComponent } from 'src/app/modules/dashboard/components/view/exchange-table/exchange-table.component';
import { exchangeOffice } from 'src/app/modules/dashboard/models/exchange-office';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { HeaderButtonsComponent } from '../../components/header-buttons/header-buttons.component';
import { Router } from '@angular/router';
import { TableComponent } from '../../../../shared/components/tables/table/table.component';
import { TableConfig } from 'src/app/shared/models/table-config';
import { CustomFormControl, CustomFormGroup } from 'src/app/shared/form-builder/form-builder.component';
import { FormControl2 } from 'src/app/shared/components/form-builder2/form-builder2.component';
import { ModalService } from 'src/app/core/services/modal.service';
import { ExchangeOfficeConnectInfoModalComponent } from '../../components/exchange-office-connect-info-modal/exchange-office-connect-info-modal.component';
export const exchangeOfficesData = [
  {
    firstName: 'علی',
    lastName: 'رضایی',
    phoneNumber: '۰۹۱۲۱۲۳۴۵۶۷',
    type: 'حقیقی',
    panelRenewalDate: '۱۴۰۲/۱۰/۱۰',
  },
  {
    firstName: 'زهرا',
    lastName: 'کریمی',
    phoneNumber: '۰۹۱۳۲۱۴۵۶۷۸',
    type: 'حقوقی',
    panelRenewalDate: '۱۴۰۲/۰۹/۱۵',
  },
  {
    firstName: 'محمد',
    lastName: 'جعفری',
    phoneNumber: '۰۹۱۴۳۲۱۶۷۸۹',
    type: 'حقیقی',
    panelRenewalDate: '۱۴۰۲/۰۸/۲۰',
  },
  {
    firstName: 'فاطمه',
    lastName: 'عباسی',
    phoneNumber: '۰۹۱۵۴۳۲۱۶۷۸',
    type: 'حقوقی',
    panelRenewalDate: '۱۴۰۲/۰۷/۳۰',
  },
];

@Component({
  selector: 'app-exchange-office',
  standalone: true,
  imports: [ExchangeTableComponent, ButtonComponent, HeaderButtonsComponent, TableComponent],
  templateUrl: './exchange-office.component.html',
})
export class ExchangeOfficeComponent {
  dummyData: object[] = [];
  searchControl!: CustomFormControl;
  tableConfig!: TableConfig;

  constructor(private router: Router, private modal: ModalService) {
    const controls = {
      searchName: new FormControl2('', {
        label: 'جستجو بر اساس نام / نام خانوادگی',
        type: 'search',
        validators: [],
      }),
      searchPhoneNumber: new FormControl2('', {
        label: 'جستجو بر اساس شماره همراه',
        type: 'search',
        validators: [],
      }),
      searchType: new FormControl2('', {
        label: 'جستجو بر اساس حقیقی / حقوقی',
        type: 'select', // Dropdown for selecting type
        options: ['حقیقی', 'حقوقی', 'همه'], // Options
        validators: [],
      }),
      renewalDateFrom: new FormControl2('', {
        label: 'از تاریخ تمدید',
        type: 'date',
        validators: [],
      }),
      renewalDateTo: new FormControl2('', {
        label: 'تا تاریخ تمدید',
        type: 'date',
        validators: [],
      }),
    };

    this.tableConfig = {
      title: 'صرافی‌ها',
      form: new CustomFormGroup(controls),
      tableHeader: [
        'نام', // First Name
        'نام خانوادگی', // Last Name
        'شماره همراه', // Mobile Number
        'حقیقی/حقوقی', // Legal Type
        'تاریخ تمدید پنل', // Panel Renewal Date
      ],
      tableBody: exchangeOfficesData, // Placeholder for the actual data

      actions: [
        {
          callback(row) {},
          label: 'ویرایش',
          styleProps: {
            tone: 'warning',
          },
        },
        {
          callback(row) {},
          label: 'اطلاعات کامل',
          styleProps: {
            impact: 'bold',
          },
        },
        {
          callback: (row) => {
            this.openConnectModal();
          },
          label: 'اطلاعات اتصال',
          styleProps: {
            tone: 'light',
          },
        },
        {
          callback(row: any) {},
          label: 'سطوح دسترسی',
          styleProps: {
            tone: 'light',
          },
        },
      ],
    };
  }
  openConnectModal() {
    this.modal.open(ExchangeOfficeConnectInfoModalComponent, {
      width: '600px',
      maxWidth: '600px',
    });
  }
  navigateToAddExchange() {
    this.router.navigate(['/resource/exchange-office/add']);
  }
  navigateToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
