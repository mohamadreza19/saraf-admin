import { Component } from '@angular/core';
import {
  CustomFormControl,
  CustomFormGroup,
  FormBuilderComponent,
} from 'src/app/shared/form-builder/form-builder.component';
import { HeaderButtonsComponent } from '../../../financial/components/header-buttons/header-buttons.component';
import { TableConfig } from 'src/app/shared/models/table-config';
import { TableComponent } from 'src/app/shared/components/tables/table/table.component';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/core/services/modal.service';
import { UserRequestComponent } from '../../components/user-request/user-resurest.component';

@Component({
  selector: 'app-referrer',
  standalone: true,
  imports: [FormBuilderComponent, HeaderButtonsComponent, TableComponent],
  templateUrl: './referrer.component.html',
  styleUrl: './referrer.component.css',
})
export class ReferrerComponent {
  tableConfig!: TableConfig;
  fakeProfileImgUrl = 'assets/images/gray-avatar-placeholder.jpg';
  constructor(private modalService: ModalService, private router: Router) {
    this.tableConfig = {
      title: 'معرف ها',
      form: this.generateTableForm(),

      tableHeader: [
        'تصویر',
        ' نام و نام خانوادگی',
        'شماره همراه',
        'کد ملی',
        'وضعیت حساب',
        'حساب اعتباری',
        'وضعیت همکاری',
        'سطوح دسترسی',
        'درصد پورسانت',
      ],
      tableBody: [
        {
          image: this.fakeProfileImgUrl, // Placeholder image URL
          fullName: 'علی رضایی',
          phoneNumber: '09123456789',
          nationalId: '1234567890',
          accountStatus: 'فعال',
          creditAccount: '5,000,000 ریال',
          cooperationStatus: 'مشغول',
          accessLevels: 'مدیر',
          commissionPercentage: '15%',
        },
        {
          image: this.fakeProfileImgUrl,
          fullName: 'زهرا احمدی',
          phoneNumber: '09111234567',
          nationalId: '2345678901',
          accountStatus: 'غیرفعال',
          creditAccount: '0 ریال',
          cooperationStatus: 'قطع همکاری',
          accessLevels: 'کاربر عادی',
          commissionPercentage: '0%',
        },
        {
          image: this.fakeProfileImgUrl,
          fullName: 'محمد کاظمی',
          phoneNumber: '09361234567',
          nationalId: '3456789012',
          accountStatus: 'فعال',
          creditAccount: '2,000,000 ریال',
          cooperationStatus: 'مشغول',
          accessLevels: 'کاربر عادی',
          commissionPercentage: '10%',
        },
        {
          image: this.fakeProfileImgUrl,
          fullName: 'سارا موسوی',
          phoneNumber: '09987654321',
          nationalId: '4567890123',
          accountStatus: 'غیرفعال',
          creditAccount: '0 ریال',
          cooperationStatus: 'قطع همکاری',
          accessLevels: 'مدیر',
          commissionPercentage: '20%',
        },
        {
          image: this.fakeProfileImgUrl,
          fullName: 'حسین عبداللهی',
          phoneNumber: '09123498765',
          nationalId: '5678901234',
          accountStatus: 'فعال',
          creditAccount: '10,000,000 ریال',
          cooperationStatus: 'مشغول',
          accessLevels: 'مدیر ارشد',
          commissionPercentage: '25%',
        },
      ],
      customStylePerColumnVal: {
        مشغول: 'p-1 bg-green-100 text-green-700 rounded-md',
        'قطع همکاری': 'p-1 bg-red-100 text-red-400 rounded-md',
      },
      assetIndexFromBody: 0,
      actions: [
        {
          callback: () => {},
          label: 'ویرایش',
          styleProps: {
            tone: 'warning',
          },
        },
        {
          callback: () => this.openUserRequestList(),
          label: 'لیست درخواست ها',
          styleProps: {
            tone: 'info',
          },
        },
        {
          callback: () => {},
          label: 'بیشتر',
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
      cooperationStatus: new CustomFormControl('', {
        label: 'وضعیت همکاری',
        type: 'select',
        options: ['مشغول', 'قطع همکاری'],
        // showIf:: [],
        validators: [],
      }),
      accessLevels: new CustomFormControl('', {
        label: 'سطوح دسترسی',
        type: 'select',
        options: ['کاربر عادی'],
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
    // this.router.navigate(['/resource/referrer/add']);
  }
  clickL() {
    this.router.navigate(['/dashboard']);
  }
}
