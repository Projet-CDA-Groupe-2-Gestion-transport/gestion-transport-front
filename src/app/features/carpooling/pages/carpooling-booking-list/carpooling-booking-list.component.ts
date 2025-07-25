import {Component} from '@angular/core';
import {TableModule} from 'primeng/table';
import {TitleComponent} from '../../../../shared/components/title/title.component';
import {Button} from 'primeng/button';
import {Tab, TabList, TabPanel, TabPanels, Tabs} from 'primeng/tabs';
import {
  CarpoolingBookingListTableComponent
} from './carpooling-booking-list-table/carpooling-booking-list-table.component';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-carpooling-list',
  imports: [
    TableModule,
    TitleComponent,
    Button,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    CarpoolingBookingListTableComponent,
    RouterLink
  ],
  templateUrl: './carpooling-booking-list.component.html',
})
export class CarpoolingBookingListComponent{
  activeTabValue= 0;


}
