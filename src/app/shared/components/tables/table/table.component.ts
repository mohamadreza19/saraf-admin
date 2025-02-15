import { ChangeDetectorRef, Component, ElementRef, EventEmitter, inject, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { InputComponent } from '../../input/input.component';
import { CustomFormControl } from 'src/app/shared/form-builder/form-builder.component';
import { CommonModule, NgClass, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { ButtonComponent } from '../../button/button.component';
import { ActionConfig, TableConfig, TemplateActionConfig } from 'src/app/shared/models/table-config';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomBtnComponent } from './components/custom-btn/custom-btn.component';
import { FormControl2 } from '../../form-builder2/form-builder2.component';

import {MatPaginatorIntl, MatPaginatorModule, PageEvent} from '@angular/material/paginator';

import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray} from '@angular/cdk/drag-drop'
import { CustomPaginatorIntl } from './paginator';
import { Pagination } from 'src/app/shared/types/pagination.interface';
import { LoadingService } from 'src/app/core/services/loading.service';
import { SkeletonsComponent } from "./components/skeletons/skeletons.component";
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
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
    CommonModule,
    MatPaginatorModule,
   
    NgxSkeletonLoaderModule
],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
  providers: [{ provide: MatPaginatorIntl, useClass: CustomPaginatorIntl }],
})
export class TableComponent implements OnInit {
  loading = true
  loadingTimeoutId:any

  sortDirection: { [key: string]: 'asc' | 'desc' } = {}; // Track sort direction for each column
  sortColumn: string = ''; // Track the currently sorted column
  //
  selectedItemsIndex: number[] = [];
  @ViewChildren('checkboxChild')
  checkboxChildren!: QueryList<ElementRef<HTMLInputElement>>;

  @Input()
  tableConfig!: TableConfig;
  @Input()
  list:object[]=[]
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
onPage=new EventEmitter<PageEvent>

  draggedIndex: boolean | null = null; // Track the index of the dragged item

  

@Input()
pagination!:Pagination
constructor(public loadingService:LoadingService){
loadingService.loading$.subscribe(_loading_=>{
  this.loadingTimeoutId = setTimeout(()=>{
    if(_loading_){
      if(this.loadingTimeoutId){

        clearTimeout(this.loadingTimeoutId)
        
      } else this.loading=true
    } else{
      clearTimeout(this.loadingTimeoutId)
      this.loading=false
    }
  },2300)
})
}
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
  this.list=  this.reverseColumnValues(this.list,columnIndex,this.sortDirection[column])
   
    
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
  
  
  createDummy(repeat: number) {
    return Array.from({ length: repeat });
  }


  getObjectValues(obj: object): string[] {
    return Object.values(obj);
  }
  _textTruncate(str: string) {
    return str.length > 18 ? str.slice(0, 18) + '...' : str;
  }
  _choseClassBasedCustomStyleForVal(value: string | number) {
    if (!this.tableConfig.customStylePerColumn) return '';
    const stringVal = String(value) as keyof typeof this.tableConfig.customStylePerColumn;

    return this.tableConfig.customStylePerColumn[stringVal] || '';
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



  getPageSizeOptions(): number[] {
    // Example logic to calculate pageSizeOptions based on totalItems
    if (this.pagination.totalRecord <= 10) {
      return  [5, 10];
    } else if (this.pagination.totalRecord <= 50) {
      return [5, 10, 25];
    } else {
      return [5, 10, 25, 50, 100];
    }
  }
  page(event: PageEvent) {
    this.onPage.emit(event)
    console.log(event);
  }
}
