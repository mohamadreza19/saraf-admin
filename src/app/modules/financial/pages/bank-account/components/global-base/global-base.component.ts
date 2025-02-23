import { AfterViewInit, Component, inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { PaginationService } from 'src/app/core/services/pagination.service';

import { BankAccountRouterLinkQuery } from '../../types';
import { BankAccount, BankAccountApiService } from 'src/app/shared/apis/bank-account-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TableConfig } from 'src/app/shared/models/table-config';
import { BaseList } from 'src/app/shared/types/base-list.interface';
import { SwitchChange } from 'src/app/shared/components/swtichs/switch/switch.component';
import { AbstractMutateApiService } from 'src/app/core/base-components/single-form-mutate/single-form-mutate.component';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-global-base',
  templateUrl: './global-base.component.html',
  styleUrls: ['./global-base.component.css'],
  standalone: true,
})
export class GlobalBaseComponent implements AfterViewInit, BaseList {
  tableConfig!: TableConfig;
  title = $localize`لیست حساب ها`; // Example: localize title text
  urlPath = '';
  tableHeader = [
    $localize`شماره حساب`, // Localized header text
    $localize`نام بانک`,
    $localize`نام کارت`,
    $localize`کشور`,
    $localize`شهر`,
  ];

  entityApi_ = inject(BankAccountApiService);
  pg = inject(PaginationService<BankAccount>);
  router = inject(Router);

  @ViewChild('statusTem') statusTem!: TemplateRef<any>;

  constructor(private route: ActivatedRoute) {}

  ngAfterViewInit(): void {
    this.tableConfig = {
      tableHeader: this.tableHeader,
      title: this.title,
      tableBody: [],
      actions: [
        {
          templateRef: this.statusTem,
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

  async ngOnInit() {
    const { currencyTypeId, languageId } = this.route.snapshot.queryParams as BankAccountRouterLinkQuery;

    this.pg.initPagination(currencyTypeId);
  }

  navAdd() {
    this.router.navigate([`financial/bank-account/${this.urlPath}/mutate`], {
      queryParams: this.route.snapshot.queryParams,
      queryParamsHandling: 'merge',
    });
  }

  navDash() {
    this.router.navigateByUrl('/dashboard');
  }

  navEdit(index: number): void {}

  async onStatusChange(event: SwitchChange, index: number) {
    const record = this.pg.data$.getValue()[index] as BankAccount;

    await lastValueFrom(this.entityApi_.patchAccount(record.id, { active: event.value ? 1 : 0 }));
  }
}
