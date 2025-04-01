import { AfterViewInit, Component, inject, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
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
import { BaseList } from 'src/app/shared/types/base-list.interface';
import { AbstractMutateApiService } from 'src/app/core/base-components/single-form-mutate/single-form-mutate.component';
import { ExchangeApiService, ExchangeResponse } from 'src/app/shared/apis/exchange-api.service';
import { SwitchChange, SwitchComponent } from 'src/app/shared/components/swtichs/switch/switch.component';
import { lastValueFrom } from 'rxjs';
import { TConnectionDialog } from './types';

@Component({
  selector: 'app-exchange-office',
  standalone: true,
  imports: [
    ExchangeTableComponent,
    ButtonComponent,
    HeaderButtonsComponent,
    TableComponent,
    CommonModule,
    SwitchComponent,
  ],
  templateUrl: './exchange-office.component.html',
  providers: [{ provide: PaginationService, useFactory: paginationFactory }, ExchangeService],
})
export class ExchangeOfficeComponent implements OnInit, AfterViewInit, BaseList {
  searchControl!: CustomFormControl;
  entityApi = inject(ExchangeApiService);
  tableConfig!: TableConfig;
  pg = inject(PaginationService<ExchangeResponse>);
  router = inject(Router);
  @ViewChild('statusTem') statusTem!: TemplateRef<any>;

  constructor(private modal: ModalService) {}
  ngAfterViewInit(): void {
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
      searchType: new FormControl2('', {
        label: 'جستجو بر اساس حقیقی / حقوقی',
        type: 'select', // Dropdown for selecting type
        options: ['حقیقی', 'حقوقی', 'همه'], // Options
        validators: [],
      }),
    };
    this.tableConfig = {
      title: $localize`صرافی‌ها`,

      tableHeader: [
        $localize`پروفایل`, // Profile
        $localize`نام`, // First Name
        $localize`نام خانوادگی`, // Last Name
        $localize`شماره همراه`, // Mobile Number
        $localize`ایمیل`, // Email
        $localize`وضعیت`, // Status
        // 'حقیقی/حقوقی', // Legal Type
        // 'تعداد فرم های پر شده',
      ],
      tableBody: [], // Placeholder for the actual data
      assetIndexFromBody: 0,
      actions: [
        {
          templateRef: this.statusTem,
          onContext: (_, index) => ({
            selected: this.pg.data$.getValue()[index].active ? true : false,
            onStatusChange: (event: SwitchChange) => this.onStatusChange(event),
          }),
        },
        {
          label: $localize`ویرایش`, // Edit
          styleProps: {
            tone: 'warning',
          },
          callback: (row, rowIndex: number) => this.navEdit(rowIndex),
        },
        {
          callback: (_, index) => this.openConnectModal(index),
          label: $localize`اطلاعات اتصال`, // Connection Information
          styleProps: {
            tone: 'light',
          },
        },
        {
          callback: (row: any) => {
            this.openPrivilegeModal();
          },
          label: $localize`دسترسی`, // Access
          styleProps: {
            tone: 'light',
          },
        },
        {
          callback: (row: any) => {
            this.openPasswordModal();
          },
          label: $localize`رمز عبور`, // Password
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
  async openConnectModal(index: number) {
    const exchange = this.pg.data$.getValue()[index];

    const exchangeDetail = await lastValueFrom(this.entityApi.getOneById(exchange.id));

    const data: TConnectionDialog = {
      connection: exchangeDetail.data.exchangeConnection,
      entityId: exchange.id,
      entityName: `${exchange.name} ${exchange.family}`,
    };
    this.modal.open(ExchangeOfficeConnectInfoModalComponent, {
      width: '600px',
      maxWidth: '600px',
      data: data,
    });
  }
  navAdd() {
    this.router.navigate(['/resource/exchange-office/mutate']);
  }
  navDash() {
    this.router.navigate(['/dashboard']);
  }
  async onStatusChange(event: SwitchChange) {
    const record = this.pg.data$.getValue()[Number(event.name)];

    await lastValueFrom(
      this.entityApi.patchStatus(record.id, {
        active: event.value ? 1 : 0,
      }),
    );
  }
  async ngOnInit() {
    this.pg.initPagination('');
  }
  navEdit(rowIndex: number) {
    const id = this.pg.data$.getValue().find((_, index) => index == rowIndex)?.id;
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
