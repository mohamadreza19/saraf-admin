import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginationService } from 'src/app/core/services/pagination.service';
import { BankAccount } from 'src/app/shared/apis/bank-account-api.service';
import { TableConfig } from 'src/app/shared/models/table-config';
import { BankAccountRouterLinkQuery } from '../../types';
import { TableComponent } from '../../../../../../shared/components/tables/table/table.component';
import { HeaderButtonsComponent } from '../../../../components/header-buttons/header-buttons.component';
import { CommonModule } from '@angular/common';

import { factory } from './pagination.factory';

@Component({
  selector: 'app-ir',
  standalone: true,
  imports: [TableComponent, HeaderButtonsComponent, CommonModule],
  templateUrl: './ir.component.html',
  styleUrl: './ir.component.css',
  providers: [
    {
      provide: PaginationService,
      useFactory: factory,
    },
  ],
})
export class IrComponent {
  tableConfig!: TableConfig;

  constructor(
    public paginationService: PaginationService<BankAccount>,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.tableConfig = {
      tableHeader: ['شماره حساب', 'نام شعبه', 'نام بانک', 'کشور', 'شهر'],
      title: 'لیست حساب های ایرانی',
      tableBody: [],
    };
  }

  async ngOnInit() {
    const { currencyTypeId, languageId } = this.route.snapshot.queryParams as BankAccountRouterLinkQuery;

    this.paginationService.initPagination(currencyTypeId);
  }

  Add() {
    this.router.navigate([`financial/bank-account/ir/mutate`], {
      queryParams: this.route.snapshot.queryParams,
      queryParamsHandling: 'merge',
    });
  }
  dash() {
    this.router.navigateByUrl('/dashboard');
  }
}
