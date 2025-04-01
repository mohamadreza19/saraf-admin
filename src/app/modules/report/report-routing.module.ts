import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportComponent } from './report.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { TransactionComponent } from './pages/transaction/transaction.component';
import { DebtorCreditorComponent } from './pages/debtor-creditor/debtor-creditor.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ReportComponent,
      },
      {
        path: 'customer',
        component: CustomerComponent,
      },
      {
        path: 'transaction',
        component: TransactionComponent,
      },
      {
        path: 'debtor-creditor',
        component: DebtorCreditorComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportRoutingModule {}
