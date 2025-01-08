import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModuleControlStrings } from '../../types/module.interface';
import { NgFor, NgIf } from '@angular/common';
const testData = [
  { name: 'Module A', period: 'Monthly', amount: '100', currencyUnit: 'USD' },
  { name: 'Module B', period: 'Yearly', amount: '200', currencyUnit: 'USD' },
  { name: 'Module C', period: 'Weekly', amount: '50', currencyUnit: 'USD' },
];
@Component({
  selector: 'app-receipt-modal',
  templateUrl: './receipt-modal.component.html',
  styleUrls: ['./receipt-modal.component.css'],
  imports: [NgIf, NgFor],
  standalone: true,
})
export class ReceiptModalComponent implements OnInit {
  testData = testData;
  constructor(@Inject(MAT_DIALOG_DATA) public data: ModuleControlStrings[]) {}

  ngOnInit() {
    console.log(testData);
  }

  // Calculate total amount
  getTotalAmount(data: ModuleControlStrings[]) {
    const amounts = data.reduce((total, item) => {
      total += Number(item.amount);
      return total;
    }, 0); // Start with 0, which is a number

    return amounts;
  }
}
