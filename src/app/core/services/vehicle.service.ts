import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment.development';
import {Observable, Subject} from 'rxjs';
import {Vehicle} from '../../features/vehicle/models/vehicle';

@Injectable({
  providedIn: 'root'
})

export class VehicleService {

  private baseUrl = `${environment.apiUrl}/api/vehicle`
  private readonly http = inject(HttpClient);

  private vehicleAddedSubject = new Subject<Vehicle>();
  vehicleAdded$ = this.vehicleAddedSubject.asObservable();

  private openVehicleAddDialog = new Subject<void>();
  vehicleAddDialog$ = this.openVehicleAddDialog.asObservable();

  getAllVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(`${this.baseUrl}`)
  }

  saveVehicle(vehicle: Vehicle): Observable<Vehicle> {
    return this.http.post<Vehicle>(`${this.baseUrl}`, vehicle)
  }

  announceVehicleAdded(vehicle: Vehicle): void {
    this.vehicleAddedSubject.next(vehicle);
  }

  announceOpenVehicleAddDialog(): void {
    this.openVehicleAddDialog.next();
  }
}
