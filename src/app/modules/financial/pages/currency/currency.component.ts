import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  inject,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { ExchangeTableComponent } from 'src/app/modules/dashboard/components/view/exchange-table/exchange-table.component';
import { HeaderButtonsComponent } from '../../components/header-buttons/header-buttons.component';
import { CurrencyUnit } from 'src/app/shared/models/currency-unit.interface';
import { TableConfig } from 'src/app/shared/models/table-config';
import { CustomFormControl, CustomFormGroup } from 'src/app/shared/form-builder/form-builder.component';
import { TableComponent } from '../../../../shared/components/tables/table/table.component';
import { FormControl2 } from 'src/app/shared/components/form-builder2/form-builder2.component';
import { InputComponent } from '../../../../shared/components/input/input.component';

import { PaginationService } from 'src/app/core/services/pagination.service';
import { factory } from './pg.factory';
import { CurrencyApiService, CurrencyResponse } from 'src/app/shared/apis/currency-api.service';
import { lastValueFrom } from 'rxjs';
import { LanguageApiService } from 'src/app/shared/apis/language-api.service';
import { CommonModule } from '@angular/common';
import { SwitchChange, SwitchComponent } from '../../../../shared/components/swtichs/switch/switch.component';

@Component({
  selector: 'app-currency',
  standalone: true,
  imports: [
    ExchangeTableComponent,
    HeaderButtonsComponent,
    TableComponent,
    InputComponent,
    CommonModule,
    SwitchComponent,
  ],
  templateUrl: './currency.component.html',
  styleUrl: './currency.component.scss',
  providers: [{ provide: PaginationService, useFactory: factory }],
})
export class CurrencyComponent implements AfterViewInit {
  tableConfig!: TableConfig;
  control!: FormControl2;

  data = [];

  allDataIndex!: number[];

  @ViewChild('coefficientRegistration') coefficientRegistrarTemplate!: TemplateRef<any>;
  @ViewChild('reorderTemplate') reorderTemplate!: TemplateRef<any>;
  @ViewChild('activeTemplate') activeTemplate!: TemplateRef<any>;
  lanApi = inject(LanguageApiService);
  lan = '';
  currencyApi = inject(CurrencyApiService);
  timeoutId: any;
  constructor(private router: Router, public pg: PaginationService<CurrencyResponse>) {}

  async ngOnInit() {
    const lan = await lastValueFrom(this.lanApi.getBasedLocale());
    this.lan = lan.id;
    this.pg.initPagination(lan.id);
  }
  ngAfterViewInit(): void {
    this.pg.data$.subscribe((data) => {
      this.allDataIndex = data.map((_, index) => index);
    });
    this.tableConfig = {
      title: 'ارز ها',
      form: this.generateTableForm(),
      tableHeader: ['لوگو', 'نام', 'ضریب پایه', 'وضعیت'],
      tableBody: [],
      assetIndexFromBody: 0,
      actions: [
        {
          templateRef: this.coefficientRegistrarTemplate,
          onContext: (_, index) => ({
            baseCoefficient: this.pg.data$.getValue()[index].baseCoefficient,
            onEachBaseCoefficientChange: (event: Event, index: number) =>
              this.onEachBaseCoefficientChange(event, index),
          }),
        },
        {
          templateRef: this.activeTemplate,
          onContext: (_, index) => ({
            selected: this.pg.data$.getValue()[index].active,
            statusChange: (event: SwitchChange) => this.onEachStatusChange(event),
          }),
        },
        {
          label: 'ویرایش',
          callback: (_, index) => {
            // this.navEdit(index);
          },
        },
        // {
        //   templateRef: this.reorderTemplate,
        // },
      ],
    };
  }
  async onEachStatusChange(event: SwitchChange) {
    const currency = this.pg.data$.getValue()[Number(event.name)] as CurrencyResponse;

    await lastValueFrom(this.currencyApi.patch(currency.id, { active: event.value }));
  }
  async onEachBaseCoefficientChange(event: Event, index: number) {
    const value = (event.target as HTMLInputElement).value;
    const currency = this.pg.data$.getValue()[index] as CurrencyResponse;
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    this.timeoutId = setTimeout(async () => {
      if (Number(value)) {
        await lastValueFrom(this.currencyApi.patch(currency.id, { baseCoefficient: value }));
      }
    }, 500);
  }
  navAdd() {
    this.router.navigate(['/financial/currency/mutate']);
  }
  navEdit(index: number) {
    const entity = this.pg.data$.getValue()[index];
    this.router.navigate(['/financial/currency/mutate'], {
      queryParams: { languageId: this.lan, httpMethod: 'patch', entityId: entity.id },
    });
  }
  backToDash() {
    this.router.navigate(['/dashboard']);
  }
  generateTableForm() {
    const controls = {
      search: new CustomFormControl('', {
        label: 'جستجو',
        type: 'search',

        validators: [],
      }),
      currencyOrder: new CustomFormControl('', {
        type: 'select',
        label: 'ترتیب نمایش',
        options: ['غیرفعال', 'فعال'],

        validators: [],
      }),
      currencyOrderType: new CustomFormControl('', {
        type: 'select',
        label: 'نوع',
        options: ['رسمی', 'شخصی'],

        validators: [],
      }),
    };
    return new CustomFormGroup(controls);
  }

  onEachCurrencyReorder(event: Event, currencyIndex: number) {
    const input = event.target as HTMLInputElement;

    const targetIndex = Number(input.value);

    const currencyRow = this.data[currencyIndex];
    const targetCurrencyRow = this.data[targetIndex];

    this.data[currencyIndex] = targetCurrencyRow;
    this.data[targetIndex] = currencyRow;
  }
}
