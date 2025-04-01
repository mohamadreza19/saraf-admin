import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomFormControl } from 'src/app/shared/form-builder/form-builder.component';
import { AngularPhoneNumberInput } from 'angular-phone-number-input';
import { countries } from 'countries-list';
import { NgFor, NgIf } from '@angular/common';
import { FormControl2, PhoneControl } from '../../form-builder2/form-builder2.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { InputComponent } from '../input.component';
import { mobileNumberValidator } from 'src/app/shared/validators/mobile-number-validator';
import { CountyPreCode } from 'src/app/core/utils/get-countrire-code.util';

@Component({
  selector: 'app-phone-number-input',
  standalone: true,
  imports: [ReactiveFormsModule, AngularPhoneNumberInput, NgFor, NgIf, NgxIntlTelInputModule, InputComponent],
  templateUrl: './phone-number-input.component.html',
  styleUrl: './phone-number-input.component.css',
})
export class PhoneNumberInputComponent implements OnInit {
  _control!: PhoneControl;
  preCodeControl!: FormControl2;
  @Input()
  set control(control: FormControl2) {
    this._control = control as any;

    this.preCodeControl = this._control.preCodeControlRef;
    const selectedOptionIndex = this.preCodeControl.selectedOptionIndex;
    if (typeof selectedOptionIndex == 'number') {
      const option = this.preCodeControl.options[selectedOptionIndex];

      this.preCodeControl.setValue(option);
    }
  }
  get control() {
    return this._control;
  }

  // _phone  =

  countryList: any[] = []; // List of countries
  phoneError: string = ''; // Validation error message

  selectedCountryCode: string = '';

  ngOnInit() {}

  onCountryChange(e: Event) {
    // Reset phone input and validation when the country changes

    this.control.setValue('');
    this.reInitialPhoneValidator();
  }
  reInitialPhoneValidator() {
    const code = this.preCodeControl.getSelectedOptionAsObject() as CountyPreCode;

    this.control.clearValidators();
    this.control.setValidators([Validators.required, mobileNumberValidator(code.dialCode)]);
    this.control.markAsTouched();
  }
}
