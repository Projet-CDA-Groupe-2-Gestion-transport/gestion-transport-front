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
    alert("La date de début et la date de fin doivent être mentionnées.");
    return;
  }

  const rawDateStart = new Date(formValue.dateTimeStart);
  const rawDateEnd = new Date(formValue.dateTimeEnd);


  if (rawDateEnd < rawDateStart) {
    alert("La date de fin ne peut pas être antérieure à la date de départ.");
    return;
  }

  const dateStart = toLocalDateTime(rawDateStart);
  const dateEnd = toLocalDateTime(rawDateEnd);

  const booking: Omit<ServiceVehicleBooking, 'id'> = {
    userId: 0 ,
    dateTimeStart: dateStart,
    dateTimeEnd: dateEnd,
    licensePlateNumber: formValue.licensePlateNumber
  };

  // Vérifie s'il y a un chevauchement
  this.bookingService.getBookingsByVehicleId(formValue.licensePlateNumber).subscribe({
    next: (existingBookings: ServiceVehicleBooking[]) => {
      const hasConflict = existingBookings.some(existing => {
        // ✅ En mode édition, ignorer la réservation actuelle
        if (this.isEditMode && existing.id === this.booking.id) {
          return false;
        }

        const existingStart = new Date(existing.dateTimeStart);
        const existingEnd = new Date(existing.dateTimeEnd);


        return rawDateStart < existingEnd && rawDateEnd > existingStart;
      });

      if (hasConflict) {
        alert("Il y a déjà une réservation en cours pour ce véhicule aux dates choisies.");
        return;
      }


    const save$ = this.isEditMode && this.booking.id !== undefined
  ? this.bookingService.updateBooking(this.booking.id, { ...booking, id: this.booking.id })
  : this.bookingService.createBooking(booking);

      save$.subscribe({
        next: () => {
          this.isSubmitted = true;
          alert('Réservation effectuée avec succès.');
          this.form.reset();
          // ✅ Redirection Angular (recommandé)
          window.location.href = 'service-vehicle-booking/list';
          // ou utilisez le routeur : this.router.navigate(['/liste-reservations']);
        },
        error: (err) => {
          console.error('Erreur lors de la réservation:', err);
          alert('Une erreur est survenue, veuillez réessayer.');
        }
      });
    },
    error: (err) => {
      console.error('Erreur lors de la vérification des conflits de réservation:', err);
      alert("Impossible de vérifier les disponibilités. Veuillez réessayer.");
    }
  });
}
}

