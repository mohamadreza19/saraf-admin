import { AfterViewChecked, Component, Input, OnInit } from '@angular/core';
import { FileType, FormBuilderConfig, FormConfig, Input as FormInput } from '../models/form-builder-config.interface';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { InputComponent } from '../components/input/input.component';
import { ButtonComponent } from '../components/button/button.component';
import { FormArray2, FormControl2 } from '../components/form-builder2/form-builder2.component';
import { BehaviorSubject } from 'rxjs';
import { Utils } from 'jalali-ts';
import { convertJalaliToGregorian } from 'src/app/core/utils/convert-jalali-to-gregorian';

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

    // this.forms.push(this.fb.group(formGroup));
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
  }
}

export class CustomFormGroup extends FormGroup {
  private _disabled = new BehaviorSubject<boolean>(false);
  private disabled$ = this._disabled.asObservable();
  rootLabel?: string;
  submitText?: string;
  submit$ = new BehaviorSubject<CustomFormGroup>(this);
  override disable(opts?: { onlySelf?: boolean; emitEvent?: boolean }): void {
    super.disable(opts);
    this._disabled.next(true);
  }
  override get disabled(): boolean {
    if (this._disabled) {
      return this._disabled.value;
    }
    return false;
  }

  _onSubmit?: (form: this) => void;

  constructor(controls: any, rootLabel?: string, submitText?: string, _onSubmit?: (form: CustomFormGroup) => void) {
    super(controls);

    this.rootLabel = rootLabel;
    this.submitText = submitText;

    this._onSubmit = _onSubmit || function () {};
  }
  getValues() {
    return FormValuesMapper.mapValue(this);
  }
}

class FormValuesMapper {
  static mapValue(formAbstract: any): any {
    if (formAbstract instanceof CustomFormGroup) {
      const controls = formAbstract.controls;

      return Object.entries(controls).reduce((per: { [key: string]: any }, [key, value]) => {
        if (this.isKeyTemplate(key)) return per;
        if (value instanceof FormControl2) per[key] = this.mapFormControlValue(value);
        else if (value instanceof FormArray2) per[key] = this.mapFormArray(value);

        return per;
      }, {});
    }
  }

  private static mapFormControlValue(formControl: FormControl2) {
    formControl.markAllAsTouched();
    const { type, value, filesLength, optionObjImportantKey } = formControl;

    switch (type) {
      case 'files':
        if (filesLength == 1) return value[0];
        else return value;

      case 'select':
        if (optionObjImportantKey && value) {
          const objSelectedValue = formControl.getSelectedOptionAsObject() as any;

          if (optionObjImportantKey && objSelectedValue && optionObjImportantKey in objSelectedValue)
            return objSelectedValue[optionObjImportantKey];
        } else return value;

        break;
      case 'map':
        if (value) {
          return JSON.stringify({
            lat: String(value[0]),
            lng: String(value[1]),
          });
        }

        break;

      case 'checkbox':
        if (value) return 1;
        else return 0;
      case 'date':
        if (value) {
          return convertJalaliToGregorian(value);
        }
        break;
      default:
        return value;
    }
  }
  private static mapFormArray(formArray: FormArray2) {
    return formArray.controls.reduce((per: object[], cur) => {
      const mapped = this.mapValue(cur);
      if (mapped) {
        per.push(mapped);
      }

      return per;
    }, []);
  }
  private static isKeyTemplate(key: string) {
    return key.charAt(key.length - 1) == '_';
  }
}
