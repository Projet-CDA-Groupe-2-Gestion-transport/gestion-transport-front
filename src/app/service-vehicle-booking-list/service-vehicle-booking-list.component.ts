import { Component, OnInit } from '@angular/core';
import { ServiceVehicleBookingService } from '../core/services/service-vehicle-booking.service';
import { ServiceVehicleBooking } from '../features/service-vehicle/model/serviceVehicleBooking';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-service-vehicle-booking-list',
  imports: [CommonModule],
  templateUrl: './service-vehicle-booking-list.component.html',
  styleUrl: './service-vehicle-booking-list.component.scss'
})
export class ServiceVehicleBookingListComponent implements OnInit {
  bookings: ServiceVehicleBooking[] = [];

  constructor(private bookingService: ServiceVehicleBookingService) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    this.bookingService.getAllBookings().subscribe((data) => {
      this.bookings = data;
    });
  }

  deleteBooking(id: number): void {
    this.bookingService.deleteBooking(id).subscribe(() => {
      this.loadBookings();
    });
  }
}
