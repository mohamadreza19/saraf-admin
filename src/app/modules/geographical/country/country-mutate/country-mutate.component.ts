import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl2, FormBuilder2Component } from 'src/app/shared/components/form-builder2/form-builder2.component';
import { CustomFormGroup } from 'src/app/shared/form-builder/form-builder.component';
import { Lan } from '../../constants/lan.enum';
import { HeaderButtonsComponent } from '../../../financial/components/header-buttons/header-buttons.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-country-mutate',
  templateUrl: './country-mutate.component.html',
  styleUrls: ['./country-mutate.component.css'],
  standalone: true,
  imports: [FormBuilder2Component, HeaderButtonsComponent],
})
export class CountryMutateComponent implements AfterViewInit {
  forms: CustomFormGroup[] = [];
  constructor(private router: Router) {
    this.generateForm();
  }

  ngOnInit() {}
  ngAfterViewInit(): void {}

  generateForm() {
    const controls = {
      language: new FormControl2('', {
        label: 'انتخاب زبان',
        type: 'select',
        validators: [],
        options: Object.values(Lan),
      }),
      countryName: new FormControl2('', {
        label: 'نام کشور',
        type: 'text',
        validators: [],
      }),
      flag: new FormControl2('', {
        label: 'پرچم',
        type: 'files',
        validators: [],
      }),
      abbreviation: new FormControl2('', {
        label: 'مخفف',
        type: 'text',
        validators: [],
      }),
      mainCurrency: new FormControl2('', {
        label: 'واحد پول اصلی',
        type: 'text',
        validators: [],
      }),
      description: new FormControl2('', {
        label: 'توضیح',
        type: 'text',
        validators: [],
      }),
    };
    const form = new CustomFormGroup(controls, '', 'ثبت');
    this.forms.push(form);
  }
}
