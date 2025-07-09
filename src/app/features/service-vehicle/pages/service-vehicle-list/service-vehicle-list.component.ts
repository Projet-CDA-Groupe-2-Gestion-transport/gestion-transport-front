import {Component, computed, DestroyRef, inject, linkedSignal} from '@angular/core';
import {ServiceVehicleService} from '../../../../core/services/service-vehicle.service';
import {takeUntilDestroyed, toSignal} from '@angular/core/rxjs-interop';
import {catchError, map, of} from 'rxjs';
import {ServiceVehicle} from '../../model/serviceVehicle';
import {TableModule} from 'primeng/table';
import {Button} from 'primeng/button';
import {UpperCasePipe} from '@angular/common';
import {CapitalizePipe} from '../../../../shared/pipes/string/capitalize.pipe';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {TitleComponent} from '../../../../shared/components/title/title.component';
import {ConfirmDialog} from 'primeng/confirmdialog';


@Component({
  selector: 'app-service-vehicle-list',
  imports: [
    TableModule,
    Button,
    UpperCasePipe,
    CapitalizePipe,
    TitleComponent,
    ConfirmDialog
  ],
  providers: [ConfirmationService],
  templateUrl: './service-vehicle-list.component.html',
  styleUrl: './service-vehicle-list.component.scss',

})
export class ServiceVehicleListComponent {

  readonly #serviceVehicleSvc = inject(ServiceVehicleService);
  readonly #messageSvc = inject(MessageService);
  readonly #destroyRef = inject(DestroyRef);
  readonly #router = inject(Router);
  readonly #confirmationService = inject(ConfirmationService);



  private readonly serviceVehicleResponseList = toSignal(this.#serviceVehicleSvc.getAllServiceVehicle()
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

  confirmDelete(event: Event, serviceVehiculeId: string) {
    this.#confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Etes-vous sûr de vouloir supprimer ce véhicule de service?',
      header: 'Confirmation',
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Non',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Oui',
        severity: 'danger'
      },
      accept: () => {
        this.deleteServiceVehicle(serviceVehiculeId);
      },
    });
  }


  deleteServiceVehicle(licensePlateNumber: string) {
    this.#serviceVehicleSvc.deleteServiceVehicle(licensePlateNumber).pipe(takeUntilDestroyed(this.#destroyRef)).subscribe({
      next: () => {
        this.serviceVehicleList.set(this.serviceVehicleList()!.filter(sv => sv.licensePlateNumber !== licensePlateNumber));
        this.#messageSvc.add({
          severity: 'success',
          summary:  `Véhicule ${licensePlateNumber} supprimé`,
          icon: 'fa-solid fa-check'
        });
      }
    });
  }

  editServiceVehicle(licensePlateNumber: string) {
    this.#router.navigate([`/service-vehicle/edit/${licensePlateNumber}`]);
  }

  addVehicle() {
    this.#router.navigate([`/service-vehicle/new`]);
  }
}
