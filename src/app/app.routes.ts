import { Routes } from '@angular/router';
import {AuthGuard} from './core/guards/auth.guard';
import {carpoolingRoutes} from './features/carpooling/carpooling.routes';
import {serviceVehicleRoutes} from './features/service-vehicle/service-vehicle.routes';
import {AdminGuard} from './core/guards/admin.guard';

export const routes: Routes = [
  {path: "", loadComponent: () => import('./app.component').then(m => m.AppComponent), canActivate: [AuthGuard]},
  {path: "login", loadComponent: () => import('./features/sign-in/pages/login.component/login.component').then(m => m.LoginComponent)},
  {path: "home", loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent), canActivate: [AuthGuard]},

  ...carpoolingRoutes,
  ...serviceVehicleRoutes,

  {path: "**", loadComponent: () => import('./core/pages/page-not-found/page-not-found.component').then(m => m.PageNotFoundComponent)},
];
