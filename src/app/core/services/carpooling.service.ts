import {inject, Injectable} from '@angular/core';
import {environment} from '../../../environments/environment.development';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ServiceVehicle} from '../../features/service-vehicle/model/serviceVehicle';
import {Carpooling} from '../../features/carpooling/models/carpooling';
import {CarpoolingBooking} from '../../features/carpooling/models/carpooling-booking.model';

@Injectable({
  providedIn: 'root'
})
export class CarpoolingService {

  private baseUrl = `${environment.apiUrl}/api/carpooling`;

  private readonly http = inject(HttpClient);

  getAllCarpooling(): Observable<ServiceVehicle[]> {
    return this.http.get<ServiceVehicle[]>(`${this.baseUrl}`);
  }

  getCarpoolingById(id: number): Observable<Carpooling> {
    return this.http.get<Carpooling>(`${this.baseUrl}/${id}`);
  }

  saveCarpooling(carpooling: Carpooling): Observable<Carpooling> {
    return this.http.post<Carpooling>(`${this.baseUrl}`, carpooling);
  }

  deleteCarpooling(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getUserBooking(isArchived: boolean): Observable<CarpoolingBooking[]> {
    return this.http.get<CarpoolingBooking[]>(`${this.baseUrl}/user-booking`, {params: {isArchived}});
  }

  cancelUserBooking(idCarpooling: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${idCarpooling}/cancel-booking`);
  }

}
