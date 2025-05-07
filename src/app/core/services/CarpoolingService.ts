import {inject, Injectable} from '@angular/core';
import {environment} from '../../../environments/environment.development';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ServiceVehicle} from '../../features/service-vehicle/model/serviceVehicle';
import {Carpooling} from '../../features/carpooling/models/carpooling';

@Injectable({
  providedIn: 'root'
})
export class CarpoolingService {

  private baseUrl = `${environment.apiUrl}/api/carpooling`

  private readonly http = inject(HttpClient)

  getAllCarpooling(): Observable<ServiceVehicle[]> {
    return this.http.get<any>(`${this.baseUrl}`)
  }

  getCarpoolingById(id: number): Observable<Carpooling> {
    return this.http.get<Carpooling>(`${this.baseUrl}/${id}`)
  }

  saveCarpooling(carpooling: Carpooling): Observable<Carpooling> {
    return this.http.post<any>(`${this.baseUrl}`, carpooling)
  }

  deleteCarpooling(id: number) {
    return this.http.delete<any>(`${this.baseUrl}/${id}`)
  }


}
