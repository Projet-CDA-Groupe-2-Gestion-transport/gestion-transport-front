import {Component, computed, DestroyRef, inject, linkedSignal} from '@angular/core';
import {ServiceVehicleService} from '../../../../core/services/service-vehicle.service';
import {takeUntilDestroyed, toSignal} from '@angular/core/rxjs-interop';
import {catchError, map, of} from 'rxjs';
import {ServiceVehicle} from '../../model/serviceVehicle';
import {TableModule} from 'primeng/table';
import {Button} from 'primeng/button';
import {UpperCasePipe} from '@angular/common';
import {CapitalizePipe} from '../../../../shared/pipes/string/capitalize.pipe';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';

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

  private readonly serviceVehicleSvc = inject(ServiceVehicleService);
  private readonly messageSvc = inject(MessageService);
  readonly #destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);


  private readonly serviceVehicleResponseList = toSignal(this.serviceVehicleSvc.getAllServiceVehicle()
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

  deleteServiceVehicle(licensePlateNumber: string) {
    this.serviceVehicleSvc.deleteServiceVehicle(licensePlateNumber).pipe(takeUntilDestroyed(this.#destroyRef)).subscribe({
      next: (res: ServiceVehicle) => {
        this.serviceVehicleList.set(this.serviceVehicleList()!.filter(sv => sv.licensePlateNumber !== licensePlateNumber));
        this.messageSvc.add({
          severity: 'success',
          summary:  `Véhicule ${licensePlateNumber} supprimé`,
          icon: 'fa-solid fa-check'
        });
      }
    });
  }

  editServiceVehicle(licensePlateNumber: string) {
    this.router.navigate([`/service-vehicle/edit/${licensePlateNumber}`]);
  }

  addVehicle() {
    this.router.navigate([`/service-vehicle/new`]);
  }
}
