import { Routes } from '@angular/router';
import {AuthGuard} from './service/guard/auth.guard';

export const routes: Routes = [
  {path: "", loadComponent: () => import('./app.component').then(m => m.AppComponent), canActivate: [AuthGuard]},
  {path: "login", loadComponent: () => import('./sign-in/sign-in.component').then(m => m.SignInComponent)},
  {path: "**", loadComponent: () => import('./page-not-found/page-not-found.component').then(m => m.PageNotFoundComponent)},
];
