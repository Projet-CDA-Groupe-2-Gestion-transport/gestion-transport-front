import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {AuthenticationService} from './core/services/AuthenticationService';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ToastModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {


  constructor(
    private authService: AuthenticationService
  ) {
  }

  logout() {
    this.authService.logout();
  }
  title = 'gestion-transport';
}
