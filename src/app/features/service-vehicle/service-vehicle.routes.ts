import { Routes } from '@angular/router';
import {AdminGuard} from '../../core/guards/admin.guard';

export const serviceVehicleRoutes: Routes = [
  {path: "service-vehicle", canActivate: [AdminGuard],
    children: [
      {path: 'list', loadComponent: () => import('./pages/service-vehicle-list/service-vehicle-list.component').then(m => m.ServiceVehicleListComponent)},
      {path: 'edit/:licensePlateNumber', loadComponent: () => import('./pages/service-vehicle/service-vehicle.component').then(m => m.ServiceVehicleComponent)},
      {path: 'new', loadComponent: () => import('./pages/service-vehicle/service-vehicle.component').then(m => m.ServiceVehicleComponent)},
    ],
  }
];
