import {Component, signal, WritableSignal} from '@angular/core';
import {Tab, TabList, TabPanel, TabPanels, Tabs} from "primeng/tabs";
import {TitleComponent} from "../../../../shared/components/title/title.component";
import {CarpoolingListTableComponent} from './carpooling-list-table/carpooling-list-table.component';
import {Button} from 'primeng/button';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-carpooling-list',
  imports: [
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    TitleComponent,
    CarpoolingListTableComponent,
    Button,
    RouterLink
  ],
  templateUrl: './carpooling-list.component.html',
  styleUrl: './carpooling-list.component.scss'
})
export class CarpoolingListComponent {

  activeTabValue: WritableSignal<number> = signal(0);
}
