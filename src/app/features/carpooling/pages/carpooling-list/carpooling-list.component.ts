import {Component, signal} from '@angular/core';
import {Tab, TabList, TabPanel, TabPanels, Tabs} from "primeng/tabs";
import {TitleComponent} from "../../../../shared/components/title/title.component";
import {CarpoolingListTableComponent} from './carpooling-list-table/carpooling-list-table.component';

@Component({
  selector: 'app-carpooling-list',
  imports: [
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    TitleComponent,
    CarpoolingListTableComponent
  ],
  templateUrl: './carpooling-list.component.html',
  styleUrl: './carpooling-list.component.scss'
})
export class CarpoolingListComponent {

  activeTabValue = signal(0);
}
