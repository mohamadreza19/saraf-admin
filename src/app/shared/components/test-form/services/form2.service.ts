import { Injectable } from '@angular/core';
import { FormSection } from 'shared';

@Injectable({
  providedIn: 'root'
})
export class Form2Service extends FormSection {

  constructor() {
    super('form2', {
      fName: {
        label: "test",
        type: 'text',

      }
    })
  }

}
