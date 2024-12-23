import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinancialComponent } from './financial.component';
import { ExchangeOfficeComponent } from './pages/exchange-office/exchange-office.component';
import { ExchangeOfficeMutateComponent } from './pages/exchange-office/exchange-office-mutate/exchange-office-mutate.component';
import { CurrencyComponent } from './pages/currency/currency.component';
import { CurrencyMutateComponent } from './pages/currency/currency-mutate/currency-mutate.component';
import { BankAccountComponent } from './pages/bank-account/bank-account.component';

const routes: Routes = [
  {
    path: '',
    component: FinancialComponent,
    children: [
      { path: '', redirectTo: 'view', pathMatch: 'full' },
      { path: 'exchange-office', component: ExchangeOfficeComponent },
      { path: 'exchange-office/add', component: ExchangeOfficeMutateComponent },
      { path: 'currency', component: CurrencyComponent },
      { path: 'currency/add', component: CurrencyMutateComponent },
      { path: 'bank-account', component: BankAccountComponent },

      { path: '**', redirectTo: 'errors/404' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinancialRoutingModule {}
