import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { InputComponent } from '../../input/input.component';
import { CustomFormControl } from 'src/app/shared/form-builder/form-builder.component';
import { CommonModule, NgClass, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { ButtonComponent } from '../../button/button.component';
import { ActionConfig, TableConfig, TemplateActionConfig } from 'src/app/shared/models/table-config';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomBtnComponent } from './components/custom-btn/custom-btn.component';
import { FormControl2 } from '../../form-builder2/form-builder2.component';


import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray} from '@angular/cdk/drag-drop'
type Row = { [key: string]: any };
type Rows = any

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
    NgTemplateOutlet,
    //
    CdkDropList, CdkDrag
    
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent implements OnInit {


  sortDirection: { [key: string]: 'asc' | 'desc' } = {}; // Track sort direction for each column
  sortColumn: string = ''; // Track the currently sorted column
  //
  selectedItemsIndex: number[] = [];
  @ViewChildren('checkboxChild')
  checkboxChildren!: QueryList<ElementRef<HTMLInputElement>>;

  @Input()
  tableConfig!: TableConfig;
  @Input()
  allowDragAndDrop =false

  @Input()
  showDeleteButton=true
  @Input()
  showEachCheckbox=true

  @Input()

  @Output()
  deleteClick = new EventEmitter<Rows>

  @Output()
  ondrop = new EventEmitter<CdkDragDrop<any>>

  draggedIndex: boolean | null = null; // Track the index of the dragged item


  ngOnInit(): void {
    // console.log(this.tableConfig);
  }
  sortTable(column: string,columnIndex:number) {
    const currentDirection = this.sortDirection[column] || 'asc'; // Default to 'asc' if not yet sorted
    const newDirection = currentDirection === 'asc' ? 'desc' : 'asc'; // Toggle direction
    // this.sortColumnTable(columnIndex,sortDirection)
    this.sortDirection[column] = newDirection; // Set new direction
    this.sortColumn = column; // Set the current sorted column

  
    // Sort the table data
  this.tableConfig.tableBody=  this.reverseColumnValues(this.tableConfig.tableBody,columnIndex,this.sortDirection[column])
   
    
  }
   reverseColumnValues(
    data: Row[], // The array of objects (rows)
    keyIndex: number, // The index of the key you want to reverse
    sortDirection: 'asc' | 'desc' // The sorting direction
  ): Row[] {
    // Get the keys of the first object in the array
    const keys = Object.keys(data[0]);
    const key = keys[keyIndex]; // Get the key at the specified index
    
    // Prepare the data for the column that needs to be reversed
    const columnValues = data.map(row => row[key]); // Extract values for the column
    
    // Reverse the values depending on the direction
    const sortedColumnValues = columnValues.reverse() 
  
    // Update the data with the new column values while keeping the other columns intact
    return data.map((row, index) => {
      return { ...row, [key]: sortedColumnValues[index] }; // Update only the specified column
    });
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

  onDelete() {
    let rows: any[] = [];
    const indexSet = new Set(this.selectedItemsIndex);


    rows = this.tableConfig.tableBody.filter(
      (_, index) => indexSet.has(index)
    );
  

    this.deleteClick.emit(rows)

  }

  _isActionConfig(config:any ): config is ActionConfig{

    if(!('templateRef' in config))return true

   else return false

 
  }
  _isActionTemplateRefConfig(config:any ): config is TemplateActionConfig{

    if('templateRef' in config)return true

   else return false

 
  }
  //

  onDragStart(event: any) {
   
    const source
    : 
    CdkDrag  = event.source
    // 
   
 
  }

  onDragEnd(event: any) {
    const source
    : 
    CdkDrag  = event.source
    source.element.nativeElement.classList.add('!bg-red-100')
   

  }
  drop(event: CdkDragDrop<string[]>) {
    // console.log(event);
    this.drop(event)
    // moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }
}
