import { Component, ElementRef, Input } from '@angular/core';
import { FormControl2 } from '../../form-builder2/form-builder2.component';
import { NgFor, NgIf } from '@angular/common';
import { NgClickOutsideDirective } from 'ng-click-outside2';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-select-input',
  standalone: true,
  imports: [NgIf, NgFor, NgClickOutsideDirective, ReactiveFormsModule],
  templateUrl: './search-select-input.component.html',
  styleUrl: './search-select-input.component.css',
})
export class SearchSelectInputComponent {
  @Input() control!: FormControl2; // Pass the actual FormControl

  isCustomBoxOpen = false;

  searchControl!: FormControl;

  searchResults: string[] = [];
  constructor() {
    this.searchControl = new FormControl('');
  }

  ngOnInit(): void {
    // Set the default value (select the first option by default)
    // console.log(this.formGroupDirective);
    // console.log(this.control);
    // this.isCustomBoxOpen = true;

    if (this.control.options) this.searchResults = this.control.options;

    this.searchControl.valueChanges.subscribe((value) => {
      let findItems: string[] = [];
      if (this.control.options) {
        // console.log(this.control.options);

        for (let option of this.control.options) {
          if (option.includes(value)) {
            findItems.push(option);
          }
        }
        this.searchResults = findItems;

        // const results = this.control.options.forEach((option) => {});
        // console.log(results);
      }
    });
  }

  toggle() {
    this.isCustomBoxOpen = !this.isCustomBoxOpen;
  }
  openCustomBox() {
    this.isCustomBoxOpen = true;
  }
  closeCustomBox() {
    this.isCustomBoxOpen = false;
  }
  _handleSetMultiSelectItem(val: string) {
    const formControlArrValue = this.control.value;

    if (Array.isArray(formControlArrValue)) {
      if (this.control.selectOptionsLength && this.control.value.length >= this.control.selectOptionsLength) {
        return;
      }
      this.control.setValue([...formControlArrValue, val]);
    } else {
      this.control.setValue([val]);
    }
    console.log(this.control);
  }
  _handleRemoveMultiSelectItem(val: string) {
    const formControlArrValue = this.control.value;

    if (Array.isArray(formControlArrValue)) {
      const filteredArray = formControlArrValue.filter((item) => item !== val);

      this.control.setValue(filteredArray);
    }
    // console.log(this.control);
  }
  _getMultiSelectSelectedItemAsArray(val: any): string[] {
    return val as string[];
  }
}
