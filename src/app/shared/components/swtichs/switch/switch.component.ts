import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  standalone: true,
  styleUrls: ['./switch.component.css'],
})
export class SwitchComponent implements OnInit {
  @Input()
  name: any = 0;
  @Input()
  selected = false;

  @Output()
  onChangeStatus = new EventEmitter<SwitchChange>();
  constructor() {}

  ngOnInit() {}
  toggleSelection() {
    this.selected = !this.selected;
    this.onChangeStatus.emit({
      name: this.name,
      value: this.selected,
    });
  }
}

export interface SwitchChange {
  name: string;
  value: boolean;
}
