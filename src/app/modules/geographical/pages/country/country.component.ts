import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CustomFormGroup } from 'src/app/shared/form-builder/form-builder.component';
import { TableConfig } from 'src/app/shared/models/table-config';
import { TableComponent } from '../../../../shared/components/tables/table/table.component';
import { FormControl2 } from 'src/app/shared/components/form-builder2/form-builder2.component';
import { Lan } from '../../constants/lan.enum';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { ModalService } from 'src/app/core/services/modal.service';

import { Router } from '@angular/router';
import { HeaderButtonsComponent } from '../../../financial/components/header-buttons/header-buttons.component';
import { PaginationService } from 'src/app/core/services/pagination.service';
import { paginationFactory } from './factories/pagination.factory';
import { CountyResponse } from 'src/app/shared/apis/country-api.service';
import { LanguageApiService } from 'src/app/shared/apis/language-api.service';
import { lastValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { PlatformService } from 'src/app/core/services/platform.service';
@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css'],
  standalone: true,
  imports: [TableComponent, InputComponent, HeaderButtonsComponent, CommonModule],
  providers: [
    {
      provide: PaginationService,
      useFactory: paginationFactory,
    },
  ],
})
export class CountryComponent implements AfterViewInit {
  tableConfig!: TableConfig;
  activeControl = new FormControl2(true, {
    label: '',
    type: 'checkbox',
    validators: [],
  });
  private languageId = '';
  @ViewChild('activeButton') activeButton!: TemplateRef<any>;
  constructor(
    private router: Router,
    private modal: ModalService,
    private lanApi: LanguageApiService,
    public pt: PlatformService,
    public paginationService: PaginationService<CountyResponse>,
  ) {}
  ngAfterViewInit(): void {
    // this.openAddCityModal(data[0]);
    this.generateTableConfig();
  }
  generateTableConfig() {
    this.tableConfig = {
      title: 'کشور',
      form: this.generateTableForm(),
      tableHeader: ['پرچم', 'نام کشور', 'مخفف', 'وضعیت'],
      tableBody: [],
      assetIndexFromBody: 0,
      actions: [
        { templateRef: this.activeButton },
        {
          label: 'ویرایش',
          callback: (_, index) => this.navEdit(index),
          styleProps: {
            tone: 'warning',
          },
        },
        {
          label: 'شهر',
          callback: (row, i) => {
            this.navCity(row, i);
          },
          styleProps: {
            tone: 'light',
          },
        },
      ],
    };
  }
  generateTableForm() {
    const controls = {
      search: new FormControl2('', {
        label: 'جستجو',
        type: 'text',
        validators: [],
      }),
      language: new FormControl2('', {
        label: 'انتخاب زبان',
        type: 'select',
        validators: [],
        options: Object.values(Lan),
      }),
    };

    return new CustomFormGroup(controls);
  }
  async ngOnInit() {
    console.log(this.pt.isServer);
    const localeLan = await lastValueFrom(this.lanApi.getBasedLocale());
    this.languageId = localeLan.id;
    this.paginationService.initPagination(localeLan.id);
  }
  navCity(_: any, rowIndex: number) {
    const country = this.paginationService.data$.getValue()[rowIndex] as CountyResponse;

    this.router.navigate(['geographical/city/'], {
      queryParams: {
        countryId: country.id,

        countryTitle: country.title,
      },
    });
  }
  navAdd() {
    this.router.navigate(['geographical/country/mutate'], {
      queryParams: { languageId: this.languageId, httpMethod: 'post' },
    });
  }
  navEdit(index: number) {
    const country = this.paginationService.data$.getValue()[index] as CountyResponse;

    this.router.navigate(['geographical/country/mutate'], {
      queryParams: { languageId: this.languageId, httpMethod: 'patch', entityId: country.id },
    });
  }
  navDash() {
    this.router.navigate(['dashboard']);
  }
}
