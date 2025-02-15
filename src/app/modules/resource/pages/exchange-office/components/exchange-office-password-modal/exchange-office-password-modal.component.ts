import { Component } from '@angular/core';
import { FormControl2, FormBuilder2Component } from 'src/app/shared/components/form-builder2/form-builder2.component';
import { CustomFormGroup } from 'src/app/shared/form-builder/form-builder.component';

@Component({
  selector: 'app-exchange-office-password-modal',
  standalone: true,
  imports: [FormBuilder2Component],
  templateUrl: './exchange-office-password-modal.component.html',
  styleUrl: './exchange-office-password-modal.component.css',
})
export class ExchangeOfficePasswordModalComponent {
  forms: CustomFormGroup[] = [];
  constructor() {
    this.generateForm();
  }

  generateForm() {
    const controls = {
      password: new FormControl2('1234', {
        label: 'رمز عبور',
        type: 'password',
        validators: [],
      }),
    };
    const form = new CustomFormGroup(controls, '', 'تغییر رمز عبور');

    this.forms.push(form);
  }
}
