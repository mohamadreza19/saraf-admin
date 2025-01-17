import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinancialComponent } from './financial.component';

import { CurrencyComponent } from './pages/currency/currency.component';
import { CurrencyMutateComponent } from './pages/currency/currency-mutate/currency-mutate.component';
import { BankAccountComponent } from './pages/bank-account/bank-account.component';
import { FinancialAccountComponent } from './components/financial-account/financial-account.component';

const routes: Routes = [
  {
    path: '',
    component: FinancialComponent,
    children: [
      { path: '', redirectTo: 'view', pathMatch: 'full' },

      { path: 'currency', component: CurrencyComponent },
      { path: 'currency/add', component: CurrencyMutateComponent },
      { path: 'bank-account', component: BankAccountComponent },
      {
        path: 'admin-bank-account',
        component: FinancialAccountComponent,
      },

      { path: '**', redirectTo: 'errors/404' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinancialRoutingModule {}
