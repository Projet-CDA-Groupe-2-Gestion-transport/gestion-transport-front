import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment.development';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Router} from '@angular/router';
import {AuthResponse} from '../model/auth-response.model';
import { User } from '../../features/carpooling/models/user';


@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly TOKEN_KEY = 'auth_token'; // Clé pour le localStorage
   private currentUser: User | null = null;

  private baseUrl = `${environment.apiUrl}/api`
  private jwtHelper = new JwtHelperService;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
   const userFromStorage = localStorage.getItem('currentUser');
    if (userFromStorage) {
      this.currentUser=JSON.parse(userFromStorage);
      }
  }
  setUser(user: User): void {
    this.currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  login(username: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/auth/login`, { username, password }, {withCredentials: true}).pipe(
      tap((response) => {
        if (response.jwt) {
          this.saveToken(response.jwt);
          const decodedToken = this.jwtHelper.decodeToken(response.jwt);
        const user: User = {
          id: decodedToken.id,
          username: decodedToken.sub
        };

        this.setUser(user); // ✅ Définit currentUser et le stocke
      }
    })
  );
}
  getUser(): User | null {
    return this.currentUser;
  }
   getUserId(): number | null {
    return this.currentUser?.id ?? null;
  }

  saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/login']);
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
