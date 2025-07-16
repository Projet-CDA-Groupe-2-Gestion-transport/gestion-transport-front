import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceVehicleBookingService } from '../../../../core/services/service-vehicle-booking.service';
import { ServiceVehicleBooking } from '../../model/serviceVehicleBooking';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-service-vehicle-booking-detail',
  imports: [CommonModule],
  templateUrl: './service-vehicle-booking-detail.component.html',
  styleUrl: './service-vehicle-booking-detail.component.scss'
})
export class ServiceVehicleBookingDetailComponent implements OnInit {
  serviceVehicleBooking?: ServiceVehicleBooking;

  constructor(
    private route: ActivatedRoute,
    private serviceVehicleBookingService: ServiceVehicleBookingService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.serviceVehicleBookingService.getBookingByBookingId(id).subscribe(data => {
      this.serviceVehicleBooking = data;
    });
  }
}
