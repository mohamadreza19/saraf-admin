import { Component, OnInit } from '@angular/core';
import { PaginationService } from 'src/app/core/services/pagination.service';
import { globalFactory } from '../../factories/global-pagination.factory';
import { GlobalBaseComponent } from '../../components/global-base/global-base.component';
import { HeaderButtonsComponent } from '../../../../components/header-buttons/header-buttons.component';
import { TableComponent } from '../../../../../../shared/components/tables/table/table.component';
import { CommonModule } from '@angular/common';
import { SwitchComponent } from '../../../../../../shared/components/swtichs/switch/switch.component';

@Component({
  selector: 'app-master-global',
  templateUrl: './master-global.component.html',
  styleUrls: ['./master-global.component.css'],

  providers: [
    {
      provide: PaginationService,
      useFactory: globalFactory,
    },
  ],
  standalone: true,
  imports: [HeaderButtonsComponent, TableComponent, CommonModule, SwitchComponent],
})
export class MasterGlobalComponent extends GlobalBaseComponent {
  override urlPath = 'master-global';
  override title = $localize`حساب های مستر کارت`; // Localized title for MasterCard accounts
}
