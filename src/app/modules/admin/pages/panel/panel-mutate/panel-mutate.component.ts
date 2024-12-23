import { AfterViewInit, Component } from '@angular/core';
import {
  CustomFormControl,
  CustomFormGroup,
  FormBuilderComponent,
} from '../../../../../shared/form-builder/form-builder.component';
import { FormConfig } from 'src/app/shared/models/form-builder-config.interface';
import { FormControl2, FormBuilder2Component } from 'src/app/shared/components/form-builder2/form-builder2.component';

@Component({
  selector: 'app-panel-mutate',
  standalone: true,
  imports: [FormBuilderComponent, FormBuilder2Component],
  templateUrl: './panel-mutate.component.html',
  styleUrl: './panel-mutate.component.scss',
})
export class PanelMutateComponent implements AfterViewInit {
  form!: CustomFormGroup;

  ngAfterViewInit(): void {
    const controls = {
      module: new FormControl2('', {
        type: 'select',
        label: 'انتخاب ماژول',
        options: ['نقره', 'صرافی', 'طلا'],

        validators: [],
      }),
      currencyUnits: new FormControl2('', {
        type: 'select',
        label: 'واحد های پولی',
        options: ['تومان', 'ارز'],

        validators: [],
      }),
      price: new FormControl2('', {
        type: 'text',
        label: 'قیمت',

        validators: [],
      }),
      period: new FormControl2('', {
        type: 'select',
        label: 'مدت',
        options: ['یک ماهه', 'سه ماهه', 'شش ماهه', 'یک ساله'],

        validators: [],
      }),
      isActive: new FormControl2('', {
        type: 'checkbox',
        label: 'فعال',
        options: ['فعال'],

        validators: [],
      }),
    };
    const form1 = new CustomFormGroup(controls, 'ثبت پنل', 'ثبت');

    this.form = form1;
  }
  constructor() {}
}
