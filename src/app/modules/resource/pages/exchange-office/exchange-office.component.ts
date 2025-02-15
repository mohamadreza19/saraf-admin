import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ExchangeTableComponent } from 'src/app/modules/dashboard/components/view/exchange-table/exchange-table.component';
import { exchangeOffice } from 'src/app/modules/dashboard/models/exchange-office';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { HeaderButtonsComponent } from '../../../financial/components/header-buttons/header-buttons.component';
import { Router } from '@angular/router';
import { TableComponent } from '../../../../shared/components/tables/table/table.component';
import { TableConfig } from 'src/app/shared/models/table-config';
import { CustomFormControl, CustomFormGroup } from 'src/app/shared/form-builder/form-builder.component';
import { FormControl2 } from 'src/app/shared/components/form-builder2/form-builder2.component';
import { ModalService } from 'src/app/core/services/modal.service';
import { ExchangeOfficeConnectInfoModalComponent } from '../../../financial/components/exchange-office-connect-info-modal/exchange-office-connect-info-modal.component';
import { ExchangeOfficePrivilegeModalComponent } from './components/exchange-office-privilege-modal/exchange-office-privilege-modal.component';
import { ExchangeOfficePasswordModalComponent } from './components/exchange-office-password-modal/exchange-office-password-modal.component';

import { PaginationService } from 'src/app/core/services/pagination.service';
import { paginationFactory } from './factories/pagination.factory';
import { ExchangeService } from './services/exchange.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-exchange-office',
  standalone: true,
  imports: [ExchangeTableComponent, ButtonComponent, HeaderButtonsComponent, TableComponent, CommonModule],
  templateUrl: './exchange-office.component.html',
  providers: [{ provide: PaginationService, useFactory: paginationFactory }, ExchangeService],
})
export class ExchangeOfficeComponent implements OnInit {
  searchControl!: CustomFormControl;

  tableConfig!: TableConfig;

  constructor(private router: Router, private modal: ModalService, public service: ExchangeService) {
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
        'پروفایل',
        'نام', // First Name
        'نام خانوادگی', // Last Name
        'شماره همراه', // Mobile Number
        'ایمیل',
        // 'حقیقی/حقوقی', // Legal Type
        // 'تعداد فرم های پر شده',
      ],
      tableBody: [], // Placeholder for the actual data
      assetIndexFromBody: 0,
      actions: [
        {
          label: 'اطلاعات کامل',
          styleProps: {
            impact: 'bold',
          },
          callback: (row, rowIndex: number) => this.navToEdit(rowIndex),
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
          callback: (row: any) => {
            this.openPrivilegeModal();
          },
          label: ' دسترسی',
          styleProps: {
            tone: 'light',
          },
        },
        {
          callback: (row: any) => {
            this.openPasswordModal();
          },
          label: ' رمز عبور',
          styleProps: {
            tone: 'light',
          },
        },
      ],
      customStylePerColumn: {
        4: 'p-3 bg-green-100 font-bold text-green-700 rounded-lg',
        3: 'p-3 bg-yellow-100 font-bold text-yellow-700 rounded-lg',
        2: 'p-3 bg-yellow-100 font-bold text-yellow-700 rounded-lg',
        1: 'p-3 bg-yellow-100 font-bold text-yellow-700 rounded-lg',
      },
    };
  }

  openConnectModal() {
    this.modal.open(ExchangeOfficeConnectInfoModalComponent, {
      width: '600px',
      maxWidth: '600px',
    });
  }
  navigateToAddExchange() {
    this.router.navigate(['/resource/exchange-office/mutate']);
  }
  navigateToDashboard() {
    this.router.navigate(['/dashboard']);
  }
  async ngOnInit() {
    this.service.pagination.initPagination('');
  }
  navToEdit(rowIndex: number) {
    const id = this.service.pagination.data$.getValue().find((_, index) => index == rowIndex)?.id;
    if (!id) throw Error('Can not find Id');
    this.router.navigate(['/resource/exchange-office/mutate'], {
      queryParams: { exchangeId: id },
    });
  }

  openPrivilegeModal() {
    this.modal.open(ExchangeOfficePrivilegeModalComponent, {
      width: '600px',
      maxWidth: '600px',
    });
  }
  openPasswordModal() {
    this.modal.open(ExchangeOfficePasswordModalComponent, {
      width: '600px',
      maxWidth: '600px',
    });
  }
}
