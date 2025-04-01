import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Login } from './models/login';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, tap } from 'rxjs';
import { LoginResponse } from './models/login-response';

@Injectable()
export class SignInService {
  apiUrl = environment.apiUrl;

  constructor(
    private readonly router: Router,
    private http: HttpClient,
    private auth: AuthService,
    private snackBar: MatSnackBar,
  ) {}

  login(login: Login) {
    return this.http.post(this.apiUrl + '/auth/login', login).pipe(
      tap((value) => {
        const _value = value as LoginResponse;

        this.auth.saveToken(_value.data);
      }),
    );
  }

  showMessage(message: string) {
    this.snackBar.open(message, 'بستن', {
      panelClass: 'my-custom-snackbar',
      duration: 3000, // milliseconds
      horizontalPosition: 'center', // 'start' | 'center' | 'end' | 'left' | 'right'
      verticalPosition: 'top', // 'top' | 'bottom'
    });
  }
}
