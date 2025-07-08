import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {Menubar} from 'primeng/menubar';
import {MenuItem} from 'primeng/api';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {RouterLink} from '@angular/router';
import {createNavItems} from './model/nav-items.model';
import {createSubNavItems} from './model/sub-nav-items';

@Component({
  selector: 'app-nav',
  imports: [
    Menubar,
    OverlayPanelModule,
    RouterLink
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class NavComponent implements OnInit {

  navItems: MenuItem[] | undefined;
  subNavItems: MenuItem[] | undefined;
  isAdmin = false;

  constructor(
    private authService: AuthenticationService
  ) {
  }

  ngOnInit() {
    this.isAdmin = this.authService.hasRole('ADMIN');
    this.navItems = createNavItems(this.isAdmin);
    this.subNavItems = createSubNavItems(this.authService);
  }

}
