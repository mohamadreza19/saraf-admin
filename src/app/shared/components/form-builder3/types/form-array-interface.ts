import { TemplateRef } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormArray, ValidatorFn } from '@angular/forms';
import { FormControl2 } from '../../form-builder2/form-builder2.component';

export class FormArray2 extends FormArray {
  templateRef?: TemplateRef<any>;
  constructor(controls: any[], templateRef?: TemplateRef<any>) {
    super(controls);
    this.templateRef = templateRef;
  }
}
