import { Component } from '@angular/core';
import { Lan } from 'src/app/modules/geographical/constants/lan.enum';
import { FormControl2, FormBuilder2Component } from 'src/app/shared/components/form-builder2/form-builder2.component';
import { CustomFormGroup } from 'src/app/shared/form-builder/form-builder.component';

@Component({
  selector: 'app-module-mutate',
  standalone: true,
  imports: [FormBuilder2Component],
  templateUrl: './module-mutate.component.html',
  styleUrl: './module-mutate.component.css',
})
export class ModuleMutateComponent {
  forms: CustomFormGroup[] = [];

  constructor() {
    this.form();
  }

  form() {
    const controls = {
      language: new FormControl2('', {
        label: 'انتخاب زبان',
        type: 'select',
        options: Object.values(Lan),
        validators: [],
      }),
      name: new FormControl2('', {
        label: 'نام ماژول',
        type: 'text',
        validators: [],
      }),
      description: new FormControl2('', {
        label: 'توضیحات',
        type: 'text',
        validators: [],
      }),
    };
    const form = new CustomFormGroup(controls, 'اطلاعات اولیه', 'بعدی');
    this.forms.push(form);
  }
}
