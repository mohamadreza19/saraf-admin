import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CustomFormGroup } from 'src/app/shared/form-builder/form-builder.component';
import { TableConfig } from 'src/app/shared/models/table-config';
import { TableComponent } from '../../../shared/components/tables/table/table.component';
import { FormControl2 } from 'src/app/shared/components/form-builder2/form-builder2.component';
import { Lan } from '../constants/lan.enum';
import { InputComponent } from '../../../shared/components/input/input.component';
import { ModalService } from 'src/app/core/services/modal.service';
import { CityMutateComponent } from '../city/city-mutate/city-mutate.component';
import { Country } from './types/country.interface';
import { Router } from '@angular/router';
import { HeaderButtonsComponent } from '../../financial/components/header-buttons/header-buttons.component';
const data = [
  {
    flag: 'https://flagcdn.com/w320/ir.png',
    countryName: 'Iran',
    abbreviation: 'IR',
    mainCurrency: 'Rial',
    description: 'Country in the Middle East',
  },
  {
    flag: 'https://flagcdn.com/w320/us.png',
    countryName: 'United States',
    abbreviation: 'US',
    mainCurrency: 'Dollar',
    description: 'Country in North America',
  },
  {
    flag: 'https://flagcdn.com/w320/de.png',
    countryName: 'Germany',
    abbreviation: 'DE',
    mainCurrency: 'Euro',
    description: 'Country in Europe',
  },
];
@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css'],
  standalone: true,
  imports: [TableComponent, InputComponent, HeaderButtonsComponent],
})
export class CountryComponent implements AfterViewInit {
  tableConfig!: TableConfig;
  activeControl = new FormControl2(true, {
    label: '',
    type: 'checkbox',
    validators: [],
  });
  @ViewChild('activeButton') activeButton!: TemplateRef<any>;
  constructor(private router: Router, private modal: ModalService) {}
  ngAfterViewInit(): void {
    // this.openAddCityModal(data[0]);
    this.generateTableConfig();
  }
  generateTableConfig() {
    this.tableConfig = {
      title: 'کشور',
      form: this.generateTableForm(),
      tableHeader: ['پرچم', 'نام کشور', 'مخفف', 'واحد پول اصلی', 'توضیح', 'وضعیت'],
      tableBody: data,
      assetIndexFromBody: 0,
      actions: [
        { templateRef: this.activeButton },
        {
          label: 'ویرایش',
          callback: () => {},
          styleProps: {
            tone: 'warning',
          },
        },
        {
          label: 'شهر',
          callback: (row) => {
            this.openAddCityModal(row);
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
  ngOnInit() {}
  openAddCityModal(row: Country) {
    this.modal.open(CityMutateComponent, {
      data: row,
      maxHeight: '600px',
    });
  }
  navAdd() {
    this.router.navigate(['geographical/country/add']);
  }
  navDash() {
    this.router.navigate(['dashboard']);
  }
}
