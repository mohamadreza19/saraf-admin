import { Component } from '@angular/core';
import { PaginationService } from 'src/app/core/services/pagination.service';
import { globalFactory } from '../../factories/global-pagination.factory';
import { ActivatedRoute, Router } from '@angular/router';
import { BankAccount } from 'src/app/shared/apis/bank-account-api.service';
import { TableConfig } from 'src/app/shared/models/table-config';
import { GlobalBaseComponent } from '../../components/global-base/global-base.component';
import { HeaderButtonsComponent } from '../../../../components/header-buttons/header-buttons.component';
import { TableComponent } from '../../../../../../shared/components/tables/table/table.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-visa-global',
  standalone: true,
  templateUrl: './visa-global.component.html',
  styleUrl: './visa-global.component.css',
  imports: [TableComponent, HeaderButtonsComponent, CommonModule],
  providers: [
    {
      provide: PaginationService,
      useFactory: globalFactory,
    },
  ],
})
export class VisaGlobalComponent extends GlobalBaseComponent {
  override urlPath = 'visa-global';
  override title: string = 'حساب های ویزا کارت';
}
