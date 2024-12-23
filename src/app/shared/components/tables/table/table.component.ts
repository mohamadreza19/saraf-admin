import { Component, ElementRef, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { InputComponent } from '../../input/input.component';
import { CustomFormControl } from 'src/app/shared/form-builder/form-builder.component';
import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { ButtonComponent } from '../../button/button.component';
import { TableConfig } from 'src/app/shared/models/table-config';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomBtnComponent } from './components/custom-btn/custom-btn.component';
import { FormControl2 } from '../../form-builder2/form-builder2.component';

@Component({
  selector: 'app-table1',
  standalone: true,
  imports: [
    InputComponent,
    NgFor,
    NgIf,
    NgClass,
    ButtonComponent,
    ReactiveFormsModule,
    CustomBtnComponent,
    CommonModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit {
  selectedItemsIndex: number[] = [];
  @ViewChildren('checkboxChild')
  checkboxChildren!: QueryList<ElementRef<HTMLInputElement>>;

  @Input()
  tableConfig!: TableConfig;
  constructor() {}

  ngOnInit(): void {
    console.log(this.tableConfig);
  }

  getObjectValues(obj: object): string[] {
    return Object.values(obj);
  }
  _textTruncate(str: string) {
    return str.length > 18 ? str.slice(0, 18) + '...' : str;
  }
  _choseClassBasedCustomStyleForVal(value: string | number) {
    if (!this.tableConfig.customStylePerColumnVal) return '';
    const stringVal = String(value) as keyof typeof this.tableConfig.customStylePerColumnVal;

    return this.tableConfig.customStylePerColumnVal[stringVal] || '';
  }
  _getFormCroupControlsAsArray(controls: object): FormControl2[] {
    return Object.values(controls);
  }
  onCheckboxChange(event: Event, index: number) {
    const inputElement = event.target as HTMLInputElement;
    // this.isChecked =
    if (inputElement.checked) {
      this.selectedItemsIndex.push(index);
    } else {
      this.selectedItemsIndex = this.selectedItemsIndex.filter((item) => item !== index);
    }
    console.log(this.selectedItemsIndex);
  }
  onAllCheckboxChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;

    const parentIsCheck = inputElement.checked;
    if (this.checkboxChildren.length) {
      this.checkboxChildren.forEach((checkbox, index) => {
        if (parentIsCheck) {
          checkbox.nativeElement.checked = true;
          this.selectedItemsIndex.push(index);
        } else {
          checkbox.nativeElement.checked = false;
          this.selectedItemsIndex = [];
        }
      });
    }
  }
}
