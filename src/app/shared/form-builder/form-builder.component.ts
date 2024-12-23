import { AfterViewChecked, Component, Input, OnInit } from '@angular/core';
import { FileType, FormBuilderConfig, FormConfig, Input as FormInput } from '../models/form-builder-config.interface';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { InputComponent } from '../components/input/input.component';
import { ButtonComponent } from '../components/button/button.component';
import { FormControl2 } from '../components/form-builder2/form-builder2.component';

@Component({
  selector: 'app-form-builder',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, ReactiveFormsModule, InputComponent, ButtonComponent],
  templateUrl: './form-builder.component.html',
})
export class FormBuilderComponent implements AfterViewChecked {
  @Input()
  config!: FormBuilderConfig;

  @Input()
  forms: CustomFormGroup[] = [];

  currentStep!: string;

  allStep: string[] = [];

  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.forms.forEach((form) => {
      if (form.rootLabel) {
        this.allStep.push(form.rootLabel);
      }
    });
    this.currentStep = this.allStep[0];
  }
  ngAfterViewChecked(): void {}

  _formController(form: FormConfig) {
    let formGroup: { [key: string]: CustomFormControl } = {};

    form.allNames.forEach((name) => {
      formGroup[name] = form.inputs[name];
    });

    this.forms.push(this.fb.group(formGroup));
  }

  _felidController(felid: FormInput) {
    // return {
    //   [felid.name]: {
    //     ...new FormControl(''),
    //     type: felid.type,
    //   },
    // };
  }
  _getControlAsFormControl2(control: any): FormControl2 {
    return control;
  }
  _getFormControllers(obj: any): CustomFormControl[] {
    return Object.values(obj);
  }
  _getControlType(control: AbstractControl<any, any> | null): FormControl {
    return control as FormControl;
  }
  setStep(val: string) {
    this.currentStep = val;
  }
  formNextStep(form: FormGroup, formIndex: number) {
    if (formIndex !== this.forms.length - 1) {
      if (form.valid) {
        this.setStep(this.allStep[formIndex + 1]);
      }
    }
  }
  formPrevStep(formIndex: number) {
    if (formIndex !== 0) {
      this.setStep(this.allStep[formIndex - 1]);
    }
  }
  isGivenStepBeforeCurrentStep(step: string) {
    const stepIndex = this.allStep.findIndex((val) => val == step);
    const currentIndex = this.allStep.findIndex((val) => val == this.currentStep);

    if (stepIndex <= currentIndex) return true;
    return false;
  }
  _deepCopy() {}
  _isOdd(number: number) {
    console.log(number);
    return number % 2 !== 0;
  }
}

export class CustomFormControl extends FormControl {
  type?: string;
  label?: string;
  allowedFileTypes?: FileType[];
  filesLength?: number;
  showIf?: string[];
  options?: string[];
  selectedOptionIndex?: number;
  constructor(formState: any, inputConf: FormInput) {
    super(formState, inputConf.validators);
    this.type = inputConf.type;
    this.allowedFileTypes = inputConf.allowedFileTypes;

    this.filesLength = inputConf.filesLength;
    this.label = inputConf.label;
    this.allowedFileTypes = inputConf.allowedFileTypes;

    this.options = inputConf.options;
    this.selectedOptionIndex = inputConf.selectedOptionIndex;

    this.showIf = inputConf.showIf;
  }
}

export class CustomFormGroup extends FormGroup {
  rootLabel?: string;
  submitText?: string;

  _onSubmit?: (form: this) => void;
  constructor(controls: any, rootLabel?: string, submitText?: string, _onSubmit?: (form: CustomFormGroup) => void) {
    super(controls);

    this.rootLabel = rootLabel;
    this.submitText = submitText;

    this._onSubmit = _onSubmit || function () {};
  }
}
