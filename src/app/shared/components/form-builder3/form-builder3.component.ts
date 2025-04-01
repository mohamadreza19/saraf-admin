import {
  AfterViewInit,
  Component,
  EventEmitter,
  inject,
  input,
  Input,
  OnInit,
  Output,
  QueryList,
  TemplateRef,
  ViewChildren,
  ViewContainerRef,
} from '@angular/core';

import { StepperComponent } from '../steppers/stepper/stepper.component';

import {
  AbstractControl,
  AsyncValidatorFn,
  FormArray,
  FormControl,
  ReactiveFormsModule,
  ValidatorFn,
} from '@angular/forms';
import { Input as FormInput, InputType } from '../../models/form-builder-config.interface';
import { CardComponent } from '../cards/card/card.component';
import { CardControl_ } from '../cards/card/models/cardControl';
import { CustomFormGroup } from '../../form-builder/form-builder.component';
import { CommonModule, Location, NgClass, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { BehaviorSubject, of } from 'rxjs';
import { SharedModuleModule } from '../../modules/shared-module/shared-module.module';
import { MatSnackBar } from '@angular/material/snack-bar';
import { errorMessageTransform } from 'src/app/core/pipes/error-message.pipe';
import { LoadingService } from 'src/app/core/services/loading.service';
import { FormSkeletonsComponent } from '../skeletons/form/form-skeletons/form-skeletons.component';
import { InputComponent } from '../input/input.component';
import { FormArray2, FormControl2, FormSubmitEmit, Trigger } from '../form-builder2/form-builder2.component';
import { GlobalFormService } from 'src/app/core/services/global-form.service';
import { ScrollService } from 'src/app/core/services/scroll.service';

@Component({
  selector: 'app-form-builder3',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    NgClass,
    StepperComponent,
    ReactiveFormsModule,
    CardComponent,
    ButtonComponent,
    SharedModuleModule,
    NgTemplateOutlet,
    FormSkeletonsComponent,
    InputComponent,
  ],
  templateUrl: './form-builder3.component.html',
  styleUrl: './form-builder3.component.css',
})
export class FormBuilder3Component implements AfterViewInit {
  loading = true;
  @Input()
  steps: string[] = [];
  @Input()
  currentStep: number | null = 0;

  @Input()
  formArray!: FormArray2;

  @Input()
  label!: string;
  @Input({
    required: true,
  })
  @Input()
  showStepper = true;
  @Input()
  showHeader = true;

  @Output()
  formFocus = new EventEmitter<FormSubmitEmit>();
  @Output()
  lastFormSubmit = new EventEmitter<FormSubmitEmit>();

  @Output()
  backClick = new EventEmitter<BackWard>();

  @ViewChildren('formTemplate') formTemplates!: QueryList<TemplateRef<any>>;

  constructor(
    private snackBar: MatSnackBar,
    loading: LoadingService,
    private scroll: ScrollService,
    public location: Location,
  ) {}
  ngAfterViewInit(): void {
    if (this.formArray) {
      setTimeout(() => {
        this.loading = false;
      }, 1300);
      this.formArray.lengthChange.subscribe(() => {
        this.steps = [];
        for (let form of this.formArray.controls) {
          this.steps.push((form as CustomFormGroup).rootLabel as string);
        }
      });
    }
  }
  setStep(formIndex: number) {
    this.currentStep = formIndex;
  }
  focus(formIndex: number, trigger: Trigger) {
    const form = this.formArray.controls[formIndex] as CustomFormGroup;

    form.markAllAsTouched();

    ValidateErrorMessages.snackBarChain(this.snackBar).loopControlsChain(form);

    // If trigger is from stepper
    if (trigger === 'stepper') {
      const perForm = this.formArray.controls[formIndex - 1];
      if (perForm) {
        if (perForm.valid) {
          this.setStep(formIndex);
          this.scroll.scrollMainContentToTop();
        } else
          this.snackBar.open($localize`فرم قبلی معتبر نیست`, '', {
            duration: 600,
          });
      } else this.setStep(formIndex);
    }

    if (trigger === 'button-next' && formIndex + 1 <= this.formArray.length - 1) {
      if (form.valid) {
        this.setStep(formIndex + 1);
        this.scroll.scrollMainContentToTop();
      }
    }
    if (trigger === 'button-next' && formIndex == this.formArray.length - 1 && form.valid) {
      this.lastFormSubmit.emit({
        trigger: trigger,
        focusedForm: form,
        currentIndex: formIndex,
        formsLength: this.formArray.length,
        next: () => this.nextStep(formIndex),
        perv: () => this.prevStep(formIndex),
        setStep: (targetIndex) => this.setStep(targetIndex),
      });

      return;
    }

    this.formFocus.emit({
      trigger: trigger,
      focusedForm: form,
      currentIndex: formIndex,
      formsLength: this.formArray.length,
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
  _getFormArrayControlsAsCustomForms(forms: any[]): CustomFormGroup[] {
    return forms;
  }
  _getFormControlsAsArray(form: CustomFormGroup) {
    return Object.values(form.controls);
  }
  _isFormControl(control: any) {
    return control instanceof FormControl2;
  }
  _isFormArray(formArray: any) {
    return formArray instanceof FormArray2;
  }

  _getControlAsFormControl2(control: any): FormControl2 {
    return control;
  }
  _getAsFormArray2(formArray: any): FormArray2 {
    return formArray;
  }

  goBack() {
    if (!this.backClick.observers.length) return this.location.back();

    this.backClick.emit({
      setStep: (targetIndex) => this.setStep(targetIndex),
    });
    // this.location.back(); // Go back to the previous page in the browser history
  }

  handleStepperTrigger() {}
}

class ValidateErrorMessages {
  private static snackBar: MatSnackBar;

  static snackBarChain(snackBar: MatSnackBar) {
    this.snackBar = snackBar;

    return this;
  }

  static loopControlsChain(form: CustomFormGroup) {
    for (const control of Object.values(form.controls)) {
      if (control instanceof FormControl2) this.showMessage(control);
      else if (control instanceof FormArray2) {
        const formArray = control;

        for (const abstractControl of formArray.controls) {
          if (abstractControl instanceof CustomFormGroup) this.loopControlsChain(abstractControl);
        }
      }
    }
  }

  private static showMessage(fc: FormControl2) {
    const message = errorMessageTransform(fc);

    if (message)
      this.snackBar.open(`  ${message} "${fc.label}"`, '', {
        duration: 2200,
      });
  }
}

export interface BackWard {
  setStep: (targetIndex: number) => void;
}
