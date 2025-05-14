import {Component, OnInit} from '@angular/core';
import { ServiceVehicleBookingService } from '../core/services/service-vehicle-booking.service';
import { ServiceVehicleBooking, initServiceVehicleBooking } from '../features/service-vehicle/model/serviceVehicleBooking';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ServiceVehicle } from '../features/service-vehicle/model/serviceVehicle';
import { TitleComponent } from "../shared/components/title/title.component";
import { Select } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import {ServiceVehicleService} from '../core/services/service-vehicle.service';
import { addHours } from '../shared/utils/date-utils'; 

@Component({
  selector: 'app-service-vehicle-booking-form',
  imports: [CommonModule, ReactiveFormsModule, TitleComponent, Select, DatePickerModule],
  templateUrl: './service-vehicle-booking-form.component.html',
  styleUrl: './service-vehicle-booking-form.component.scss'
})
export class ServiceVehicleBookingFormComponent implements OnInit{
  booking: ServiceVehicleBooking = initServiceVehicleBooking();
  serviceVehicles: ServiceVehicle[] = [];
  form!: FormGroup;
  constructor(
    private bookingService: ServiceVehicleBookingService,
    private vehicleService: ServiceVehicleService, // Ajoute l'injection du service des véhicules
    private formbuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.vehicleService.getAllServiceVehicle().subscribe((data: ServiceVehicle[]) => {
      this.serviceVehicles = data;
      console.log(this.serviceVehicles)
    });
    this.form = this.formbuilder.group({ licensePlateNumber: [null], dateTimeStart: [null], dateTimeEnd: [null]})

  }
  submitBooking(): void {
    console.log(this.form.getRawValue())
   const timeZone = 'Europe/Paris';
    if (this.form.valid) {
    const formValue = this.form.getRawValue();

    const updatedStart = addHours(formValue.dateTimeStart, 2, timeZone);
    const updatedEnd = addHours(formValue.dateTimeEnd, 2, timeZone);

    const booking: ServiceVehicleBooking = {
      id: 0,
      userId: 0,
      dateTimeStart: updatedStart,
      dateTimeEnd: updatedEnd,
      licensePlateNumber: formValue.licensePlateNumber
    };

    this.bookingService.createBooking(booking).subscribe();
  }
}
}
