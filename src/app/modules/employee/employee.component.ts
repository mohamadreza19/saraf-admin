import { Component } from '@angular/core';
import { EmployeeRoutingModule } from './employee-routing.module';
import { Router, RouterOutlet } from '@angular/router';
import { CustomFormControl, CustomFormGroup } from 'src/app/shared/form-builder/form-builder.component';
import { TableConfig2 } from 'src/app/shared/models/table-config';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './employee.component.html',
})
export class EmployeeComponent {}
