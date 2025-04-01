import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExchangeOfficeComponent } from './pages/exchange-office/exchange-office.component';
import { ExchangeOfficeMutateComponent } from './pages/exchange-office/exchange-office-mutate/exchange-office-mutate.component';
import { DocumentTypeComponent } from './pages/document-type/document-type.component';
import { DocumentTypeMutateComponent } from './pages/document-type/pages/document-type-mutate/document-type-mutate.component';
import { CountryComponent } from '../geographical/pages/country/country.component';

const routes: Routes = [
  // component: ResourceComponent,

  { path: '', redirectTo: 'employee', pathMatch: 'full' },
  {
    path: 'exchange-office',
    component: ExchangeOfficeComponent,
  },
  {
    path: 'exchange-office/mutate',
    component: ExchangeOfficeMutateComponent,
  },
  {
    path: 'employee',
    loadChildren: () => import('./pages/employee/employee.module').then((m) => m.EmployeeModule),
  },
  {
    path: 'document-type',
    component: DocumentTypeComponent,
  },
  {
    path: 'document-type/mutate',
    component: DocumentTypeMutateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResourceRoutingModule {}
