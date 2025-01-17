import { AfterViewInit, Component } from '@angular/core';
import {
  CustomFormControl,
  CustomFormGroup,
  FormBuilderComponent,
} from '../../../../../shared/form-builder/form-builder.component';
import { FormConfig } from 'src/app/shared/models/form-builder-config.interface';
import { FormControl2, FormBuilder2Component } from 'src/app/shared/components/form-builder2/form-builder2.component';
import { Lan } from 'src/app/modules/geographical/constants/lan.enum';
import { Currency } from 'src/app/shared/constants/constants';

@Component({
  selector: 'app-panel-mutate',
  standalone: true,
  imports: [FormBuilderComponent, FormBuilder2Component],
  templateUrl: './panel-mutate.component.html',
  styleUrl: './panel-mutate.component.scss',
})
export class PanelMutateComponent implements AfterViewInit {
  forms: CustomFormGroup[] = [];

  ngAfterViewInit(): void {
    const controls = {
      year: new FormControl2('', {
        type: 'date',
        label: 'سال',
        validators: [],
      }),
      buyer: new FormControl2('', {
        type: 'select',
        label: 'خریدار',
        options: ['ایرانی', 'خارجی'],
        validators: [],
      }),
      language: new FormControl2('', {
        label: 'زبان',
        type: 'select',
        options: Object.values(Lan),
        validators: [],
      }),
      module: new FormControl2('', {
        type: 'select',
        label: 'انتخاب ماژول',
        options: ['ماژول 1', 'ماژول 2', 'ماژول 3'],

        validators: [],
      }),
      currencyUnits: new FormControl2('', {
        type: 'select',
        label: 'واحد های پولی',
        options: Object.values(Currency),

        validators: [],
      }),
      monthPrice: new FormControl2('', {
        type: 'text',
        label: 'قیمت ماهیانه',

        validators: [],
      }),
      // period: new FormControl2('', {
      //   type: 'select',
      //   label: 'مدت',
      //   options: ['یک ماهه', 'سه ماهه', 'شش ماهه', 'یک ساله'],

      //   validators: [],
      // }),
      isActive: new FormControl2('', {
        type: 'checkbox',
        label: 'فعال',
        options: ['فعال'],

        validators: [],
      }),
      description: new FormControl2('', {
        type: 'text',
        label: 'توضیحات',
        validators: [],
      }),
    };
    const form1 = new CustomFormGroup(controls, '', 'ثبت هزینه');

    this.forms = [form1];
  }
  constructor() {}
}
