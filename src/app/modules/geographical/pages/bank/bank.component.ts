import { AfterViewInit, Component, inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { HeaderButtonsComponent } from '../../../financial/components/header-buttons/header-buttons.component';
import { ExchangeTableComponent } from 'src/app/modules/dashboard/components/view/exchange-table/exchange-table.component';
import { Router } from '@angular/router';
import { TableConfig } from 'src/app/shared/models/table-config';
import { TableComponent } from '../../../../shared/components/tables/table/table.component';
import { FormControl2 } from 'src/app/shared/components/form-builder2/form-builder2.component';
import { CustomFormGroup } from 'src/app/shared/form-builder/form-builder.component';
import { PaginationService } from 'src/app/core/services/pagination.service';
import { BankApiService, BankResponse } from 'src/app/shared/apis/bank-api.service';
import { factory } from './pg.factory';
import { CommonModule } from '@angular/common';
import { LanguageApiService } from 'src/app/shared/apis/language-api.service';
import { lastValueFrom } from 'rxjs';
import { SwitchChange, SwitchComponent } from '../../../../shared/components/swtichs/switch/switch.component';
import { BaseList } from 'src/app/shared/types/base-list.interface';
import { withLanguageControl } from 'src/app/core/configs/with-language-control.config';
import { QueryParamUtil } from 'src/app/core/utils/query-params.util';

@Component({
  selector: 'app-bank',
  standalone: true,
  imports: [HeaderButtonsComponent, ExchangeTableComponent, TableComponent, CommonModule, SwitchComponent],
  templateUrl: './bank.component.html',
  providers: [
    {
      provide: PaginationService,
      useFactory: factory,
    },
  ],
})
export class BankComponent implements OnInit, AfterViewInit, BaseList {
  tableConfig!: TableConfig;
  lan = inject(LanguageApiService);
  router = inject(Router);
  @ViewChild('activeTem') activeTem!: TemplateRef<any>;

  bankApi = inject(BankApiService);
  //
  //
  pru = inject(QueryParamUtil);
  pg = inject(PaginationService<BankResponse>);
  constructor() {}
  async ngOnInit() {}
  ngAfterViewInit(): void {
    this.generateTableConfig();

    this.pru
      .setPagination(this.pg)
      .withLanguagePath((this.tableConfig.form as any).controls)
      .then();
  }
  generateTableConfig() {
    this.tableConfig = {
      title: $localize`بانک ها`,
      form: new CustomFormGroup(withLanguageControl({})),
      tableHeader: [$localize`لگو`, $localize`عنوان`, $localize`شهر`, $localize`ارز`],
      tableBody: [],
      assetIndexFromBody: 0,
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

  async onStatusChange(event: SwitchChange, index: number) {
    const record = this.pg.data$.getValue()[index] as BankResponse;

    await lastValueFrom(this.bankApi.patch(record.id, { active: event.value ? 1 : 0 }));
  }
  navAdd() {
    this.router.navigate(['/geographical/bank/mutate']);
  }
  navDash() {
    this.router.navigate(['/dashboard']);
  }
}
