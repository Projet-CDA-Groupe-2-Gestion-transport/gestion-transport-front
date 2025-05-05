import { Component } from '@angular/core';
import {NavComponent} from "../../components/nav/nav.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-default-layout',
    imports: [
        NavComponent,
        RouterOutlet
    ],
  templateUrl: './default-layout.component.html',
  styleUrl: './default-layout.component.scss'
})
export class DefaultLayoutComponent {

}
