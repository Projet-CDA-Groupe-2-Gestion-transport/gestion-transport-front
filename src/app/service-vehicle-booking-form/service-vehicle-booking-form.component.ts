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
import { toLocalDateTime } from '../shared/utils/date-utils';
import { ActivatedRoute } from '@angular/router'; 

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
    private formbuilder: FormBuilder,
     private route: ActivatedRoute
  ) { }

  isEditMode = false;
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
  this.isEditMode = !!id;

    this.vehicleService.getAllServiceVehicle().subscribe((data: ServiceVehicle[]) => {
      this.serviceVehicles = data;
      console.log(this.serviceVehicles)
    });
    this.form = this.formbuilder.group({ licensePlateNumber: [null], dateTimeStart: [null], dateTimeEnd: [null]})

if (this.isEditMode && id) {
    this.bookingService.getBookingByBookingId(+id).subscribe((booking: ServiceVehicleBooking) => {
      this.booking = booking;
      this.form.patchValue({
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

  const booking: Omit<ServiceVehicleBooking, 'id'> = {
    userId: 0, 
    dateTimeStart: dateStart,
    dateTimeEnd: dateEnd,
    licensePlateNumber: formValue.licensePlateNumber
  };

  this.bookingService.createBooking(booking).subscribe({
    next: (createdBooking) => {
      console.log("Réservation créée :", createdBooking);
      this.form.reset();
    },
     error: (error) => {
      console.error("Erreur lors de la création de la réservation :", error);

    }
  });
}

}


