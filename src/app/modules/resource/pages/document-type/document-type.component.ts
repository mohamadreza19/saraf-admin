import { Component, inject, OnInit, TemplateRef } from '@angular/core';
import { PaginationService } from 'src/app/core/services/pagination.service';
import { factory } from './pg.factory';
import { DocumentTypeResponse } from 'src/app/shared/apis/document-type-api.service';
import { LanguageApiService } from 'src/app/shared/apis/language-api.service';
import { TableComponent } from '../../../../shared/components/tables/table/table.component';
import { CommonModule } from '@angular/common';
import { TableConfig } from 'src/app/shared/models/table-config';
import { Router } from '@angular/router';
import { HeaderButtonsComponent } from '../../../financial/components/header-buttons/header-buttons.component';
import { BaseList } from 'src/app/shared/types/base-list.interface';
import { QueryParamUtil } from 'src/app/core/utils/query-params.util';
import { CustomFormGroup } from 'src/app/shared/form-builder/form-builder.component';
import { withLanguageControl } from 'src/app/core/configs/with-language-control.config';
import { SwitchChange } from 'src/app/shared/components/swtichs/switch/switch.component';

@Component({
  selector: 'app-document-type',
  standalone: true,
  templateUrl: './document-type.component.html',
  styleUrls: ['./document-type.component.css'],
  providers: [
    {
      provide: PaginationService,
      useFactory: factory,
    },
  ],
  imports: [TableComponent, CommonModule, HeaderButtonsComponent],
})
export class DocumentTypeComponent implements BaseList, OnInit {
  lanApi = inject(LanguageApiService);
  pg = inject(PaginationService<DocumentTypeResponse>);
  pru = inject(QueryParamUtil);
  router = inject(Router);
  statusTem?: TemplateRef<any> | undefined;
  tableConfig: TableConfig;

  constructor() {
    this.tableConfig = {
      title: $localize`لیست انواع مدارک`,
      tableBody: [],
      form: new CustomFormGroup(withLanguageControl({})),
      tableHeader: [$localize`عنوان`, $localize`تعداد صفحه`, $localize`دارای شناسه`],
    };
  }

  async ngOnInit() {
    this.pru
      .setPagination(this.pg)
      .withLanguagePath((this.tableConfig.form as any).controls)
      .then();
  }

  navDash(): void {}
  navEdit(index: number): void {}
  onStatusChange(event: SwitchChange, index: number): void {}

  navAdd() {
    this.router.navigate(['/resource/document-type/mutate'], {});
  }

  navD() {}
}
