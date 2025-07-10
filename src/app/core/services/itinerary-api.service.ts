import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {OSRMResponse} from '../model/OSRM-response';

@Injectable({
  providedIn: 'root'
})
export class ItineraryApiService {

  private baseUrl = 'https://router.project-osrm.org/route/v1/driving';

  constructor(private http: HttpClient) {}

  /**
   * Calcule distance (en km) et durée (en minutes) entre deux points GPS
   * @param start - coordonnées de départ [lon, lat]
   * @param end - coordonnées d’arrivée [lon, lat]
   */
  getRoute(start: [number, number], end: [number, number]): Observable<{ distanceKm: number, durationMin: number }> {
    const coordinates = `${start[0]},${start[1]};${end[0]},${end[1]}`;

    const params = new HttpParams().set('overview', 'false');

    return this.http.get<OSRMResponse>(`${this.baseUrl}/${coordinates}`, { params }).pipe(
      map(res => {
        const route = res.routes[0];
        return {
          distanceKm: +(route.distance / 1000).toFixed(2),
          durationMin: +(route.duration / 60).toFixed(1)
        };
      })
    );
  }
}
