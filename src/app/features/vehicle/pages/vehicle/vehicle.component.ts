import {Component, DestroyRef, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {BrandEnum} from '../../../../core/enums/brandEnum';
import {CapitalizePipe} from '../../../../shared/pipes/string/capitalize.pipe';
import {VehicleService} from '../../../../core/services/VehicleService';
import {initVehicle, Vehicle} from '../../models/vehicle';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {MessageService} from 'primeng/api';
import {FormsModule} from '@angular/forms';
import {InputMask} from 'primeng/inputmask';
import {Select} from 'primeng/select';
import {InputText} from 'primeng/inputtext';
import {InputNumber} from 'primeng/inputnumber';
import {Button} from 'primeng/button';
import {Dialog} from 'primeng/dialog';

@Component({
  selector: 'app-vehicle',
  imports: [
    FormsModule,
    InputMask,
    Select,
    InputText,
    InputNumber,
    Button,
    Dialog
  ],
  templateUrl: './vehicle.component.html',
  styleUrl: './vehicle.component.scss'
})
export class VehicleComponent  implements OnInit {

  private readonly vehicleService = inject(VehicleService);
  private readonly messageSvc = inject(MessageService);
  readonly #destroyRef = inject(DestroyRef);
  vehicle: WritableSignal<Vehicle> = signal(initVehicle());
  displayDialog: WritableSignal<boolean> = signal(false);

  ngOnInit(): void {
    this.listenDisplayDialog();
    this.vehicle.set(initVehicle());
  }

  listenDisplayDialog = () => {
    this.vehicleService.vehicleAddDialog$
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe(() => {
        this.displayDialog.set(true);
      });
  }

  brandOptions = Object.values(BrandEnum).map(value => ({
    label: new CapitalizePipe().transform(value),
    value: value,
  }));

  saveVehicle() {
    this.vehicleService.saveVehicle(this.vehicle()).pipe(takeUntilDestroyed(this.#destroyRef)).subscribe((res: Vehicle) => {
      this.vehicle.set(res);
      this.vehicleService.announceVehicleAdded(res);
      this.displayDialog.set(false);
      this.messageSvc.add({
        severity: 'success',
        summary: 'Véhicule enregistré',
        icon: 'fa-solid fa-check'
      });
    });
  }
}
