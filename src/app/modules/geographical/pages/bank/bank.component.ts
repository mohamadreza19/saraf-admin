import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { HeaderButtonsComponent } from '../../../financial/components/header-buttons/header-buttons.component';
import { ExchangeTableComponent } from 'src/app/modules/dashboard/components/view/exchange-table/exchange-table.component';
import { Router } from '@angular/router';
import { TableConfig } from 'src/app/shared/models/table-config';
import { TableComponent } from '../../../../shared/components/tables/table/table.component';
import { FormControl2 } from 'src/app/shared/components/form-builder2/form-builder2.component';
import { CustomFormGroup } from 'src/app/shared/form-builder/form-builder.component';

@Component({
  selector: 'app-bank',
  standalone: true,
  imports: [HeaderButtonsComponent, ExchangeTableComponent, TableComponent],
  templateUrl: './bank.component.html',
})
export class BankComponent implements AfterViewInit {
  tableConfig!: TableConfig;
  @ViewChild('checkboxTemplate') checkboxTemplate!: TemplateRef<any>;
  constructor(private router: Router) {}
  ngAfterViewInit(): void {
    this.generateTableConfig();
  }
  generateTableConfig() {
    this.tableConfig = {
      title: 'بانک ها',
      form: this.generateForm(),
      tableHeader: ['لگو', 'اسم', 'شهر', 'عنوان', 'وضعیت'],
      tableBody: [
        {
          logo: 'https://bmi.ir/fa/uploadedfiles/dynamicpagesfiles/2019_10_26/logo__e53e707996__7b6ea8f7fb.jpg',
          name: 'بانک ملی',
          city: 'تهران',
          title: 'بانک ملی ایران',
        },
        {
          logo: 'https://logoyab.com/wp-content/uploads/2024/08/Tosee-Taavon-Bank-Logo-1030x1030.png',
          name: 'بانک توسعه',
          city: 'تهران',
          title: 'بانک توسعه ',
        },
      ],
      assetIndexFromBody: 0,
      actions: [
        {
          templateRef: this.checkboxTemplate,
        },
        {
          label: 'ویرایش',
          callback(row) {},
          styleProps: {
            tone: 'warning',
          },
        },
      ],
    };
  }
  generateForm() {
    const controls = {
      search: new FormControl2('', {
        label: 'جستجو',
        type: 'search',
        validators: [],
      }),
    };

    return new CustomFormGroup(controls);
  }
  navigateToAddBank() {
    this.router.navigate(['/geographical/bank/add']);
  }
  navigateToDash() {
    this.router.navigate(['/dashboard']);
  }
}
