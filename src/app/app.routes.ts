import {Routes} from '@angular/router';
import {AuthGuard} from './core/guards/auth.guard';
import {carpoolingRoutes} from './features/carpooling/carpooling.routes';
import {serviceVehicleRoutes} from './features/service-vehicle/service-vehicle.routes';
import { serviceVehicleBookingRoutes } from './features/service-vehicle-booking/service-vehicle-booking.routes';
import {AuthLayoutComponent} from './shared/layouts/auth-layout/auth-layout.component';
import {DefaultLayoutComponent} from './shared/layouts/default-layout/default-layout.component';

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
        loadComponent: () => import('./features/carpooling/pages/carpooling-booking-list/carpooling-booking-list.component').then(m => m.CarpoolingBookingListComponent),
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
