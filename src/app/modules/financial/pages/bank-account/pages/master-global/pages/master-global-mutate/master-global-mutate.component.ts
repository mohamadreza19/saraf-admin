import { Component, OnInit } from '@angular/core';
import { BaseMutateComponent } from '../../../../components/base-mutate/base-mutate.component';
import { FormBuilder3Component } from '../../../../../../../../shared/components/form-builder3/form-builder3.component';

@Component({
  selector: 'app-master-global-mutate',
  templateUrl: './master-global-mutate.component.html',
  standalone: true,
  imports: [FormBuilder3Component],
})
export class MasterGlobalMutateComponent extends BaseMutateComponent {
  override title = $localize`ثبت حساب Master`; // Localized title for "Register Master Account"
  override type: 'visa' | 'master' = 'master';
}
