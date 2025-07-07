import {Routes} from '@angular/router';
import {AuthGuard} from './core/guards/auth.guard';
import {carpoolingRoutes} from './features/carpooling/carpooling.routes';
import {serviceVehicleRoutes} from './features/service-vehicle/service-vehicle.routes';
import {AuthLayoutComponent} from './core/layouts/auth-layout/auth-layout.component';
import {DefaultLayoutComponent} from './core/layouts/default-layout/default-layout.component';
import { serviceVehicleBookingRoutes } from './features/service-vehicle/service-vehicle-booking.routes';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        loadComponent: () => import('./features/sign-in/pages/login.component/login.component').then(m => m.LoginComponent)
      }
    ]
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
      },
      ...carpoolingRoutes,
      ...serviceVehicleRoutes,
      ...serviceVehicleBookingRoutes,
      {
        path: '**',
        loadComponent: () => import('./core/pages/page-not-found/page-not-found.component').then(m => m.PageNotFoundComponent)
      },
    ]
  }
];
