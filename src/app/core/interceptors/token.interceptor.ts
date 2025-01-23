import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = inject(AuthService).getToken();

  if (authToken) {
  }
  return next(req);
};
