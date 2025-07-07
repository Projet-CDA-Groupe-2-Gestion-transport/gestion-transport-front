import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment.development';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Router} from '@angular/router';
import {AuthResponse} from '../model/auth-response.model';


@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly TOKEN_KEY = 'auth_token'; // Clé pour le localStorage

  private baseUrl = `${environment.apiUrl}/api`
  private jwtHelper = new JwtHelperService;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(username: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/auth/login`, { username, password }, {withCredentials: true}).pipe(
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
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (token) {
      if (this.jwtHelper.isTokenExpired(token)) {
        this.logout();
        return null;
      }
      return token
    }
    return token;
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    this.router.navigate(['auth/login']);
  }

  isLogged(): boolean {
    return !!this.getToken() && !this.jwtHelper.isTokenExpired(this.getToken())
  }

  hasRole(role: string): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }

    const decodedToken = this.jwtHelper.decodeToken(token);
    if (decodedToken && decodedToken.roles && Array.isArray(decodedToken.roles)) {
      return decodedToken.roles.includes(role);
    }
    return false;
  }

  isConnectedUserName(username: string | undefined): boolean{
    const token = this.getToken();
    if (!token) return false;
    const decodedToken = this.jwtHelper.decodeToken(token);
    return decodedToken.sub == username;
  }
}
