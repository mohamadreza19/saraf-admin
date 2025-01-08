import { Component } from '@angular/core';
import { CustomFormControl, CustomFormGroup } from 'src/app/shared/form-builder/form-builder.component';
import { TableConfig } from 'src/app/shared/models/table-config';
import { TableComponent } from '../../../../shared/components/tables/table/table.component';
import { ModalService } from 'src/app/core/services/modal.service';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { UserRequestMutateComponent } from '../user-request-mutate/user-request-mutate.component';

@Component({
  selector: 'app-user-resurest',
  standalone: true,
  imports: [TableComponent, ButtonComponent],
  templateUrl: './user-request.component.html',
})
export class UserRequestComponent {
  tableConfig!: TableConfig;

  constructor(private modalService: ModalService) {
    const controls = {
      search: new CustomFormControl('', {
        type: 'text',
        label: 'جستجو',
        // showIf:: [],
        validators: [],
      }),
    };
    const form = new CustomFormGroup(controls);
    this.tableConfig = {
      title: 'درخواست ها',
      form: form,

      tableHeader: ['شرح درخواست', 'مبلغ درخواست', 'وضعیت'],
      tableBody: [
        {
          requestDescription: 'درخواست خرید موبایل جدید',
          requestAmount: '10,000,000 ریال',
          requestStatus: 'تایید شده',
        },
        {
          requestDescription: 'درخواست تمدید قرارداد',
          requestAmount: '5,000,000 ریال',
          requestStatus: 'در حال بررسی',
        },
        {
          requestDescription: 'درخواست افزایش اعتبار',
          requestAmount: '2,000,000 ریال',
          requestStatus: 'تایید نشده',
        },
        {
          requestDescription: 'درخواست خرید لپ‌تاپ',
          requestAmount: '12,000,000 ریال',
          requestStatus: 'تایید شده',
        },
        {
          requestDescription: 'درخواست تسویه حساب',
          requestAmount: '7,000,000 ریال',
          requestStatus: 'در حال بررسی',
        },
      ],
      customStylePerColumnVal: {
        'تایید شده': 'p-1 bg-green-100 text-green-700 rounded-md',
        'در حال بررسی': 'p-1 bg-yellow-100 text-yellow-700 rounded-md',
        'تایید نشده': 'p-1 bg-red-100 text-red-400 rounded-md',
      },
    };
  }

  openUploadRequest() {
    this.modalService.open(UserRequestMutateComponent, {
      width: '800px',
      maxWidth: '800px',
    });
  }
}
