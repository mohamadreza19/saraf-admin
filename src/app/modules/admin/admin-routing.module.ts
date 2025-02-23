import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { PanelComponent } from './pages/panel/panel.component';
import { PanelMutateComponent } from './pages/panel/panel-mutate/panel-mutate.component';
import { ModuleComponent } from './pages/module/module.component';
import { ModuleMutateComponent } from './pages/module/module-mutate/module-mutate.component';
import { PanelRevivalComponent } from './pages/panel-revival/panel-revival.component';
import { PanelRevivalMutateComponent } from './pages/panel-revival/pages/panel-revival-mutate/panel-revival-mutate.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'panel',
        component: PanelComponent,
      },
      {
        path: 'panel/add',
        component: PanelMutateComponent,
      },
      {
        path: 'panel-revival',
        component: PanelRevivalComponent,
      },
      {
        path: 'panel-revival/mutate',
        component: PanelRevivalMutateComponent,
      },
      {
        path: 'module/add',
        component: ModuleMutateComponent,
      },
      {
        path: 'module',
        component: ModuleComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
