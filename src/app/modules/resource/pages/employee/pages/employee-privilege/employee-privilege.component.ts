import { AfterViewInit, ChangeDetectorRef, Component, Inject, Input, NgZone, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Privilege } from '../../types/privilege.interface';
import { NgClass, NgIf } from '@angular/common';
import { CustomFormGroup } from 'src/app/shared/form-builder/form-builder.component';
import { FormControl2, FormBuilder2Component } from 'src/app/shared/components/form-builder2/form-builder2.component';
import { BasicInfo, Customers, Dashboard, Employees, Main } from '../../constants/privilege.constants';

@Component({
  selector: 'app-employee-privilege',
  templateUrl: './employee-privilege.component.html',
  styleUrls: ['./employee-privilege.component.css'],
  standalone: true,
  imports: [NgIf, NgClass, FormBuilder2Component],
})
export class EmployeePrivilegeComponent implements AfterViewInit {
  privilege!: Privilege | null;
  form!: CustomFormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Privilege | null) {}

  ngAfterViewInit(): void {
    this.privilege = this.data;
    this.initiateForm();
  }
  initiateForm() {
    this.form = new CustomFormGroup(this.initiateControls(), '', 'افزودن', this.mutatePrivilege);
  }
  initiateControls() {
    const controls = {
      main: new FormControl2('', {
        label: 'بخش',
        type: 'select',
        validators: [],
        options: Object.values(Main),
        selectedOptionIndex: 0,
      }),
      sub: new FormControl2('', {
        label: 'زیر بخش',
        type: 'select',
        validators: [],
        options: Object.values(BasicInfo),
      }),
      add: new FormControl2('true', {
        label: 'افزودن',
        type: 'checkbox',
        validators: [],
      }),
      remove: new FormControl2('true', {
        label: 'حذف',
        type: 'checkbox',
        validators: [],
      }),
      edit: new FormControl2('true', {
        label: 'ویرایش',
        type: 'checkbox',
        validators: [],
      }),
      status: new FormControl2('true', {
        label: 'وضعیت',
        type: 'checkbox',
        validators: [],
      }),
    };
    controls.main.valueChanges.subscribe((val) => {
      switch (val) {
        case Main.BasicInfo:
          controls.sub.options = Object.values(BasicInfo);
          controls.add.show = true;
          controls.remove.show = true;

          break;
        case Main.Dashboard:
          controls.sub.options = Object.values(Dashboard);
          controls.add.show = true;
          controls.remove.show = true;

          break;
        case Main.Customers:
          controls.sub.options = Object.values(Customers);
          controls.add.show = true;
          controls.remove.show = true;

          break;
        case Main.Employees:
          controls.sub.options = Object.values(Employees);
          controls.add.show = false;
          controls.remove.show = false;
          break;
      }
    });
    return controls;
  }
  mutatePrivilege(form: CustomFormGroup) {
    const { main, sub, add, remove, edit } = form.controls;
    this.privilege = null;

    this.privilege = {
      main: main.value,
      sub: sub.value,
      add: add.value,
      delete: remove.value,
      edit: edit.value,
      status: edit.value,
    };
    console.log(this.privilege);
  }
  remove() {
    this.privilege = null;
  }
  ngOnInit() {}
}
