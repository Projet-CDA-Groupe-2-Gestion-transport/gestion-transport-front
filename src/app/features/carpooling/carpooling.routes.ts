import { Routes } from '@angular/router';
import {AuthGuard} from '../../core/guards/auth.guard';


export const carpoolingRoutes: Routes = [
  {path: "carpooling", canActivate: [AuthGuard],
    children: [
      {path: 'edit/:id', loadComponent: () => import('./pages/carpooling/carpooling.component').then(m => m.CarpoolingComponent)},
      {path: 'new', loadComponent: () => import('./pages/carpooling/carpooling.component').then(m => m.CarpoolingComponent)},
      {
        path: 'booking-list',
        loadComponent: () => import('./pages/carpooling-booking-list/carpooling-booking-list.component').then(m => m.CarpoolingBookingListComponent),
      },
      {
        path: 'search',
        loadComponent: () => import('./pages/carpooling-search/carpooling-search.component').then(m => m.CarpoolingSearchComponent),
      },
      {
        path: '',
        loadComponent: () => import('./pages/carpooling-list/carpooling-list.component').then(m => m.CarpoolingListComponent),
      }
    ]
  }
];
