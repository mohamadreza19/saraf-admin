import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CustomFormGroup } from 'src/app/shared/form-builder/form-builder.component';

@Injectable({
  providedIn: 'root',
})
export class GlobalFormService {
  private formMap = new Map<string, CustomFormGroup[]>();

  formMap$ = new BehaviorSubject(this.formMap).asObservable();
  constructor() {}
}
