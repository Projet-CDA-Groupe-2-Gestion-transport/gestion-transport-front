import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TitleComponent } from '../../../../shared/components/title/title.component';
import { RouterModule } from '@angular/router';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from 'primeng/tabs';
import { ServiceVehicleBookingListTableComponent } from './service-vehicle-booking-list-table/service-vehicle-booking-list-table.component';
import {ButtonDirective} from 'primeng/button';


@Component({
  selector: 'app-service-vehicle-booking-list',
  imports: [ CommonModule,
    RouterModule, 
    TableModule,
    TitleComponent,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    ServiceVehicleBookingListTableComponent, ButtonDirective
  ],
  templateUrl: './service-vehicle-booking-list.component.html',
  styleUrl: './service-vehicle-booking-list.component.scss'
})
export class ServiceVehicleBookingListComponent  {
   activeTabValue= 0;

}
