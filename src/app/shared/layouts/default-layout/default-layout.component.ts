import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {NavComponent} from '../../../core/components/nav/nav.component';

@Component({
  selector: 'app-default-layout',
    imports: [
        NavComponent,
        RouterOutlet
    ],
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {

}
