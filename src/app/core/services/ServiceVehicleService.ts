import {environment} from '../../../environments/environment.development';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {ServiceVehicle} from '../../features/service-vehicle/model/serviceVehicle';

@Injectable({
  providedIn: 'root'
})

export class ServiceVehicleService {

  private baseUrl = `${environment.apiUrl}/api/service-vehicle`

  constructor(private http: HttpClient) {}

  getAllServiceVehicle(): Observable<ServiceVehicle[]> {
    return this.http.get<any>(`${this.baseUrl}`)
  }

  getServiceVehicleById(licensePlateNumber: string): Observable<ServiceVehicle> {
    return this.http.get<ServiceVehicle>(`${this.baseUrl}/${licensePlateNumber}`)
  }

  saveServiceVehicle(serviceVehicle: ServiceVehicle): Observable<ServiceVehicle> {
    return this.http.post<ServiceVehicle>(`${this.baseUrl}`, serviceVehicle)
  }

  deleteServiceVehicle(licensePlateNumber: string) {
    return this.http.delete<any>(`${this.baseUrl}/${licensePlateNumber}`)
  }
}
