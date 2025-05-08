import {Routes} from '@angular/router';

export const serviceVehicleBookingRoutes: Routes = [

  {
    path: "service-vehicle-booking",
    children: [
      {
        path: 'list',
        loadComponent: () => import('../../service-vehicle-booking-list/service-vehicle-booking-list.component').then(m => m.ServiceVehicleBookingListComponent)
      },
      {
        path: 'new',
        loadComponent: () => import('../../service-vehicle-booking-form/service-vehicle-booking-form.component').then(m => m.ServiceVehicleBookingFormComponent)
      },
      {
        path: ':id/edit',
        loadComponent: () => import('../../service-vehicle-booking-form/service-vehicle-booking-form.component').then(m => m.ServiceVehicleBookingFormComponent)
      },
      {
        path: ':id',
        loadComponent: () => import('../../service-vehicle-booking-detail/service-vehicle-booking-detail.component').then(m => m.ServiceVehicleBookingDetailComponent)
      },

    ],
  }
];
