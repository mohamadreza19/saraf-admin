import { AfterViewInit, Component, inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { PaginationService } from 'src/app/core/services/pagination.service';
import { factory } from './pagination.factory';
import { BankAccount, BankAccountApiService } from 'src/app/shared/apis/bank-account-api.service';
import { TableComponent } from '../../../../../../shared/components/tables/table/table.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BankAccountRouterLinkQuery } from '../../types';
import { TableConfig } from 'src/app/shared/models/table-config';
import { HeaderButtonsComponent } from '../../../../components/header-buttons/header-buttons.component';
import { BaseList } from 'src/app/shared/types/base-list.interface';
import { SwitchChange } from 'src/app/shared/components/swtichs/switch/switch.component';
import { lastValueFrom } from 'rxjs';

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
export class CryptoComponent implements AfterViewInit, BaseList {
  tableConfig!: TableConfig;
  entityApi_ = inject(BankAccountApiService);
  pg = inject(PaginationService<BankAccount>);
  router = inject(Router);

  @ViewChild('statusTem') statusTem!: TemplateRef<any>;

  // Localization for table headers and title
  tableHeader = [$localize`شماره حساب`, $localize`نام ارز`, $localize`پلتفرم انتقال`, $localize`memo`];
  title = $localize`لیست شماره حساب های رمزارز`;

  constructor(public paginationService: PaginationService<BankAccount>, private route: ActivatedRoute) {
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

  navAdd() {
    this.router.navigate(['financial/bank-account/crypto/mutate'], {
      queryParams: this.route.snapshot.queryParams,
      queryParamsHandling: 'merge',
    });
  }

  navDash() {
    this.router.navigateByUrl('/dashboard');
  }

  navEdit(index: number): void {}

  ngAfterViewInit(): void {}

  async onStatusChange(event: SwitchChange, index: number) {
    const record = this.pg.data$.getValue()[index] as BankAccount;

    await lastValueFrom(this.entityApi_.patchAccount(record.id, { active: event.value ? 1 : 0 }));
  }
}
