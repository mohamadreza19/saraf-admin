import { Component, Input } from '@angular/core';
import { HeaderButtonsComponent } from '../../../financial/components/header-buttons/header-buttons.component';
import { ExchangeTableComponent } from 'src/app/modules/dashboard/components/view/exchange-table/exchange-table.component';
import { exchangeOffice } from 'src/app/modules/dashboard/models/exchange-office';
import { Router } from '@angular/router';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { CustomFormControl, CustomFormGroup } from 'src/app/shared/form-builder/form-builder.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { SearchInputComponent } from '../../../../shared/components/input/search-input/search-input.component';
import { TableConfig2 } from 'src/app/shared/models/table-config';
import { EMPLOYEES } from './constants';
import { FormControl2 } from 'src/app/shared/components/form-builder2/form-builder2.component';
import { TableComponent } from '../../../../shared/components/tables/table/table.component';

@Component({
  selector: 'app-employee-home',
  standalone: true,
  imports: [
    HeaderButtonsComponent,
    ExchangeTableComponent,
    InputComponent,
    ButtonComponent,
    SearchInputComponent,
    TableComponent,
  ],
  templateUrl: './employee-home.component.html',
  styleUrl: './employee-home.component.scss',
})
export class EmployeeHomeComponent {
  tableConfig!: TableConfig2;

  @Input()
  searchControl = new CustomFormControl(null, {
    label: 'جستوجو',
    showIf: [],
    type: 'search',
    validators: [],
  });

  constructor(private router: Router) {
    const controls = {
      search: new FormControl2('', {
        type: 'search',
        label: 'جستوجو',
        validators: [],
      }),
    };
    this.tableConfig = {
      title: 'لیست کارمند ها',
      tableHeader: ['اسم', 'شماره تماس', 'نماد', 'وضعیت', 'تاریخ انقضاء', 'ID'],
      assetIndexFromBody: 2,
      tableBody: EMPLOYEES,
      form: new CustomFormGroup(controls),
    };
  }
  navigate() {
    this.router.navigate(['/employee/add']);
  }
  navigateToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
