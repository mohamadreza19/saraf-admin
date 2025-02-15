import { Component, OnInit } from '@angular/core';
import { PaginationService } from 'src/app/core/services/pagination.service';

import { BankAccountRouterLinkQuery } from '../../types';
import { BankAccount } from 'src/app/shared/apis/bank-account-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TableConfig } from 'src/app/shared/models/table-config';

@Component({
  selector: 'app-global-base',
  templateUrl: './global-base.component.html',
  styleUrls: ['./global-base.component.css'],
  standalone: true,
})
export class GlobalBaseComponent implements OnInit {
  tableConfig!: TableConfig;
  title = '';
  urlPath = '';
  tableHeader = ['شماره حساب', 'نام بانک', 'نام کارت', 'کشور', 'شهر'];

  constructor(
    public paginationService: PaginationService<BankAccount>,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    setTimeout(() => {
      this.tableConfig = {
        tableHeader: this.tableHeader,
        title: this.title,
        tableBody: [],
      };
    }, 200);
  }

  async ngOnInit() {
    const { currencyTypeId, languageId } = this.route.snapshot.queryParams as BankAccountRouterLinkQuery;

    this.paginationService.initPagination(currencyTypeId);
  }
  Add() {
    this.router.navigate([`financial/bank-account/${this.urlPath}/mutate`], {
      queryParams: this.route.snapshot.queryParams,
      queryParamsHandling: 'merge',
    });
  }
  dash() {
    this.router.navigateByUrl('/dashboard');
  }
}
