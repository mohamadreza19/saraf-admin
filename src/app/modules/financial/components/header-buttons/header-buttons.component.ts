import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

// type HeaderButtons = {
//   impact: 'bold' | 'light' | 'none';
//   size: 'small' | 'medium' | 'large';
//   shape: 'square' | 'rounded' | 'pill';
//   tone: 'primary' | 'danger' | 'success' | 'warning' | 'info' | 'light';
//   shadow: 'none' | 'small' | 'medium' | 'large';
// };

@Component({
  selector: 'app-header-buttons',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './header-buttons.component.html',
})
export class HeaderButtonsComponent {
  @Input()
  textPrimary = $localize`افزودن`;
  @Input()
  textLight = $localize`بازگشت به داشبورد`;

  @Output()
  primaryClick = new EventEmitter<void>();
  @Output()
  lightClick = new EventEmitter<void>();

  handlePrimaryClick() {
    this.primaryClick.emit();
  }
  handleLightClick() {
    this.lightClick.emit();
  }
}
