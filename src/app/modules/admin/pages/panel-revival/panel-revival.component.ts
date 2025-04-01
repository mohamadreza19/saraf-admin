import { Component, inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { PaginationService } from 'src/app/core/services/pagination.service';
import { factory } from './pg.factory';
import { TableConfig } from 'src/app/shared/models/table-config';

import { QueryParamUtil } from 'src/app/core/utils/query-params.util';
import { BaseList } from 'src/app/shared/types/base-list.interface';
import { AbstractMutateApiService } from 'src/app/core/base-components/single-form-mutate/single-form-mutate.component';
import { SwitchChange } from 'src/app/shared/components/swtichs/switch/switch.component';
import { Router } from '@angular/router';
import { CustomFormGroup } from 'src/app/shared/form-builder/form-builder.component';
import { withLanguageControl } from 'src/app/core/configs/with-language-control.config';
import { HeaderButtonsComponent } from '../../../financial/components/header-buttons/header-buttons.component';
import { TableComponent } from '../../../../shared/components/tables/table/table.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-panel-revival',
  templateUrl: './panel-revival.component.html',
  styleUrls: ['./panel-revival.component.css'],
  standalone: true,
  providers: [
    {
      provide: PaginationService,
      useFactory: factory,
    },
  ],
  imports: [HeaderButtonsComponent, TableComponent, CommonModule],
})
export class PanelRevivalComponent implements BaseList, OnInit {
  tableConfig!: TableConfig;
  entityApi?: AbstractMutateApiService | undefined;
  router = inject(Router);
  statusTem?: TemplateRef<any> | undefined;

  pru = inject(QueryParamUtil);
  pg = inject(PaginationService<PanelRevivalComponent>);

  constructor() {}
  generateTableConfig() {
    this.tableConfig = {
      title: $localize`لیست احیای پنل ها`,
      tableHeader: [$localize`ماژول`, $localize`ارز`, $localize`هزینه فروش`, $localize`هزینه احیا`],
      form: new CustomFormGroup(withLanguageControl({})),
      tableBody: [],

      actions: [],
    };
  }
  ngOnInit() {
    this.generateTableConfig();

    this.pru
      .setPagination(this.pg)
      .withLanguagePath((this.tableConfig.form as any).controls)
      .then();
  }
  navAdd(): void {
    this.router.navigate(['/admin/panel-revival/mutate']);
  }
  navDash(): void {}
  navEdit(index: number): void {}
  onStatusChange(event: SwitchChange, index: number): void {}
}
