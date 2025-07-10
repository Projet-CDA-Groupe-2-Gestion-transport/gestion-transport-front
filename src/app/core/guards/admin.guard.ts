import {CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {Roles} from '../enums/roles.enum';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.authService.isLogged() && this.authService.hasRole(Roles.ADMIN)) {
      return true;
    } else {
      this.router.navigate(['auth/login']);
      return false;
    }
  }
}
