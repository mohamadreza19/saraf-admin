import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-financial',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './financial.component.html',
})
export class FinancialComponent {
  constructor() {}
}
