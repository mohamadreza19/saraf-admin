import { FormControl } from '@angular/forms';
import { Customer } from './customer.interface';

export class CardControl_ extends FormControl {
  constructor(formState: Customer | null) {
    super(formState);
  }
}
