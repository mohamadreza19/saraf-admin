import { Component, inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom, Observable } from 'rxjs';
import {
  FormArray2,
  FormControl2,
  FormSubmitEmit,
} from 'src/app/shared/components/form-builder2/form-builder2.component';
import { CustomFormGroup } from 'src/app/shared/form-builder/form-builder.component';
import { FormSubmitService } from '../../services/form-submit.service';
import { ConvertControlsToAny } from 'src/app/shared/types/convert-controls-to-any';

@Component({
  selector: 'app-single-form-mutate',
  standalone: true,
  template: '',
})
export class SingleFormMutateComponent<Controls> {
  formArray = new FormArray2([]);

  formLabel = '';
  formSubmitLabel = 'ذخیره';
  httpMethod: HttpMethod = 'post';
  entityId = '';

  successText = '';

  route = inject(ActivatedRoute);
  formSubmitService = inject(FormSubmitService);
  controls!: Controls;

  //
  // Need override
  entityApiService!: AbstractMutateApiService;

  //
  allowNavBack = true;
  constructor() {}

  initiateForm(controls: Controls, formLabel: string, formSubmitLabel: string) {
    const form = new CustomFormGroup(controls, formLabel, formSubmitLabel || formLabel);

    this.formArray.push(form);

    return form;
  }
  private mapControl(key: string, control: FormControl2) {
    return control;
  }
  private mapControls(mapper: MapControl): Controls {
    const mappedControls: any = {};

    for (const key in this.controls) {
      if ((this.controls as object).hasOwnProperty(key)) {
        mappedControls[key] = mapper(key, this.controls[key] as FormControl2);
      }
    }

    return mappedControls as Controls;
  }
  // call first
  onInit() {
    if (!this.entityApiService) {
      throw new Error("entityApiService doesn't config");
    }
    const queryParams = this.route.snapshot.queryParams;

    this.handleQueryParams(queryParams);
    this.handleAfterInitialization(this.controls as Controls);

    const form = this.initiateForm(this.controls, this.formLabel, this.formSubmitLabel);
  }
  private handleQueryParams(queryParams: object) {
    if (Object.values(queryParams).length == 0 || !('httpMethod' in queryParams)) {
      // this.httpMethod = 'post';
    } else {
      this.httpMethod = queryParams.httpMethod as HttpMethod;
    }
    if ('entityId' in queryParams) {
      this.entityId = queryParams.entityId as string;
    }
  }
  private handleAfterInitialization(controls: Controls) {
    if (this.httpMethod === 'post') {
      this.handleAfterPostInitialization(controls);
    } else if (this.httpMethod === 'patch') {
      this.handleAfterPatchInitialization(controls);
    }
  }
  handleAfterPostInitialization(controls: Controls) {}
  handleAfterPatchInitialization(controls: Controls) {}
  //

  handleErrorManually(error: unknown) {}

  async submit({ focusedForm, setStep }: FormSubmitEmit) {
    try {
      this.formSubmitService.onSend(focusedForm.rootLabel as string);
      switch (this.httpMethod) {
        case 'post':
          await lastValueFrom(this.entityApiService.post(focusedForm.getValues() as ConvertControlsToAny<Controls>));
          break;
        case 'patch':
          await lastValueFrom(
            this.entityApiService.patch(this.entityId, focusedForm.getValues() as ConvertControlsToAny<Controls>),
          );
          break;
      }
      this.formSubmitService.onfulfilled(focusedForm.rootLabel as string);
      if (this.allowNavBack) this.formSubmitService.successNav(this.successText);
    } catch (error) {
      console.log(error);
      this.handleErrorManually(error);
      this.formSubmitService.onError(error, this.formArray, setStep);
    }
  }
}

type MapControl = (key: string, control: FormControl2) => FormControl2;
type HttpMethod = 'post' | 'patch';

export abstract class AbstractMutateApiService {
  abstract post(values: object): Observable<unknown>;
  abstract patch(entityId: string, values: object): Observable<unknown>;
}
