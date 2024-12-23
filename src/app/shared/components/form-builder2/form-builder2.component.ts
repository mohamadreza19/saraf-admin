import { Component, Input, OnInit, TemplateRef } from '@angular/core';

import { StepperComponent } from '../steppers/stepper/stepper.component';
import { InputComponent } from '../input/input.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Input as FormInput, Input2, InputType2 } from '../../models/form-builder-config.interface';
import { CardComponent } from '../cards/card/card.component';
import { CardControl_ } from '../cards/card/models/cardControl';
import { CustomFormGroup } from '../../form-builder/form-builder.component';
import { CommonModule, NgClass, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-form-builder2',
  standalone: true,
  imports: [
    NgFor,
    NgIf,

    NgClass,
    StepperComponent,
    InputComponent,
    ReactiveFormsModule,
    CardComponent,
    ButtonComponent,
    NgTemplateOutlet,
  ],
  templateUrl: './form-builder2.component.html',
  styleUrl: './form-builder2.component.css',
})
export class FormBuilder2Component implements OnInit {
  steps: string[] = [];
  currentStepIndex: number | null = null;
  @Input()
  label!: string;
  @Input({
    required: true,
  })
  forms: CustomFormGroup[] = [];

  ngOnInit(): void {
    this.forms.forEach((form) => {
      if (form.rootLabel) {
        this.steps.push(form.rootLabel);
      }
    });
    this.currentStepIndex = 0;
  }
  setStep(val: number) {
    this.currentStepIndex = val;
  }
  nextStep(form: CustomFormGroup, formIndex: number) {
    if (this.steps.length - 1 >= formIndex + 1) this.setStep(formIndex + 1);
  }
  prevStep(formIndex: number) {
    this.setStep(formIndex - 1);
  }
  handleStepClick(stepIndex: number) {
    this.currentStepIndex = stepIndex;
  }
  _getFormControlsAsArray(form: CustomFormGroup) {
    return Object.values(form.controls);
  }
  _isFormControl(control: any) {
    return control instanceof FormControl2;
  }
  _isFormControl2(control: any) {
    return control instanceof FormControl2;
  }
  _isCardControl(control: any) {
    return control instanceof CardControl_;
  }

  _getControlAsFormControl2(control: any): FormControl2 {
    return control;
  }
  _getControlAsCardControl(control: any): CardControl_ {
    return control;
  }
  _getControlAsFormControl(control: any): any {
    return control;
  }
}

export class FormControl2 extends FormControl {
  type?: InputType2;
  label?: string;
  placeholder?: string;
  options?: string[];
  selectOptionsLength?: number;
  selectedOptionIndex?: number;
  templateRef?: TemplateRef<any>;

  private _show = new BehaviorSubject<boolean>(true);
  show$ = this._show.asObservable();

  get show(): boolean {
    return this._show.value;
  }

  set show(value: boolean) {
    this._show.next(value); // Notify subscribers of the change
  }
  constructor(formState: any, inputConf: Input2) {
    super(formState, inputConf.validators);

    this.type = inputConf.type;
    this.label = inputConf.label;
    this.placeholder = inputConf.placeholder;
    this.options = inputConf.options;
    this.selectOptionsLength = inputConf.selectOptionsLength;
    this.selectedOptionIndex = inputConf.selectedOptionIndex;
    this.templateRef = inputConf.templateRef;
    if (typeof inputConf.show === 'boolean') {
      this.show = inputConf.show;
    } else {
      this.show = true;
    }
  }
}

export class AmountFormControl extends FormControl2 {
  selectCurrencyControlRef?: FormControl2;
  constructor(formState: any, inputConf: Input2, selectCurrencyControlRef: FormControl2) {
    super(formState, inputConf);
    this.selectCurrencyControlRef = selectCurrencyControlRef;
  }
}
