import { AfterViewInit, Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { CustomFormGroup } from 'src/app/shared/form-builder/form-builder.component';
import { TableConfig } from 'src/app/shared/models/table-config';
import { TableComponent } from '../../../../shared/components/tables/table/table.component';
import { FormControl2 } from 'src/app/shared/components/form-builder2/form-builder2.component';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { ModalService } from 'src/app/core/services/modal.service';
import { Router } from '@angular/router';
import { HeaderButtonsComponent } from '../../../financial/components/header-buttons/header-buttons.component';
import { PaginationService } from 'src/app/core/services/pagination.service';
import { paginationFactory } from './factories/pagination.factory';
import { CountryApiService, CountyResponse } from 'src/app/shared/apis/country-api.service';
import { LanguageApiService } from 'src/app/shared/apis/language-api.service';
import { lastValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { BaseList } from 'src/app/shared/types/base-list.interface';
import { SwitchChange, SwitchComponent } from 'src/app/shared/components/swtichs/switch/switch.component';
import { QueryParamUtil } from 'src/app/core/utils/query-params.util';
import { withLanguageControl } from 'src/app/core/configs/with-language-control.config';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css'],
  standalone: true,
  imports: [TableComponent, InputComponent, HeaderButtonsComponent, CommonModule, SwitchComponent],
  providers: [
    {
      provide: PaginationService,
      useFactory: paginationFactory,
    },
  ],
})
export class CountryComponent implements AfterViewInit, BaseList {
  tableConfig!: TableConfig;
  entityApi = inject(CountryApiService);
  router = inject(Router);
  pru = inject(QueryParamUtil);
  pg = inject(PaginationService<CountyResponse>);

  @ViewChild('statusTem') statusTem!: TemplateRef<any>;

  constructor(private modal: ModalService, private lanApi: LanguageApiService) {}

  ngAfterViewInit(): void {
    this.generateTableConfig();
    this.pru
      .setPagination(this.pg)
      .withLanguagePath((this.tableConfig.form as any).controls)
      .then();
  }

  generateTableConfig() {
    this.tableConfig = {
      title: $localize`کشور`,
      form: new CustomFormGroup(withLanguageControl({})),
      tableHeader: [$localize`پرچم`, $localize`نام کشور`, $localize`مخفف`, $localize`وضعیت`],
      tableBody: [],
      assetIndexFromBody: 0,
      actions: [
        {
          templateRef: this.statusTem,
          onContext: (_, index) => ({
            selected: this.pg.data$.getValue()[index].active ? true : false,
            onStatusChange: (event: SwitchChange) => this.onStatusChange(event),
          }),
        },
        {
          label: $localize`شهر`,
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

  navCity(_: any, rowIndex: number) {
    const country = this.pg.data$.getValue()[rowIndex] as CountyResponse;

    this.router.navigate(['geographical/city/'], {
      queryParams: {
        countryId: country.id,
        countryTitle: country.title,
      },
    });
  }

  navAdd() {
    this.router.navigate(['geographical/country/mutate']);
  }

  async onStatusChange(event: SwitchChange) {
    const record = this.pg.data$.getValue()[Number(event.name)];
    await lastValueFrom(this.entityApi.patch(record.id, { active: event.value ? 1 : 0 }));
  }

  navEdit(index: number) {
    const country = this.pg.data$.getValue()[index] as CountyResponse;
    this.router.navigate(['geographical/country/mutate'], {
      queryParams: { httpMethod: 'patch', entityId: country.id },
    });
  }

  navDash() {
    this.router.navigate(['dashboard']);
  }
}
