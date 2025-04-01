import { AfterViewInit, Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginationService } from 'src/app/core/services/pagination.service';
import { BankAccount, BankAccountApiService } from 'src/app/shared/apis/bank-account-api.service';
import { TableConfig } from 'src/app/shared/models/table-config';
import { BankAccountRouterLinkQuery } from '../../types';
import { TableComponent } from '../../../../../../shared/components/tables/table/table.component';
import { HeaderButtonsComponent } from '../../../../components/header-buttons/header-buttons.component';
import { CommonModule } from '@angular/common';

import { factory } from './pagination.factory';
import { BaseList } from 'src/app/shared/types/base-list.interface';

import { SwitchChange, SwitchComponent } from 'src/app/shared/components/swtichs/switch/switch.component';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-ir',
  standalone: true,
  imports: [TableComponent, HeaderButtonsComponent, CommonModule, SwitchComponent],
  templateUrl: './ir.component.html',
  styleUrl: './ir.component.css',
  providers: [
    {
      provide: PaginationService,
      useFactory: factory,
    },
  ],
})
export class IrComponent implements AfterViewInit, BaseList {
  tableConfig!: TableConfig;
  entityApi_ = inject(BankAccountApiService);
  pg = inject(PaginationService<BankAccount>);
  router = inject(Router);
  @ViewChild('activeTem') activeTem!: TemplateRef<any>;

  constructor(private route: ActivatedRoute) {}

  async ngOnInit() {
    const { currencyTypeId } = this.route.snapshot.queryParams as BankAccountRouterLinkQuery;

    this.pg.initPagination(currencyTypeId);
  }

  ngAfterViewInit(): void {
    this.tableConfig = {
      tableHeader: [$localize`شماره حساب`, $localize`نام شعبه`, $localize`نام بانک`, $localize`کشور`, $localize`شهر`],
      title: $localize`لیست حساب های ایرانی`,
      tableBody: [],
      actions: [
        {
          templateRef: this.activeTem,
          onContext: (_, index) => {
            return {
              onStatusChange: (e: SwitchChange, index: number) => this.onStatusChange(e, index),
              selected: this.pg.data$.getValue()[index].active ? true : false,
            };
          },
        },
      ],
    };
  }

  navEdit(index: number): void {}

  async onStatusChange(event: SwitchChange, index: number) {
    const record = this.pg.data$.getValue()[index] as BankAccount;

    await lastValueFrom(this.entityApi_.patchAccount(record.id, { active: event.value ? 1 : 0 }));
  }

  navAdd() {
    this.router.navigate([`financial/bank-account/ir/mutate`], {
      queryParams: this.route.snapshot.queryParams,
      queryParamsHandling: 'merge',
    });
  }

  navDash() {
    this.router.navigateByUrl('/dashboard');
  }
}
