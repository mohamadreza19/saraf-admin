import { Component, Input } from '@angular/core';
import { AmountFormControl, FormControl2 } from '../../form-builder2/form-builder2.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-amount-input',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor, CommonModule],
  templateUrl: './amount-input.component.html',
  styleUrl: './amount-input.component.css',
})
export class AmountInputComponent {
  @Input()
  control!: AmountFormControl;

  // currencyList: any[] = ['usdt', 'ریال']; // List of countries

  ngOnInit() {
    const selectCurrencyControlRef = this.control.selectCurrencyControlRef;
    if (selectCurrencyControlRef && !selectCurrencyControlRef.value) {
      if (selectCurrencyControlRef.options) selectCurrencyControlRef.setValue(selectCurrencyControlRef.options[0]);
    }

    if (
      selectCurrencyControlRef &&
      typeof selectCurrencyControlRef.selectedOptionIndex == 'number' &&
      selectCurrencyControlRef.options
    ) {
      selectCurrencyControlRef.setValue(selectCurrencyControlRef.options[selectCurrencyControlRef.selectedOptionIndex]);
    }
  }
  TypeSelectCurrencyControlRefAsFormControl(ref: any): FormControl2 {
    return ref;
  }
  onCountryChange(e: Event) {
    // Reset phone input and validation when the country changes

    const input = e.target as HTMLInputElement;
    this.control.setValue('');
  }
}
