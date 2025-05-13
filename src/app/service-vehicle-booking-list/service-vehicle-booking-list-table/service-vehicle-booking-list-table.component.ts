import { Component, computed, DestroyRef, effect, inject, input, linkedSignal, signal } from '@angular/core';
import { ServiceVehicleBookingService } from '../../core/services/service-vehicle-booking.service';
import { TableModule } from 'primeng/table';
import { Button } from 'primeng/button';
import { DatePipe } from '@angular/common';
import { CapitalizePipe } from '../../shared/pipes/string/capitalize.pipe';
import { ConfirmationService } from 'primeng/api';
import { ServiceVehicleBooking } from '../../features/service-vehicle/model/serviceVehicleBooking';
import { catchError, map, of } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ConfirmDialog } from 'primeng/confirmdialog';

@Component({
  selector: 'app-service-vehicle-booking-list-table',
  imports: [TableModule,
    Button,
    DatePipe,
    CapitalizePipe,
   ConfirmDialog],
  providers: [ConfirmationService],
  templateUrl: './service-vehicle-booking-list-table.component.html',
})
export class ServiceVehicleBookingListTableComponent {
  isArchived = input<boolean>(false);
  private readonly destroyRef = inject(DestroyRef);
  private readonly serviceVehicleBookingService = inject(ServiceVehicleBookingService);
  private readonly confirmationService = inject(ConfirmationService);

  protected readonly serviceVehicleBookingResponseList = signal<{
    value: ServiceVehicleBooking[] | undefined,
    error: string | undefined
  } | undefined>(undefined);

  readonly loading = computed(() => !this.serviceVehicleBookingResponseList());

  readonly serviceVehicleBookingList = linkedSignal<ServiceVehicleBooking[] | undefined>(
    computed(() => this.serviceVehicleBookingResponseList()?.value)
  );

  private readonly loadBookingsEffect = effect(() => {
    const archived = this.isArchived();
    this.serviceVehicleBookingService.getUserBookings(archived).pipe(
      map((value) => ({ value, error: undefined })),
      catchError((error) => of({ value: undefined, error })),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((result) => this.serviceVehicleBookingResponseList.set(result));
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
          error: (err) => console.error('Erreur lors de la suppression :', err)
        });
      }
    });
  }
}      