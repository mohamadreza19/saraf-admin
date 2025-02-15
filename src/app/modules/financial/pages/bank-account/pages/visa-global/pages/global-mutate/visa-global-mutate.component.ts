import { Component, inject } from '@angular/core';

import { BaseMutateComponent } from '../../../../components/base-mutate/base-mutate.component';
import { HeaderButtonsComponent } from '../../../../../../components/header-buttons/header-buttons.component';
import { TableComponent } from '../../../../../../../../shared/components/tables/table/table.component';
import { FormBuilder3Component } from '../../../../../../../../shared/components/form-builder3/form-builder3.component';

@Component({
  selector: 'app-global-mutate',
  standalone: true,
  imports: [HeaderButtonsComponent, TableComponent, FormBuilder3Component],
  templateUrl: './visa-global-mutate.component.html',
})
export class VisaGlobalMutateComponent extends BaseMutateComponent {
  override title = 'ثبت حساب Visa';
  override type: 'visa' | 'master' = 'visa';
}
