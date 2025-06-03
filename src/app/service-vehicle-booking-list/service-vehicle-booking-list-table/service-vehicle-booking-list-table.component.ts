import { Component, computed, DestroyRef, effect, inject, input, linkedSignal, signal } from '@angular/core';
import { ServiceVehicleBookingService } from '../../core/services/service-vehicle-booking.service';
import { TableModule } from 'primeng/table';
import { Button } from 'primeng/button';
import { CommonModule, DatePipe } from '@angular/common';
import { CapitalizePipe } from '../../shared/pipes/string/capitalize.pipe';
import { ConfirmationService } from 'primeng/api';
import { ServiceVehicleBooking } from '../../features/service-vehicle/model/serviceVehicleBooking';
import { catchError, map, of } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ServiceVehicleService } from '../../core/services/service-vehicle.service';
import { ServiceVehicle } from '../../features/service-vehicle/model/serviceVehicle';
import { Router } from '@angular/router'; 


@Component({
  selector: 'app-service-vehicle-booking-list-table',
  imports: [TableModule,
    Button,
    CapitalizePipe,DatePipe,
    ConfirmDialog,
  CommonModule],
  providers: [ConfirmationService],
  templateUrl: './service-vehicle-booking-list-table.component.html',
})
export class ServiceVehicleBookingListTableComponent {

  isArchived = input<boolean>(false);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly serviceVehicleBookingService = inject(ServiceVehicleBookingService);
  private readonly serviceVehicleService = inject(ServiceVehicleService);
  private readonly confirmationService = inject(ConfirmationService);

  protected readonly serviceVehicleBookingResponseList = signal<{
    value: ServiceVehicleBooking[] | undefined,
    error: string | undefined
  } | undefined>(undefined);

  readonly loading = computed(() => !this.serviceVehicleBookingResponseList());

  readonly serviceVehicleBookingList = linkedSignal<ServiceVehicleBooking[] | undefined>(
    computed(() => this.serviceVehicleBookingResponseList()?.value)
  );

  selectedBooking: ServiceVehicleBooking | null = null;
  selectedVehicle: ServiceVehicle | null = null;

viewDetails(booking: ServiceVehicleBooking) {
    this.selectedBooking = booking;
    this.selectedVehicle = null; // Reset while loading
    this.serviceVehicleService.getServiceVehicleById(booking.licensePlateNumber).pipe(
      takeUntilDestroyed(this.destroyRef),
      catchError(err => {
        console.error('Erreur lors de la récupération du véhicule:', err);
        return of(null);
      })
    ).subscribe(vehicle => {
      this.selectedVehicle = vehicle;
    });
  }
modify (booking: ServiceVehicleBooking): void {
  this.router.navigate(['service-vehicle-booking', booking.id, 'edit'], {
    state: { booking }
  });
}
  isSelectedBooking(booking: ServiceVehicleBooking): boolean {
    return this.selectedBooking ? this.selectedBooking.id === booking.id : false;
  }

 private readonly loadBookingsEffect = effect(() => {
  const archived = this.isArchived();
  this.serviceVehicleBookingService.getUserBookings(archived).pipe(
    map((value) => ({ value, error: undefined })),
    catchError((error) => of({ value: undefined, error })),
    takeUntilDestroyed(this.destroyRef)
  ).subscribe((result) => {
    console.log('Réservations reçues (archived =', archived, '):', result);
    this.serviceVehicleBookingResponseList.set(result);
  });
});

  confirm(event: Event, bookingId: number) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Etes-vous sûr de vouloir annuler votre réservation?',
      header: 'Confirmation',
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Non',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Oui',
        severity: 'danger'
      },
      accept: () => {
        this.serviceVehicleBookingService.deleteBooking(bookingId).subscribe({
          next: () => {
            console.log(`Réservation ${bookingId} supprimée.`);
            this.serviceVehicleBookingService.getUserBookings(this.isArchived()).pipe(
              map((value) => ({ value, error: undefined })),
              catchError((error) => of({ value: undefined, error })),
              takeUntilDestroyed(this.destroyRef)
            ).subscribe((result) => this.serviceVehicleBookingResponseList.set(result));
          },
          error: (err) => console.error('Erreur lors de la suppression :', err)
        });
      }
    });
  }
     

 resetSelection() {
    this.selectedBooking = null;
    this.selectedVehicle = null;
  }
}