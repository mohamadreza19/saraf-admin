import { InjectionToken } from '@angular/core';
import { Request, Response, NextFunction } from 'express';

export const REQUEST_TOKEN = new InjectionToken<Request>('REQUEST');
export const RESPONSE_TOKEN = new InjectionToken<Response>('RESPONSE');
export const NEXT_FUNCTION_TOKEN = new InjectionToken<NextFunction>('NEXT');
