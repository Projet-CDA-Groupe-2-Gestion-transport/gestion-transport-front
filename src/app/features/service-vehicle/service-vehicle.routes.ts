import { Routes } from '@angular/router';
import {AuthGuard} from '../../core/guards/auth.guard';


export const serviceVehicleRoutes: Routes = [
  {path: "service-vehicle", canActivate: [AuthGuard],
    children: [
      {path: 'list', loadComponent: () => import('./pages/service-vehicle-list/service-vehicle-list.component').then(m => m.ServiceVehicleListComponent)},
    ],
  }

];
