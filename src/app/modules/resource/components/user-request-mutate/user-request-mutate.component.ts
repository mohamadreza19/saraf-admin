import { Component } from '@angular/core';
import { FormBuilder2Component, FormControl2 } from 'src/app/shared/components/form-builder2/form-builder2.component';
import { CustomFormGroup } from 'src/app/shared/form-builder/form-builder.component';

@Component({
  selector: 'app-user-request-mutate',
  standalone: true,
  imports: [FormBuilder2Component],
  templateUrl: './user-request-mutate.component.html',
})
export class UserRequestMutateComponent {
  forms: CustomFormGroup[] = [];

  constructor() {
    const controls = {
      uploadRequestedReceipt: new FormControl2('', {
        type: 'files',
        label: 'بارگذاری رسید درخواستی',
        // showIf:: [],
        validators: [],
      }),
      description: new FormControl2('', {
        type: 'text',
        label: 'شرح',
        // showIf:: [],
        validators: [],
      }),
    };
    this.forms.push(new CustomFormGroup(controls, 'ثبت درخواست', 'ثبت'));
  }
}
