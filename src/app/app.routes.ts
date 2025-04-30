import { Routes } from '@angular/router';
import {AuthGuard} from './core/guards/auth.guard';
import {carpoolingRoutes} from './features/carpooling/carpooling.routes';
import {serviceVehicleRoutes} from './features/service-vehicle/service-vehicle.routes';

export const routes: Routes = [
  {path: "", loadComponent: () => import('./app.component').then(m => m.AppComponent), canActivate: [AuthGuard]},
  {path: "login", loadComponent: () => import('./features/sign-in/pages/sign-in.component/sign-in.component').then(m => m.SignInComponent)},
  {path: "**", loadComponent: () => import('./core/pages/page-not-found/page-not-found.component').then(m => m.PageNotFoundComponent)},


  ...carpoolingRoutes,
  ...serviceVehicleRoutes
];
