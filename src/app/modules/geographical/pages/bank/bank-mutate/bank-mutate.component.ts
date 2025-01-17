import { AfterViewInit, Component } from '@angular/core';
import {
  CustomFormControl,
  CustomFormGroup,
  FormBuilderComponent,
} from '../../../../../shared/form-builder/form-builder.component';
import { FormBuilderConfig, FormConfig } from 'src/app/shared/models/form-builder-config.interface';
import { FormControl2, FormBuilder2Component } from 'src/app/shared/components/form-builder2/form-builder2.component';
import { CURRENCIES } from 'src/app/modules/financial/constants/receive-pay-common-constants';

@Component({
  selector: 'app-bank-mutate',
  standalone: true,
  imports: [FormBuilderComponent, FormBuilder2Component],
  templateUrl: './bank-mutate.component.html',
  styleUrl: './bank-mutate.component.scss',
})
export class BankMutateComponent implements AfterViewInit {
  form!: CustomFormGroup;

  ngAfterViewInit(): void {
    const controls = {
      name: new FormControl2('', {
        type: 'text',
        label: 'نام',

        validators: [],
      }),
      logo: new FormControl2([], {
        type: 'files',
        filesLength: 1,
        label: 'لوگو',
        validators: [],

        allowedFileTypes: ['pdf', 'jpeg', 'png', 'jpg'],
      }),
      city: new FormControl2('', {
        type: 'select',
        label: 'شهر',
        validators: [],
        options: ['تهران', 'بوشهر'],
      }),
      title: new FormControl2('', {
        type: 'text',
        label: 'عنوان',
        validators: [],
      }),
      currencyUnit: new FormControl2('', {
        label: 'واحد پول',
        type: 'select',
        validators: [],
        options: Object.values(CURRENCIES),
      }),
      isActive: new FormControl2(true, {
        type: 'checkbox',
        label: 'فعال',
        validators: [],
      }),
    };
    const form1 = new CustomFormGroup(controls, 'افزودن بانک', 'افزودن');

    this.form = form1;
  }

  constructor() {}
}
