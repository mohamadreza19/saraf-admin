import { NgFor } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
interface Item {
  height: string;
  animation: false | 'progress' | 'progress-dark' | 'pulse';
}
@Component({
  selector: 'table1-skeletons',
  standalone: true,
  imports: [NgxSkeletonLoaderModule, NgFor],
  templateUrl: './skeletons.component.html',
  styleUrls: ['./skeletons.component.css'],
})
export class SkeletonsComponent {
  skeletons: any[] = [];
  @Input({
    required: true,
  })
  keys: string[] = [];
  @Input()
  repeat = 3;
  constructor() {}

  createDummy(repeat: number) {
    return Array.from({ length: repeat });
  }
}
