import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import {
  CustomFormControl,
  CustomFormGroup,
  FormBuilderComponent,
} from 'src/app/shared/form-builder/form-builder.component';
import { HeaderButtonsComponent } from '../../../financial/components/header-buttons/header-buttons.component';
import { TableComponent } from 'src/app/shared/components/tables/table/table.component';
import { TableConfig } from 'src/app/shared/models/table-config';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/core/services/modal.service';
import { UserRequestComponent } from '../../components/user-request/user-resurest.component';
import { WalletComponent } from 'src/app/shared/components/wallet/wallet.component';
import { CustomerMutateComponent } from './customer-mutate/customer-mutate.component';

const fakeProfileImgUrl = 'assets/images/gray-avatar-placeholder.jpg';
@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [FormBuilderComponent, HeaderButtonsComponent, TableComponent],
  templateUrl: './customer.component.html',
})
export class CustomerComponent implements AfterViewInit {
  tableConfig!: TableConfig;
  fakeProfileImgUrl = 'assets/images/gray-avatar-placeholder.jpg';
  @ViewChild('statusTemplate') statusTemplate!: TemplateRef<any>;
  constructor(private modalService: ModalService, private router: Router) {}
  ngAfterViewInit(): void {
    this.tableConfig = {
      title: 'مشتری ها',
      form: this.generateTableForm(),

      tableHeader: ['تصویر', 'کد', ' نام و نام خانوادگی', 'شماره همراه', 'کد ملی', 'وضعیت همکاری'],
      tableBody: [
        {
          image: this.fakeProfileImgUrl,
          code: '102034',
          fullName: 'زهرا احمدی',
          phoneNumber: '09111234567',
          nationalId: '2345678901',
        },
      ],
      customStylePerColumnVal: {
        مشغول: 'p-1 bg-green-100 text-green-700 rounded-md',
        'قطع همکاری': 'p-1 bg-red-100 text-red-400 rounded-md',
      },
      assetIndexFromBody: 0,
      actions: [
        {
          templateRef: this.statusTemplate,
        },
        {
          callback: () => {
            this.openMutate();
          },
          label: 'اطلاعات بیشتر',
          styleProps: {
            impact: 'bold',
          },
        },
        {
          callback: () => this.openUserRequestList(),
          label: 'لیست درخواست ها',
          styleProps: {
            tone: 'light',
          },
        },
        {
          label: 'کیف پول ',
          styleProps: {
            tone: 'light',
          },
          callback: (row) => {
            this.openWallet();
          },
        },
      ],
    };
  }
  generateTableForm() {
    const controls = {
      search: new CustomFormControl('', {
        label: 'جستجو',
        type: 'search',
        // showIf:: [],
        validators: [],
      }),
      phoneNumber: new CustomFormControl('', {
        label: 'شماره تلفن همراه',
        type: 'text',

        // showIf:: [],
        validators: [],
      }),
      nationalCode: new CustomFormControl('', {
        label: 'کد ملی',
        type: 'text',

        // showIf:: [],
        validators: [],
      }),
      email: new CustomFormControl('', {
        label: 'ایمیل',
        type: 'text',

        // showIf:: [],
        validators: [],
      }),
    };
    return new CustomFormGroup(controls);
  }
  openUserRequestList() {
    this.modalService.open(UserRequestComponent, {
      width: '800px',
      maxWidth: '800px',
    });
  }
  clickP() {
    this.router.navigate(['/resource/customer/add']);
  }
  clickL() {
    this.router.navigate(['/dashboard']);
  }
  openWallet() {
    this.modalService.open(WalletComponent, {
      width: '600px',
      maxHeight: '600px',
    });
  }
  openMutate() {
    this.modalService.open(CustomerMutateComponent, {
      width: '600px',
      maxHeight: '600px',
    });
  }
}
