import { AfterViewInit, Component, EventEmitter, inject, Input, OnInit, Output, TemplateRef } from '@angular/core';

import { StepperComponent } from '../steppers/stepper/stepper.component';
import { InputComponent } from '../input/input.component';
import { FormArray, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Input as FormInput, InputType } from '../../models/form-builder-config.interface';
import { CardComponent } from '../cards/card/card.component';
import { CardControl_ } from '../cards/card/models/cardControl';
import { CustomFormGroup } from '../../form-builder/form-builder.component';
import { CommonModule, NgClass, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { BehaviorSubject } from 'rxjs';
import { SharedModuleModule } from '../../modules/shared-module/shared-module.module';
import { MatSnackBar } from '@angular/material/snack-bar';
import { errorMessageTransform } from 'src/app/core/pipes/error-message.pipe';
import { LoadingService } from 'src/app/core/services/loading.service';
import { FormSkeletonsComponent } from '../skeletons/form/form-skeletons/form-skeletons.component';

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
    SharedModuleModule,
    NgTemplateOutlet,
    FormSkeletonsComponent,
  ],
  templateUrl: './form-builder2.component.html',
  styleUrl: './form-builder2.component.css',
})
export class FormBuilder2Component {
  loading = true;

  steps: string[] = [];
  @Input()
  currentStepIndex: number | null = 0;
  _forms: CustomFormGroup[] = [];
  @Input()
  label!: string;
  @Input({
    required: true,
  })
  set forms(forms: CustomFormGroup[]) {
    setTimeout(() => {
      this.setForms(forms);
      this.loading = false;
    }, 1300);
  }

  get forms() {
    return this._forms;
  }

  @Input()
  showStepper = true;
  @Input()
  showHeader = true;

  @Output()
  formFocus = new EventEmitter<FormSubmitEmit>();
  @Output()
  backClick = new EventEmitter<void>();

  constructor(private snackBar: MatSnackBar, loading: LoadingService) {}
  setStep(formIndex: number) {
    this.currentStepIndex = formIndex;
  }
  focus(formIndex: number, trigger: Trigger) {
    const form = this.forms[formIndex];

    form.markAllAsTouched();

    Object.values(form.controls).forEach((fc: any) => {
      const message = errorMessageTransform(fc);
      if (message)
        this.snackBar.open(`${fc.label}  ${message}`, '', {
          duration: 2200,
        });
    });
    // If trigger is from stepper

    this.formFocus.emit({
      trigger: trigger,
      focusedForm: form,
      currentIndex: formIndex,
      formsLength: this.forms.length,
      next: () => this.nextStep(formIndex),
      perv: () => this.prevStep(formIndex),
      setStep: (targetIndex) => this.setStep(targetIndex),
    });
  }
  nextStep(formIndex: number) {
    if (this.steps.length - 1 >= formIndex + 1) this.setStep(formIndex + 1);
  }
  prevStep(formIndex: number) {
    this.setStep(formIndex - 1);
  }

  _getFormControlsAsArray(form: CustomFormGroup) {
    return Object.values(form.controls);
  }
  _isFormControl(control: any) {
    return control instanceof FormControl2;
  }

  _getControlAsFormControl2(control: any): FormControl2 {
    return control;
  }

  goBack() {
    this.backClick.emit();
    // this.location.back(); // Go back to the previous page in the browser history
  }
  setForms(forms: CustomFormGroup[]) {
    this._forms = forms;

    this.steps = [];
    this.forms.forEach((form) => {
      if (form.rootLabel) {
        this.steps.push(form.rootLabel);
      }
    });
  }
  handleStepperTrigger() {}
}

export class FormControl2 extends FormControl {
  type?: InputType;
  label?: string;
  placeholder?: string;
  // options?: string[];
  selectOptionsLength?: number;
  selectedOptionIndex?: number;

  filesLength?: number;
  optionObjImportantKey?: string;
  templateRef?: TemplateRef<any>;

  private _show = new BehaviorSubject<boolean>(true);
  private _options = new BehaviorSubject<any[]>([]);
  _objOptions = new BehaviorSubject<object[]>([]);
  show$ = this._show.asObservable();
  options$ = this._options.asObservable();

  get show(): boolean {
    return this._show.value;
  }

  set show(value: boolean) {
    this._show.next(value); // Notify subscribers of the change
  }
  get objOptions() {
    return this._objOptions.getValue();
  }
  set objOptions(val: any[]) {
    this._objOptions.next(val);
  }
  get options() {
    return this._options.value;
  }
  set options(val: any[]) {
    this._options.next(val);
  }

  setObjOptions(values: object[]) {
    this._objOptions.next(values);
  }

  getSelectedOptionAsObject() {
    const value = this.value;
    const objOptions = this._objOptions.getValue();
    if (!value && objOptions.length) return undefined;

    const index = this.options.findIndex((op: string) => op.includes(value));

    return objOptions[index] || undefined;
  }
  getCheckboxValueAsNumber() {
    const val = this.value;

    return val ? 1 : 0;
  }
  constructor(formState: any, inputConf: FormInput) {
    super(formState, inputConf.validators);

    this.type = inputConf.type;
    this.label = inputConf.label;
    this.placeholder = inputConf.placeholder;

    this.selectOptionsLength = inputConf.selectOptionsLength;
    this.selectedOptionIndex = inputConf.selectedOptionIndex;
    this.filesLength = inputConf.filesLength;
    this.optionObjImportantKey = inputConf.optionObjImportantKey;
    this.templateRef = inputConf.templateRef;
    if (typeof inputConf.show === 'boolean') {
      this.show = inputConf.show;
    } else {
      this.show = true;
    }

    if (inputConf.options && inputConf.options.length) {
      this.options = inputConf.options;
    }
    if (inputConf.objOptions && inputConf.objOptions.length) {
      this.objOptions = inputConf.objOptions;
    }
    // if(inputConf.setObjectOptions){}
  }
}
export class PhoneControl extends FormControl2 {
  preCodeControlRef: FormControl2;
  constructor(formState: any, inputConf: FormInput, preCodeControlRef: FormControl2) {
    super(formState, inputConf);
    this.preCodeControlRef = preCodeControlRef;
  }
}
export class AmountFormControl extends FormControl2 {
  selectCurrencyControlRef?: FormControl2;
  constructor(formState: any, inputConf: FormInput, selectCurrencyControlRef: FormControl2) {
    super(formState, inputConf);
    this.selectCurrencyControlRef = selectCurrencyControlRef;
  }
}
export type Trigger = 'stepper' | 'button-next';
export interface FormSubmitEmit {
  trigger: Trigger;
  focusedForm: CustomFormGroup;
  currentIndex: number;
  formsLength: number;
  next: () => void;
  perv: () => void;
  setStep: (targetIndex: number) => void;
}

export class FormArray2 extends FormArray {
  templateRef: TemplateRef<any> | null = null;
  templateContext?: object;
  lengthChange = new BehaviorSubject<number>(0);
  constructor(controls: any[], template?: { ref: TemplateRef<any>; context: object }) {
    super(controls);
    if (template) {
      console.log(template);
      this.templateRef = template.ref;
      this.templateContext = template?.context;
    }
  }

  override push(control: any, options?: { emitEvent?: boolean }): void {
    super.push(control, options);
    this.lengthChange.next(this.lengthChange.getValue() + 1);
  }
  override removeAt(index: number, options?: { emitEvent?: boolean }): void {
    super.removeAt(index, options);
    this.lengthChange.next(this.lengthChange.getValue() - 1);
  }
  override insert(index: number, control: any, options?: { emitEvent?: boolean }): void {
    super.insert(index, control, options);
    this.lengthChange.next(this.length + 1);
  }
}
