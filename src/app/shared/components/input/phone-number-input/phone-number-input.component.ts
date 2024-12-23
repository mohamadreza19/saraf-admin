import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomFormControl } from 'src/app/shared/form-builder/form-builder.component';
import { AngularPhoneNumberInput } from 'angular-phone-number-input';
import { countries } from 'countries-list';
import { NgFor, NgIf } from '@angular/common';
import { FormControl2 } from '../../form-builder2/form-builder2.component';

@Component({
  selector: 'app-phone-number-input',
  standalone: true,
  imports: [ReactiveFormsModule, AngularPhoneNumberInput, NgFor, NgIf],
  templateUrl: './phone-number-input.component.html',
  styleUrl: './phone-number-input.component.css',
})
export class PhoneNumberInputComponent implements OnInit {
  @Input()
  control!: FormControl2;

  countryList: any[] = []; // List of countries
  phoneError: string = ''; // Validation error message

  selectedCountryCode: string = '';

  ngOnInit() {
    // Initialize form with default country and phone fields
    // this.phoneForm = this.fb.group({
    //   country: ['US', Validators.required], // Default country: US
    //   phone: ['', Validators.required], // Phone field
    // });

    // Prepare the country list with names, codes, and dial codes

    this.countryList = Object.entries(countries).map(([code, info]) => ({
      code,
      name: info.name,
      dialCode: info.phone,
    }));
    this.selectedCountryCode = this.countryList[0].code;
  }

  onCountryChange(e: Event) {
    // Reset phone input and validation when the country changes

    const input = e.target as HTMLInputElement;
    this.control.setValue('');
    this.phoneError = '';
    this.selectedCountryCode = input.value;
  }
}
