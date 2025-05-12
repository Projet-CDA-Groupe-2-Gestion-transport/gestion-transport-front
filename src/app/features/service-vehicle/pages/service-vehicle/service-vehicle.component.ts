import {Component, computed, DestroyRef, inject, linkedSignal} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {takeUntilDestroyed, toObservable, toSignal} from '@angular/core/rxjs-interop';
import {ServiceVehicleService} from '../../../../core/services/service-vehicle.service';
import {catchError, map, of, switchMap} from 'rxjs';
import {initServiceVehicle, ServiceVehicle} from '../../model/serviceVehicle';
import {FormsModule} from '@angular/forms';
import {BrandEnum} from '../../../../core/enums/brandEnum';
import {VehicleCategoryEnum} from '../../../../core/enums/vehicleCategoryEnum';
import {MotorizationEnum, MotorizationEnumTranslate} from '../../../../core/enums/motorizationEnum';
import {InputMask} from 'primeng/inputmask';
import {ProgressSpinner} from 'primeng/progressspinner';
import {Select} from 'primeng/select';
import {CapitalizePipe} from '../../../../shared/pipes/string/capitalize.pipe';
import {InputText} from 'primeng/inputtext';
import {InputNumber} from 'primeng/inputnumber';
import {
  ServiceVehiculeStatusEnum,
  ServiceVehiculeStatusEnumTranslate
} from '../../../../core/enums/serviceVehiculeStatusEnum';
import {Button} from 'primeng/button';
import {MessageService} from 'primeng/api';
import {EnumToStringPipe} from '../../../../shared/pipes/string/enum-to-string.pipe';
@Component({
  selector: 'app-service-vehicle',
  imports: [
    FormsModule,
    InputMask,
    ProgressSpinner,
    Select,
    InputText,
    InputNumber,
    Button
  ],
  templateUrl: './service-vehicle.component.html',
  styleUrl: './service-vehicle.component.scss'
})
export class ServiceVehicleComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly serviceVehicleService = inject(ServiceVehicleService);
  private routeParamMap = toSignal(this.route.paramMap);
  private readonly router = inject(Router);
  readonly #destroyRef = inject(DestroyRef);
  private readonly messageSvc = inject(MessageService);

  brandOptions = Object.values(BrandEnum).map(value => ({
    label: new CapitalizePipe().transform(value),
    value: value,
  }));

  categoryOptions = Object.values(VehicleCategoryEnum).map(value => ({
    label: new EnumToStringPipe().transform(value),
    value: value,
  }));

  motorizationOptions = Object.values(MotorizationEnum).map(value => ({
    label: MotorizationEnumTranslate[value],
    value: value,
  }));

  statusOptions = Object.values(ServiceVehiculeStatusEnum).map(value => ({
    label: ServiceVehiculeStatusEnumTranslate[value],
    value: value,
  }));

  licensePlateNumber = computed(() => this.routeParamMap()?.get('licensePlateNumber') || null);

  private readonly serviceVehicleResponse = toSignal(
    toObservable(this.licensePlateNumber).pipe(
      switchMap(licensePlate => {
        if (licensePlate) {
          return this.serviceVehicleService.getServiceVehicleById(licensePlate).pipe(
            map(value => ({value, error: undefined})),
            catchError(error => of({value: undefined, error}))
          );
        }
        return of({value: initServiceVehicle(), error: undefined});
      })
    ),
  );

  readonly loading = computed(() => !this.serviceVehicleResponse());

  serviceVehicle = linkedSignal<ServiceVehicle | undefined>(
    computed(() => this.serviceVehicleResponse()?.value)
  );

  title = computed(() => this.serviceVehicle()?.licensePlateNumber !== '' ? "Modifier un véhicule de service" : "Ajouter un véhicule de service");

  saveServiceVehicle() {
    this.serviceVehicleService.saveServiceVehicle(this.serviceVehicle()!).pipe(takeUntilDestroyed(this.#destroyRef)).subscribe({
      next: (res: ServiceVehicle) => {
        if (this.licensePlateNumber() === null)
          this.router.navigate([`/service-vehicle/edit/${res.licensePlateNumber}`]);
        else
          this.serviceVehicle.set(res);
        this.messageSvc.add({
          severity: 'success',
          summary:  `Véhicule ${this.serviceVehicle()!.licensePlateNumber}` + (this.licensePlateNumber === null ?  `ajouté` : `mis à jour`),
          icon: 'fa-solid fa-check'
        });
      }
    });
  }

  deleteServiceVehicle() {
    this.serviceVehicleService.deleteServiceVehicle(this.licensePlateNumber()!).pipe(takeUntilDestroyed(this.#destroyRef)).subscribe({
      next: () => {
        this.messageSvc.add({
          severity: 'success',
          summary:  `Véhicule ${this.serviceVehicle()!.licensePlateNumber} supprimé`,
          icon: 'fa-solid fa-check'
        });
        this.router.navigate([`/service-vehicle/list`]);
      }
    });
  }
}
