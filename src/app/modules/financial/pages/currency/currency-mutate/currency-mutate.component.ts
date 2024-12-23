import { AfterViewInit, Component } from '@angular/core';
import { FormControl2, FormBuilder2Component } from 'src/app/shared/components/form-builder2/form-builder2.component';
import {
  CustomFormControl,
  CustomFormGroup,
  FormBuilderComponent,
} from 'src/app/shared/form-builder/form-builder.component';

@Component({
  selector: 'app-currency-mutate',
  standalone: true,
  imports: [FormBuilderComponent, FormBuilder2Component],
  templateUrl: './currency-mutate.component.html',
})
export class CurrencyMutateComponent implements AfterViewInit {
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
        allowedFileTypes: ['jpeg', 'png'],
        validators: [],
      }),
      acronym: new FormControl2('', {
        type: 'text',
        label: 'اختصار',

        validators: [],
      }),
      baseCurrency: new FormControl2('', {
        type: 'text',
        label: 'ارز پایه',

        validators: [],
      }),
      rateToBaseCurrency: new FormControl2('', {
        type: 'text',
        label: 'ضریب نسبت به ارز مبنا',

        validators: [],
      }),
    };
    this.form = new CustomFormGroup(controls, 'افزودن ارز', 'افزودن');
  }
}
