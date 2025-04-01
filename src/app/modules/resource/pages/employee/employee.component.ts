import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { TableComponent } from 'src/app/shared/components/tables/table/table.component';
import { CustomFormControl, CustomFormGroup } from 'src/app/shared/form-builder/form-builder.component';
import { TableConfig } from 'src/app/shared/models/table-config';
import { HeaderButtonsComponent } from '../../../financial/components/header-buttons/header-buttons.component';
import { Router } from '@angular/router';
import { UserRequestComponent } from '../../components/user-request/user-resurest.component';
import { ModalService } from 'src/app/core/services/modal.service';

import { EmployeePrivilegeComponent } from './pages/employee-privilege/employee-privilege.component';
import { Privilege } from './types/privilege.interface';
import { BasicInfo, Main } from './constants/privilege.constants';
import { EmployeeSalaryMutateComponent } from './pages/employee-salary/employee-salary-mutate/employee-salary-mutate.component';
import { EmployeeSalaryComponent } from './pages/employee-salary/employee-salary.component';
import { EmployeeMutateComponent } from './pages/employee-mutate /employee-mutate.component';

const fakeProfileImgUrl = 'assets/images/gray-avatar-placeholder.jpg';

const employees = [
  {
    image: fakeProfileImgUrl,
    code: '102034',
    fullName: 'زهرا احمدی',
    phoneNumber: '09111234567',
    nationalId: '2345678901',
  },
  {
    image: fakeProfileImgUrl,
    code: '102034',
    fullName: 'زهرا احمدی',
    phoneNumber: '09111234567',
    nationalId: '2345678901',
  },
];
const privileges: (Privilege | null)[] = [
  null,

  {
    main: Main.BasicInfo,
    sub: BasicInfo.BankAccounts,
    add: false,
    edit: true,
    status: true,
    delete: false,
  },
];
@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [TableComponent, HeaderButtonsComponent],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css',
})
export class EmployeeComponent implements AfterViewInit {
  tableConfig!: TableConfig;

  @ViewChild('statusTemplate') statusTemplate!: TemplateRef<any>;
  @ViewChild('privilegesTemplate') privilegesTemplate!: TemplateRef<any>;
  constructor(private modalService: ModalService, private router: Router) {}
  ngAfterViewInit(): void {
    this.tableConfig = {
      title: 'کارمند ها',
      form: this.generateTableForm(),

      tableHeader: ['تصویر', 'کد', ' نام و نام خانوادگی', 'شماره همراه', 'کد ملی', 'وضعیت همکاری'],
      tableBody: employees,

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
          callback: () => this.openPrivilege(),
          label: 'دسترسی',
          styleProps: {
            tone: 'light',
          },
        },
        // {
        //   callback: () => this.openAddSalary(),
        //   label: 'پرداخت حقوق',
        //   styleProps: {
        //     tone: 'light',
        //   },
        // },
        // {
        //   label: 'حساب کتاب',
        //   callback: (row) => {
        //     this.openSalary();
        //   },
        //   styleProps: {
        //     tone: 'light',
        //   },
        // },

        // {
        //   label: 'کیف پول ',
        //   styleProps: {
        //     tone: 'light',
        //   },
        //   callback: (row) => {
        //     this.openWallet();
        //   },
        // },
      ],
    };
    // this.openSalary();
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
  openPrivilege() {
    this.modalService.open(EmployeePrivilegeComponent, {
      width: '600px',
      maxHeight: '600px',
      data: privileges[1],
    });
  }
  openAddSalary() {
    this.modalService.open(EmployeeSalaryMutateComponent, {
      maxHeight: '600px',
    });
  }
  openSalary() {
    this.modalService.open(EmployeeSalaryComponent, {
      maxHeight: '600px',
    });
  }

  clickP() {
    this.router.navigate(['/resource/employee/add']);
  }
  clickL() {
    this.router.navigate(['/dashboard']);
  }

  openMutate() {
    this.modalService.open(EmployeeMutateComponent, {
      width: '600px',
      maxHeight: '600px',
    });
  }
}
