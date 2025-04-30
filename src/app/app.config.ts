import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {providePrimeNG} from 'primeng/config';
import {routes} from './app.routes';
import Basic from "./theme/app-theme";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    providePrimeNG({ theme: Basic, ripple: false, inputStyle: 'outlined' }),
  ]
};
