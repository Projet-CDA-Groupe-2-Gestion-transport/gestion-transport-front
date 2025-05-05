import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {providePrimeNG} from 'primeng/config';
import {routes} from './app.routes';
import Basic from "./core/theme/app-theme";
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {authInterceptor} from './core/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    providePrimeNG({theme: Basic, ripple: false, inputStyle: 'outlined'}),
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
    provideAnimationsAsync()
  ]
};
