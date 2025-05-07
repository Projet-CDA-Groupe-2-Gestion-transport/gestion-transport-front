import { Routes } from '@angular/router';
import {AuthGuard} from '../../core/guards/auth.guard';


export const carpoolingRoutes: Routes = [
  {path: "carpooling", canActivate: [AuthGuard],
    children: [
      {path: 'edit/:id', loadComponent: () => import('./pages/carpooling/carpooling.component').then(m => m.CarpoolingComponent)},
      {path: 'new', loadComponent: () => import('./pages/carpooling/carpooling.component').then(m => m.CarpoolingComponent)},
    ],
  }
];
