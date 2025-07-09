import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, Observable, of} from 'rxjs';
import {AddressApiResponse} from '../model/address-api-response';

@Injectable({
  providedIn: 'root'
})
export class AddressApiService {
  private readonly NOMINATIM_URL = 'https://nominatim.openstreetmap.org/search';

  constructor(private http: HttpClient) {}

  search(query: string): Observable<AddressApiResponse[]> {
    const params = {
      q: query,
      format: 'json',
      addressdetails: '1',
      limit: '10',
      'accept-language': 'fr',
      countrycodes: 'fr',
      bounded: '1',
    };

    return this.http.get<AddressApiResponse[]>(this.NOMINATIM_URL, { params }).pipe(
      map(results => results.map(result => this.mapToAddressApiResponse(result))),
      catchError(error => {
        console.error('Erreur lors de la recherche d\'adresse:', error);
        return of([]);
      })
    );
  }

  private mapToAddressApiResponse(nominatimResult: AddressApiResponse): AddressApiResponse {
    return {
      display_name: nominatimResult.display_name,
      lat: nominatimResult.lat,
      lon: nominatimResult.lon,
      type: nominatimResult.type,
      importance: nominatimResult.importance,
      place_id: nominatimResult.place_id,
      osm_id: nominatimResult.osm_id,
      osm_type: nominatimResult.osm_type,
      address: nominatimResult.address,
      boundingbox: nominatimResult.boundingbox
    };
  }
}
