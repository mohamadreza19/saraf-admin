import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomerComponent } from './pages/customer/customer.component';
import { CustomerMutateComponent } from './pages/customer/customer-mutate/customer-mutate.component';
import { ReferrerComponent } from './pages/referrer/referrer.component';
import { ReferrerMutateComponent } from './pages/referrer/referrer-mutate/referrer-mutate.component';

const routes: Routes = [
  {
    path: '',
    // component: ResourceComponent,

    children: [
      { path: '', redirectTo: 'customer', pathMatch: 'full' },
      {
        path: 'customer',
        component: CustomerComponent,
      },
      {
        path: 'customer/add',
        component: CustomerMutateComponent,
      },
      {
        path: 'referrer',
        component: ReferrerComponent,
      },
      {
        path: 'referrer/add',
        component: ReferrerMutateComponent,
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
