import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BankComponent } from './pages/bank/bank.component';
import { BankMutateComponent } from './pages/bank/bank-mutate/bank-mutate.component';
import { GeographicalComponent } from './geographical.component';
import { CountryComponent } from './pages/country/country.component';
import { CountryMutateComponent } from './pages/country/country-mutate/country-mutate.component';
import { CityComponent } from './pages/city/city.component';
import { CityMutateComponent } from './pages/city/pages/city-mutate/city-mutate.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: GeographicalComponent,
  },
  { path: 'bank', component: BankComponent },
  { path: 'bank/add', component: BankMutateComponent },
  { path: 'country', component: CountryComponent },
  { path: 'country/mutate', component: CountryMutateComponent },
  { path: 'city', component: CityComponent },
  { path: 'city/mutate', component: CityMutateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeographicalRoutingModule {}
