import {environment} from '../../../environments/environment.development';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ServiceVehicleBooking} from '../../features/service-vehicle/model/serviceVehicleBooking';


@Injectable({
  providedIn: 'root'
})

export class ServiceVehicleBookingService {
 private baseUrl = `${environment.apiUrl}/api/service-vehicle-bookings`

  constructor(private http: HttpClient) {}

  getAllBookings(): Observable<ServiceVehicleBooking[]> {
    return this.http.get<ServiceVehicleBooking[]>(`${this.baseUrl}`)
  }

  getBookingsByVehicleId(vehicleId: string): Observable<ServiceVehicleBooking[]> {
    return this.http.get<ServiceVehicleBooking[]>(`${this.baseUrl}/vehicle/${vehicleId}`);
  }
  getBookingByBookingId(id: number): Observable<ServiceVehicleBooking> {
  return this.http.get<ServiceVehicleBooking>(`${this.baseUrl}/${id}`);
 }

  createBooking(booking: ServiceVehicleBooking): Observable<ServiceVehicleBooking> {
    return this.http.post<ServiceVehicleBooking>(this.baseUrl, booking);
  }

  updateBooking(id: number, booking: ServiceVehicleBooking): Observable<ServiceVehicleBooking> {
    return this.http.put<ServiceVehicleBooking>(`${this.baseUrl}/${id}`, booking);
  }

  deleteBooking(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
