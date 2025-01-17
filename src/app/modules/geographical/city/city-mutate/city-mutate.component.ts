import { Component, Inject, OnInit } from '@angular/core';
import { FormControl2, FormBuilder2Component } from 'src/app/shared/components/form-builder2/form-builder2.component';
import { CustomFormGroup } from 'src/app/shared/form-builder/form-builder.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Country } from '../../country/types/country.interface';
import { TableComponent } from '../../../../shared/components/tables/table/table.component';
import { TableConfig } from 'src/app/shared/models/table-config';

@Component({
  selector: 'app-city-mutate',
  templateUrl: './city-mutate.component.html',
  styleUrls: ['./city-mutate.component.css'],
  standalone: true,
  imports: [FormBuilder2Component, TableComponent],
})
export class CityMutateComponent implements OnInit {
  forms: CustomFormGroup[] = [];
  tableConfig!: TableConfig;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Country) {
    this.generateForm();
    this.generateTableConfig();
  }

  ngOnInit() {}

  generateForm() {
    const controls = {
      flag: new FormControl2(this.data.flag, {
        label: 'پرچم',
        type: 'readonly-img',
        validators: [],
      }),
      countryName: new FormControl2(this.data.countryName, {
        label: 'نام کشور',
        type: 'text',
        validators: [],
      }),
      cityName: new FormControl2('', {
        label: 'نام شهر',
        type: 'text',
        validators: [],
      }),
      description: new FormControl2('', {
        label: 'توضیح',
        type: 'text',
        validators: [],
      }),
    };
    controls.countryName.disable();
    this.forms.push(new CustomFormGroup(controls, '', 'ثبت '));
  }
  generateTableConfig() {
    this.tableConfig = {
      title: 'شهر ها',

      tableHeader: [' کشور', 'نام شهر', 'توضیح'],
      tableBody: [
        {
          countryName: 'Iran',
          cityName: 'Tehran',
          description: 'Capital of Iran',
        },
      ],
    };
  }
}
