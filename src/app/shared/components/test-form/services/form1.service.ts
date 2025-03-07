import { Injectable } from '@angular/core';
import { FormSection } from 'shared';

@Injectable({
  providedIn: 'root'
})
export class Form1Service extends FormSection {

  constructor() {
    super('form1', {
      fName: {
        label: "test",
        type: 'text',

      }
    })
  }

}
