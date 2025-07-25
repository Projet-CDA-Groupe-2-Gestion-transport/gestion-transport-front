import {Component, OnInit} from '@angular/core';
import { ServiceVehicleBookingService } from '../../../../core/services/service-vehicle-booking.service';
import { ServiceVehicleBooking,initServiceVehicleBooking } from '../../model/serviceVehicleBooking';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ServiceVehicle } from '../../../service-vehicle/model/serviceVehicle';
import { TitleComponent } from '../../../../shared/components/title/title.component';
import { Select } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { ServiceVehicleService } from '../../../../core/services/service-vehicle.service';
import { toLocalDateTime } from '../../../../shared/utils/date-utils';
import { ActivatedRoute } from '@angular/router';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-service-vehicle-booking-form',
  imports: [CommonModule, ReactiveFormsModule, TitleComponent, Select, DatePickerModule, Button],
  templateUrl: './service-vehicle-booking-form.component.html',
  styleUrl: './service-vehicle-booking-form.component.scss'
})
export class ServiceVehicleBookingFormComponent implements OnInit{
  booking: ServiceVehicleBooking = initServiceVehicleBooking();
  serviceVehicles: ServiceVehicle[] = [];
  form!: FormGroup;
  constructor(
    private bookingService: ServiceVehicleBookingService,
    private vehicleService: ServiceVehicleService, 
    private formbuilder: FormBuilder,
     private route: ActivatedRoute
  ) { }

  isEditMode = false;
 ngOnInit(): void {
  const id = this.route.snapshot.paramMap.get('id');
  this.isEditMode = !!id;

  this.form = this.formbuilder.group({
    id: [null],  
    licensePlateNumber: [null],
    dateTimeStart: [null],
    dateTimeEnd: [null]
  });

    this.vehicleService.getAllServiceVehicle().subscribe({
    next: (vehicles: ServiceVehicle[]) => {
      this.serviceVehicles = vehicles;
    },
    error: (error) => {
      console.error("Erreur lors du chargement des véhicules :", error);
    }
  });

  if (this.isEditMode && id) {
    this.bookingService.getBookingByBookingId(+id).subscribe((booking: ServiceVehicleBooking) => {
      this.booking = booking;
      this.form.patchValue({
        id: booking.id,  
        licensePlateNumber: booking.licensePlateNumber,
        dateTimeStart: new Date(booking.dateTimeStart),
        dateTimeEnd: new Date(booking.dateTimeEnd)
      });
    });
  }
}

isSubmitted = false;

submitBooking(): void {
  const formValue = this.form.getRawValue();
  console.log('Données du formulaire :', formValue);

  if (!formValue.dateTimeStart || !formValue.dateTimeEnd) {
    return;
  }

  const rawDateStart = new Date(formValue.dateTimeStart);
  const rawDateEnd = new Date(formValue.dateTimeEnd);

  const dateStart = toLocalDateTime(rawDateStart);
  const dateEnd = toLocalDateTime(rawDateEnd);

  const booking: ServiceVehicleBooking = {
    id: formValue.id,
    userId: formValue.userId || 0,
    dateTimeStart: dateStart,
    dateTimeEnd: dateEnd,
    licensePlateNumber: formValue.licensePlateNumber
  };

  if (booking.id) {
    this.bookingService.updateBooking(booking.id, booking).subscribe({
      next: (updatedBooking) => {
        console.log("Réservation mise à jour :", updatedBooking);
        this.form.reset();
      },
      error: (error) => {
        console.error("Erreur lors de la mise à jour :", error);
      }
    });
  } else {
    this.bookingService.createBooking(booking).subscribe({
      next: (createdBooking) => {
        console.log("Réservation créée :", createdBooking);
        this.form.reset();
      },
      error: (error) => {
        console.error("Erreur lors de la création :", error);
      }
    });
  }
}
}


