import { Component, Input, OnInit } from '@angular/core';
import { FormControl2 } from '../../form-builder2/form-builder2.component';
import { ModalService } from 'src/app/core/services/modal.service';
import { CustomFormGroup } from 'src/app/shared/form-builder/form-builder.component';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-select-add',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule],
  templateUrl: './select-add.component.html',
  styleUrls: ['./select-add.component.css'],
})
export class SelectAddComponent implements OnInit {
  isDropDownOpen = false;

  @Input()
  control!: FormControl2;
  @Input()
  get items() {
    if (this.control.options && this.control.options.length) return this.control.options;
    else return [];
  }
  filteredItems: any[] = [];
  searchTerm: string = '';

  @Input()
  get selectedItems(): string[] {
    if (this.control) return this.control.value;
    else return [];
  }
  set selectedItems(val: any) {
    if (this.control) {
      this.control.setValue(val);
    }
  }

  constructor(private modal: ModalService) {}

  ngOnInit() {
    // console.log(this.control);
  }
  ngAfterViewInit(): void {
    if (this.control && this.control.options?.length) {
      this.control.options$.subscribe((options) => {
        this.control.options = options;
        this.filteredItems = options;
      });
    }
  }

  handleOpenDropDown() {
    this.isDropDownOpen = !this.isDropDownOpen;
  }
  handleAddItem(form: CustomFormGroup) {
    this.control.options = [...this.control.options, Object.values(form.controls)[0].value];
  }
  removeSelectedItem(index: number) {
    this.selectedItems = this.selectedItems.filter((_, i) => i !== index);
  }
  handleSelectItem(value: string) {
    this.selectedItems = [...this.selectedItems, value];

    this.isDropDownOpen = false;
  }
  async handleOpenAddItem() {
    const { AddModalComponent } = await import('./components/add-modal/add-modal.component');
    const ref = this.modal.open(AddModalComponent, {
      data: {
        submit: (form: CustomFormGroup) => {
          this.handleAddItem(form);
          this.modal.close(ref);
        },
        label: this.control.label,
      },
    });
  }
  filterItems() {
    // Filter customers based on search term
    if (this.searchTerm.trim()) {
      this.filteredItems = this.items.filter((item) => item.toLowerCase().includes(this.searchTerm.toLowerCase()));
    } else {
      this.filteredItems = [...this.items]; // Reset to all customers when search is empty
    }
  }
}
