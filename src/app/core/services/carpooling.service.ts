import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment.development';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Carpooling} from '../../features/carpooling/models/Carpooling.model';

@Injectable({
  providedIn: 'root'
})
export class CarpoolingService {

  private baseUrl = `${environment.apiUrl}/api/carpooling`

  constructor(private http: HttpClient) {
  }

  getUserBooking(isArchived: boolean): Observable<Carpooling[]> {
    return this.http.get<Carpooling[]>(`${this.baseUrl}/user-booking`, {params: {isArchived}});
  }
}
