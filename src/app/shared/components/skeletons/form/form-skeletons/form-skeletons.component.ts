import { Component } from '@angular/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

interface Item {
  height: string;
  animation: false | 'progress' | 'progress-dark' | 'pulse';
}
@Component({
  selector: 'app-form-skeletons',
  standalone: true,
  imports: [NgxSkeletonLoaderModule],
  templateUrl: './form-skeletons.component.html',
  styleUrl: './form-skeletons.component.css',
})
export class FormSkeletonsComponent {
  skeletons: Item[] = [];

  constructor() {
    this.skeletons = [
      {
        height: '40px',
        animation: 'pulse',
      },
      {
        height: '40px',
        animation: 'pulse',
      },
      {
        height: '40px',
        animation: 'pulse',
      },
      {
        height: '40px',
        animation: 'pulse',
      },
      {
        height: '40px',
        animation: 'pulse',
      },
      {
        height: '40px',
        animation: 'pulse',
      },
    ];
  }
}
