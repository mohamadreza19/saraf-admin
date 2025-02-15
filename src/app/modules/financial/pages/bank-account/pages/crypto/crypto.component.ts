import { Component, OnInit } from '@angular/core';
import { PaginationService } from 'src/app/core/services/pagination.service';
import { factory } from './pagination.factory';
import { BankAccount } from 'src/app/shared/apis/bank-account-api.service';
import { TableComponent } from '../../../../../../shared/components/tables/table/table.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BankAccountRouterLinkQuery } from '../../types';
import { TableConfig } from 'src/app/shared/models/table-config';
import { HeaderButtonsComponent } from '../../../../components/header-buttons/header-buttons.component';

@Component({
  selector: 'app-crypto',
  standalone: true,
  imports: [TableComponent, CommonModule, HeaderButtonsComponent],
  templateUrl: './crypto.component.html',
  styleUrl: './crypto.component.css',
  providers: [
    {
      provide: PaginationService,
      useFactory: factory,
    },
  ],
})
export class CryptoComponent implements OnInit {
  tableConfig!: TableConfig;
  title = '';
  tableHeader = ['شماره حساب', 'نام ارز', 'پلتفرم انتقال', 'memo'];
  constructor(
    public paginationService: PaginationService<BankAccount>,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.tableConfig = {
      tableHeader: this.tableHeader,
      title: this.title,
      tableBody: [],
    };
  }

  async ngOnInit() {
    const { currencyTypeId, languageId } = this.route.snapshot.queryParams as BankAccountRouterLinkQuery;

    this.paginationService.initPagination(currencyTypeId);
  }
  Add() {
    this.router.navigate(['financial/bank-account/crypto/mutate'], {
      queryParams: this.route.snapshot.queryParams,
      queryParamsHandling: 'merge',
    });
  }
  dash() {
    this.router.navigateByUrl('/dashboard');
  }
}
