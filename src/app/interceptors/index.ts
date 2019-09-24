import { HTTP_INTERCEPTORS } from '@angular/common/http';

import {ApiBaseInterceptor} from './api-base.interceptor';
import {HttpErrorInterceptor} from './http-error.interceptor';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: ApiBaseInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },

];
