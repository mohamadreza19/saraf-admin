import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Login } from './models/login';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs';

@Injectable()
export class SignInService {
  apiUrl = environment.apiUrl;
  constructor(
    private readonly router: Router,
    private http: HttpClient,
    auth: AuthService,
    private snackBar: MatSnackBar,
  ) {}

  login(login: Login) {
    this.showMessage();
    const observable = this.http.post(this.apiUrl + '/auth/login', login);

    observable.subscribe({
      next(value) {
        console.log(value);
      },
      error: (err) => {
        console.log(err);
        this.showMessage();
      },
    });
  }

  showMessage() {
    console.log('gooz');
    this.snackBar.open('This is a message!', 'Close', {
      // panelClass: 'my-custom-snackbar',
      duration: 3000, // milliseconds
      horizontalPosition: 'center', // 'start' | 'center' | 'end' | 'left' | 'right'
      verticalPosition: 'top', // 'top' | 'bottom'
    });
  }
}
