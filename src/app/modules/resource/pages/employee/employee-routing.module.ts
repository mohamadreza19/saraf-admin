import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee.component';
import { EmployeeMutateComponent } from './pages/employee-mutate/employee-mutate.component';
import { EmployeePrivilegeComponent } from './pages/employee-privilege/employee-privilege.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeeComponent,
  },
  {
    path: 'add',
    component: EmployeeMutateComponent,
  },
  {
    path: 'privilege',
    component: EmployeePrivilegeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeRoutingModule {}
