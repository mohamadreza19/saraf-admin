import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExchangeOfficeComponent } from '../financial/pages/exchange-office/exchange-office.component';
import { ExchangeOfficeMutateComponent } from '../financial/pages/exchange-office/exchange-office-mutate/exchange-office-mutate.component';

const routes: Routes = [
  {
    path: '',
    // component: ResourceComponent,

    children: [
      { path: '', redirectTo: 'employee', pathMatch: 'full' },
      {
        path: 'exchange-office',
        component: ExchangeOfficeComponent,
      },
      {
        path: 'exchange-office/add',
        component: ExchangeOfficeMutateComponent,
      },
      {
        path: 'employee',
        loadChildren: () => import('./pages/employee/employee.module').then((m) => m.EmployeeModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResourceRoutingModule {}
