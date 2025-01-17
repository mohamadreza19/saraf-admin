import { Component } from '@angular/core';
import { TableConfig } from 'src/app/shared/models/table-config';

@Component({
  selector: 'app-module',
  standalone: true,
  imports: [],
  templateUrl: './module.component.html',
  styleUrl: './module.component.css',
})
export class ModuleComponent {
  tableConfig!: TableConfig;

  constructor() {}
}
