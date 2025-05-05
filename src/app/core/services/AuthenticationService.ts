import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs';
import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment.development';


@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly TOKEN_KEY = 'auth_token'; // Clé pour le localStorage

  private baseUrl = `${environment.apiUrl}/api`

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post<any>(`${this.baseUrl}/auth/login`, { username, password }, {withCredentials: true}).pipe(
      tap((response) => {
        if (response.jwt) {
          this.saveToken(response.jwt);
        }
      })
    );
  }

  saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY); // Supprime le token
  }

  isLogged(): boolean {
    return !!this.getToken();
  }
}
