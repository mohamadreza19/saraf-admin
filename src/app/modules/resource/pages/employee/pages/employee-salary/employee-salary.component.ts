import { Component, OnInit } from '@angular/core';
import { TableConfig } from 'src/app/shared/models/table-config';
import { TableComponent } from '../../../../../../shared/components/tables/table/table.component';
import { ModalService } from 'src/app/core/services/modal.service';
import { EmployeeSalaryMutateComponent } from './employee-salary-mutate/employee-salary-mutate.component';
import { CustomFormGroup } from 'src/app/shared/form-builder/form-builder.component';
import { FormControl2 } from 'src/app/shared/components/form-builder2/form-builder2.component';

@Component({
  selector: 'app-employee-salary',
  templateUrl: './employee-salary.component.html',
  styleUrls: ['./employee-salary.component.css'],

  standalone: true,
  imports: [TableComponent],
})
export class EmployeeSalaryComponent implements OnInit {
  tableConfig!: TableConfig;
  constructor(private modal: ModalService) {
    this.tableConfig = {
      title: 'جزئیات واریز حقوق', // عنوان جدول
      form: this.generateTableForm(),
      tableHeader: [
        'نوع',
        'پرداخت حقوق',
        'تفصیلی',
        'مبلغ ',
        'نوع ارز',
        // 'صندوق',
        // 'حساب بانکی',
        // 'نوع حساب کارمند',
        // 'تاریخ ', // ستون تاریخ و ساعت شمسی
        // 'ساعت',
      ],
      tableBody: [
        {
          costType: 'هزینه', // نوع
          costType2: 'پرداخت حقوق', // پرداخت حقوق
          detailed: 'حقوق جناب محمد محمدی', // تفصیلی
          amount: '50,000,000', // مبلغ
          currencyType: 'ریال', // نوع ارز
          // fund: 'fund1', // صندوق مالی
          // bankAccount: 'حساب-۱', // حساب بانکی
          // employeeType: 'ایرانی', // نوع حساب کارمند
          // date: '1403/10/15 ', // تاریخ و ساعت شمسی هاردکد
          // time: '10:10',
        },
        // اضافه کردن ردیف‌های بیشتر در صورت نیاز
      ],
      actions: [
        {
          label: 'اطلاعات بیشتر',
          callback: () => {
            this.openInfo();
          },
          styleProps: {
            impact: 'bold',
          },
        },
      ],
    };
  }
  ngOnInit() {}
  generateTableForm() {
    return new CustomFormGroup({
      search: new FormControl2('', {
        label: 'جستجو',
        type: 'search',
        validators: [],
      }),
    });
  }
  openInfo() {
    this.modal.open(EmployeeSalaryMutateComponent, {
      maxHeight: '600px',
    });
  }
}
