import { AfterViewChecked, AfterViewInit, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ExchangeTableComponent } from 'src/app/modules/dashboard/components/view/exchange-table/exchange-table.component';
import { HeaderButtonsComponent } from '../../components/header-buttons/header-buttons.component';
import { CurrencyUnit } from 'src/app/shared/models/currency-unit.interface';
import { TableConfig } from 'src/app/shared/models/table-config';
import { CustomFormControl, CustomFormGroup } from 'src/app/shared/form-builder/form-builder.component';
import { TableComponent } from '../../../../shared/components/tables/table/table.component';
import { FormControl2 } from 'src/app/shared/components/form-builder2/form-builder2.component';
import { InputComponent } from '../../../../shared/components/input/input.component';

import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop';

const data = [
  {
    logo: 'https://cdn-icons-png.flaticon.com/512/1490/1490853.png',
    order: '1',
    currencyCode: 'USD',
    currencyName: 'دلار',
    currencyNicName: 'دلار آمریکا',
    baseCurrency: 'یورو',
  },
  {
    logo: 'https://cdn-icons-png.flaticon.com/512/1490/1490853.png',
    order: '2',
    currencyCode: 'USD',
    currencyName: 'دلار',
    currencyNicName: 'دلار آمریکا',
    baseCurrency: 'یورو',
  },
];
@Component({
  selector: 'app-currency',
  standalone: true,
  imports: [
    ExchangeTableComponent,
    HeaderButtonsComponent,
    TableComponent,
    InputComponent,

    //
    CdkDropList,
    CdkDrag,
  ],
  templateUrl: './currency.component.html',
  styleUrl: './currency.component.scss',
})
export class CurrencyComponent implements AfterViewInit {
  tableConfig!: TableConfig;
  control!: FormControl2;

  _activeControl = new FormControl2(true, {
    label: '',
    type: 'checkbox',
    validators: [],
  });

  data = data;

  allDataIndex!: number[];

  @ViewChild('coefficientRegistration') coefficientRegistrarTemplate!: TemplateRef<any>;
  @ViewChild('reorderTemplate') reorderTemplate!: TemplateRef<any>;
  @ViewChild('activeTemplate') activeTemplate!: TemplateRef<any>;

  constructor(private router: Router) {}

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.allDataIndex = this.data.map((_, index) => index);
    this.tableConfig = {
      title: 'ارز ها',
      form: this.generateTableForm(),
      tableHeader: ['لوگو', 'ترتیب', 'کد ارز ', 'عنوان ارز', 'عنوان مستعار', 'ارز مبنا', 'وضعیت'],
      tableBody: this.data,
      assetIndexFromBody: 0,
      actions: [
        {
          templateRef: this.activeTemplate,
        },
        {
          templateRef: this.coefficientRegistrarTemplate,
        },
        {
          label: 'ویرایش',
          callback(row) {},
        },
        // {
        //   templateRef: this.reorderTemplate,
        // },
      ],
    };
  }
  navigateToAddCurrency() {
    this.router.navigate(['/financial/currency/add']);
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
  drop(event: CdkDragDrop<any>) {
    console.log(event);
    // moveItemInArray(this.data, event.previousIndex, event.currentIndex);
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
