import { isPlatformServer } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';

export const testInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);
  console.log('Interceptor Running On:', isPlatformServer(platformId) ? 'Server' : 'Client');
  console.log('meow');
  return next(req);
};
