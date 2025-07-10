import {inject, Injectable} from '@angular/core';
import {environment} from '../../../environments/environment.development';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ServiceVehicle} from '../../features/service-vehicle/model/serviceVehicle';
import {Carpooling} from '../../features/carpooling/models/carpooling';
import {CarpoolingBooking} from '../../features/carpooling/models/carpooling-booking.model';
import {CarpoolingSearchParams} from '../../features/carpooling/models/carpooling-search-params';
import {GenericResponse} from '../model/generic-response';
import {User} from '../../features/carpooling/models/user';

@Injectable({
  providedIn: 'root'
})
export class CarpoolingService {

  private baseUrl = `${environment.apiUrl}/api/carpooling`;

  private readonly http = inject(HttpClient);

  getAllCarpooling(): Observable<ServiceVehicle[]> {
    return this.http.get<ServiceVehicle[]>(`${this.baseUrl}`);
  }

  getAllOrganisatorCarpooling(isArchived: boolean): Observable<Carpooling[]> {
    return this.http.get<Carpooling[]>(`${this.baseUrl}/organisator`, {params: {isArchived}});
  }

  getCarpoolingById(id: number): Observable<Carpooling> {
    return this.http.get<Carpooling>(`${this.baseUrl}/${id}`);
  }

  search(params: CarpoolingSearchParams): Observable<Carpooling[]> {
    const filteredParams = Object.entries(params)
      .filter((value) => value[1] !== null && value[1] !== undefined)
      .reduce((obj, [key, value]) => ({
        ...obj,
        [key]: String(value)
      }), {});

    return this.http.get<Carpooling[]>(`${this.baseUrl}/search`,
      {params: filteredParams})
  }

  getCarpoolingParticipantList(id: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/${id}/participants`);
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
    return this.http.delete<void>(`${this.baseUrl}/${idCarpooling}/user-booking`);
  }

  saveUserBooking(idCarpooling: number): Observable<GenericResponse> {
    return this.http.post<GenericResponse>(`${this.baseUrl}/${idCarpooling}/user-booking`, idCarpooling);
  }

}
