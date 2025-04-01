import { Component, Input, OnInit } from '@angular/core';
import { CardControl_ } from './models/cardControl';
import { NgIf } from '@angular/common';
import { Customer } from './models/customer.interface';
import { ButtonComponent } from '../../button/button.component';

@Component({
  selector: 'com-card',
  standalone: true,
  imports: [NgIf, ButtonComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent implements OnInit {
  @Input({
    required: true,
  })
  cardControl_!: CardControl_;

  showMore = false;

  ngOnInit(): void {
    this.cardControl_.valueChanges.subscribe((value) => {});
  }

  valueAsCustomer(value: any) {
    return value as Customer;
  }
  handleClickShowMore() {
    this.showMore = !this.showMore;
  }
}
