import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BankAccountComponent } from './bank-account.component';
import { CryptoComponent } from './pages/crypto/crypto.component';
import { CryptoMutateComponent } from './pages/crypto/pages/crypto-mutate/crypto-mutate.component';
import { VisaGlobalComponent } from './pages/visa-global/visa-global.component';
import { VisaGlobalMutateComponent } from './pages/visa-global/pages/global-mutate/visa-global-mutate.component';
import { MasterGlobalComponent } from './pages/master-global/master-global.component';
import { MasterGlobalMutateComponent } from './pages/master-global/pages/master-global-mutate/master-global-mutate.component';
import { IrComponent } from './pages/ir/ir.component';
import { IrMutateComponent } from './pages/ir/pages/ir-mutate/ir-mutate.component';

const routes: Routes = [
  {
    path: '',
    component: BankAccountComponent,
  },
  {
    path: 'crypto',
    component: CryptoComponent,
  },
  {
    path: 'crypto/mutate',
    component: CryptoMutateComponent,
  },
  {
    path: 'visa-global',
    component: VisaGlobalComponent,
  },
  {
    path: 'visa-global/mutate',
    component: VisaGlobalMutateComponent,
  },
  {
    path: 'master-global',
    component: MasterGlobalComponent,
  },
  {
    path: 'master-global/mutate',
    component: MasterGlobalMutateComponent,
  },
  { path: 'ir', component: IrComponent },
  { path: 'ir/mutate', component: IrMutateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BankAccountRoutingModule {}
