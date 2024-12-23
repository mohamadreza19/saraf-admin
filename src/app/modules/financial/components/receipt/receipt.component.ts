import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { Component, ElementRef, Input } from '@angular/core';
import { FormControl2 } from 'src/app/shared/components/form-builder2/form-builder2.component';
import { Receipt } from './types';

@Component({
  selector: 'app-receipt',
  standalone: true,
  imports: [NgTemplateOutlet, CommonModule],
  templateUrl: './receipt.component.html',
  styleUrl: './receipt.component.css',
})
export class ReceiptComponent {
  @Input()
  control!: FormControl2;

  @Input()
  get receipt(): Receipt {
    if (!this.control.value) {
      return {
        amount: '0',
        currencyUnit: 'null',
        discount: '0',
        discountPercent: '0',
        totalAmount: '0',
      };
    }
    return this.control.value;
  }

  constructor(el: ElementRef<HTMLElement>) {
    el.nativeElement.className = 'col-span-2';
  }
}
