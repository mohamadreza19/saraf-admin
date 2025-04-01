import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-loading-snackbar',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  templateUrl: './loading-snackbar.component.html',
  styleUrl: './loading-snackbar.component.css',
})
export class LoadingSnackbarComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: LoadingSnackbar) {}
}

export interface LoadingSnackbar {
  status: 'loading' | 'success' | 'error';
  text: string;
}
