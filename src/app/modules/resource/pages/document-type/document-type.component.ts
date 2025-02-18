import { Component, inject, OnInit } from '@angular/core';
import { PaginationService } from 'src/app/core/services/pagination.service';
import { factory } from './pg.factory';
import { DocumentTypeResponse } from 'src/app/shared/apis/document-type-api.service';
import { Language, LanguageApiService } from 'src/app/shared/apis/language-api.service';
import { lastValueFrom } from 'rxjs';
import { TableComponent } from '../../../../shared/components/tables/table/table.component';
import { CommonModule } from '@angular/common';
import { TableConfig } from 'src/app/shared/models/table-config';
import { Router } from '@angular/router';
import { HeaderButtonsComponent } from '../../../financial/components/header-buttons/header-buttons.component';

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
export class DocumentTypeComponent implements OnInit {
  lanApi = inject(LanguageApiService);
  tableConfig: TableConfig;
  lan!: Language;
  constructor(public pg: PaginationService<DocumentTypeResponse>, private router: Router) {
    this.tableConfig = {
      title: 'لیست انواع مدارک',
      tableBody: [],
      tableHeader: ['عنوان', 'تعداد صفحه', 'دارای شناسه'],
    };
  }

  async ngOnInit() {
    this.lan = await lastValueFrom(this.lanApi.getBasedLocale());
    this.pg.initPagination(this.lan.id);
  }
  navAdd() {
    this.router.navigate(['/resource/document-type/mutate'], {
      queryParams: {
        languageId: this.lan.id,
      },
    });
  }
  navD() {}
}
