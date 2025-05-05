import {Component, computed, inject, linkedSignal} from '@angular/core';
import {ServiceVehicleService} from '../../../../core/services/ServiceVehicleService';
import {toSignal} from '@angular/core/rxjs-interop';
import {catchError, map, of} from 'rxjs';
import {ServiceVehicle} from '../../model/serviceVehicle';
import {TableModule} from 'primeng/table';
import {Button} from 'primeng/button';
import {UpperCasePipe} from '@angular/common';
import {CapitalizePipe} from '../../../../shared/pipes/string/capitalize.pipe';

@Component({
  selector: 'app-service-vehicle-list',
  imports: [
    TableModule,
    Button,
    UpperCasePipe,
    CapitalizePipe
  ],
  templateUrl: './service-vehicle-list.component.html',
  styleUrl: './service-vehicle-list.component.scss',

})
export class ServiceVehicleListComponent {

  private readonly serviceVehicleService = inject(ServiceVehicleService);


  private readonly serviceVehicleResponseList = toSignal(this.serviceVehicleService.getAllServiceVehicle()
    .pipe(map((value) => ({
        value,
        error: undefined
      })),
      catchError((error) => of({value: undefined, error}))
    )
  );

  readonly loading = computed(() => !this.serviceVehicleResponseList());

  serviceVehicleList = linkedSignal<ServiceVehicle[] | undefined>(
    computed(() => this.serviceVehicleResponseList()?.value)
  );

  openPicture(photoUrl: string) {
    if (photoUrl)
      window.open(photoUrl, '_blank');
  }
}
