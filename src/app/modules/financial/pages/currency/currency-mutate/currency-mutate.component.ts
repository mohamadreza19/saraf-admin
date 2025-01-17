import { Component } from '@angular/core';
import {
  CustomFormControl,
  CustomFormGroup,
  FormBuilderComponent,
} from 'src/app/shared/form-builder/form-builder.component';
import {
  FormBuilder2Component,
  FormControl2,
} from '../../../../../shared/components/form-builder2/form-builder2.component';

@Component({
  selector: 'app-currency-mutate',
  standalone: true,
  imports: [FormBuilderComponent, FormBuilder2Component],
  templateUrl: './currency-mutate.component.html',
})
export class CurrencyMutateComponent {
  forms: CustomFormGroup[] = [];

  constructor() {
    const controls = {
      name: new FormControl2('', {
        type: 'text',
        label: 'نام',

        validators: [],
      }),
      logo: new FormControl2('', {
        label: 'لگو',
        type: 'files',
        validators: [],
      }),
      abbreviate: new FormControl2('', {
        label: 'مخفف',
        type: 'text',
        validators: [],
      }),

      nicName: new FormControl2('', {
        type: 'text',
        label: 'عنوان مستعار',

        validators: [],
      }),
      isActive: new FormControl2('', {
        label: 'فعال',
        type: 'checkbox',
        validators: [],
      }),
    };
    const form1 = new CustomFormGroup(controls, 'افزودن ارز', 'افزودن');

    this.forms.push(form1);
  }
}
