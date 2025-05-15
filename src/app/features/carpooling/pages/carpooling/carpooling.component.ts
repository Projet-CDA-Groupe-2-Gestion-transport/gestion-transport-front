import {Component, computed, DestroyRef, inject, linkedSignal, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {takeUntilDestroyed, toObservable, toSignal} from '@angular/core/rxjs-interop';
import {catchError, map, of, switchMap} from 'rxjs';
import {Carpooling, initCarpooling} from '../../models/carpooling';
import {ProgressSpinner} from 'primeng/progressspinner';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {DatePicker} from 'primeng/datepicker';
import {InputNumber} from 'primeng/inputnumber';
import {Select} from 'primeng/select';
import {Button} from 'primeng/button';
import {AuthenticationService} from '../../../../core/services/authentication.service';
import {MessageService} from 'primeng/api';
import {VehicleService} from '../../../../core/services/vehicle.service';
import {Vehicle} from '../../../vehicle/models/vehicle';
import {VehicleComponent} from '../../../vehicle/pages/vehicle/vehicle.component';
import {CarpoolingService} from '../../../../core/services/carpooling.service';

@Component({
  selector: 'app-carpooling',
  imports: [
    ProgressSpinner,
    ReactiveFormsModule,
    InputText,
    FormsModule,
    DatePicker,
    InputNumber,
    Select,
    Button,
    VehicleComponent
  ],
  templateUrl: './carpooling.component.html',
  styleUrl: './carpooling.component.scss'
})
export class CarpoolingComponent implements OnInit {
  private readonly carpoolingSvc = inject(CarpoolingService);
  private readonly vehicleSvc = inject(VehicleService);
  private readonly route = inject(ActivatedRoute);
  private readonly authSvc = inject(AuthenticationService);
  private readonly messageSvc = inject(MessageService);
  private readonly router = inject(Router);
  readonly #destroyRef = inject(DestroyRef);
  private routeParamMap = toSignal(this.route.paramMap);

  carpoolingId = computed(() => this.routeParamMap()?.get('id') || null);

  ngOnInit() {
    this.listenAddedVehicle();
  }

  private readonly carpoolingResponse = toSignal(
    toObservable(this.carpoolingId).pipe(
      switchMap(carpooling => {
        if (carpooling) {
          return this.carpoolingSvc.getCarpoolingById(+carpooling).pipe(
            map(value => ({value, error: undefined})),
            catchError(error => of({value: undefined, error}))
          );
        }
        return of({value: initCarpooling(), error: undefined});
      })
    ),
  );

  readonly loading = computed(() => !this.carpoolingResponse());

  carpooling = linkedSignal<Carpooling | undefined>(
    computed(() => this.carpoolingResponse()?.value)
  );

  private readonly vehiclesResponse = toSignal(this.vehicleSvc.getAllVehicles().pipe(
      map(value => ({value, error: undefined})),
      catchError(error => of({value: undefined, error}))
    )
  );

  loadingVehicles = computed(() => !this.vehiclesResponse());

  vehicles = linkedSignal<Vehicle[] | undefined>(
    computed(() => this.vehiclesResponse()?.value)
  );

  title = computed(() => {
    if (this.carpooling()?.id == null) return "Créer une annonce de covoiturage";
    if (this.canModify()) return "Modifier l'annonce de covoiturage";
    return "Annonce de covoiturage";
  });

  canModify() {
    return this.carpoolingId() === null || (this.authSvc.isConnectedUserName(this.carpooling()?.organisator?.username) && this.carpooling()?.users.length === 0 && this.carpooling()!.dateTimeStart > new Date());
  }

  saveCarpooling() {
    this.carpoolingSvc.saveCarpooling(this.carpooling()!).pipe(takeUntilDestroyed(this.#destroyRef)).subscribe((res) => {
      this.carpooling.set(res);
      this.messageSvc.add({
        severity: 'success',
        summary: 'Annonce de covoiturage enregistrée',
        icon: 'fa-solid fa-check'
      });
      this.router.navigate([`/carpooling/${res.id}`]);
    });
  }

  private listenAddedVehicle() {
    this.vehicleSvc.vehicleAdded$.pipe(takeUntilDestroyed(this.#destroyRef)).subscribe((res) => {
      this.vehicles.set([...this.vehicles()!, res]);
    });
  }

  displayAddVehicule = () => {
    this.vehicleSvc.announceOpenVehicleAddDialog();
  }

  deleteCarpooling() {
    this.carpoolingSvc.deleteCarpooling(+this.carpoolingId()!).pipe(takeUntilDestroyed(this.#destroyRef)).subscribe(() => {
      this.messageSvc.add({
        severity: 'success',
        summary: 'Annonce de covoiturage supprimée',
        icon: 'fa-solid fa-check'
      });
      this.router.navigate(['/carpooling/list']);
    });
  }
}
