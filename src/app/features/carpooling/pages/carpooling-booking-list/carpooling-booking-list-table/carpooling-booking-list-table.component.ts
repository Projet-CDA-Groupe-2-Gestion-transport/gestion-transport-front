import {Component, computed, DestroyRef, effect, inject, input, linkedSignal, OnInit, signal} from '@angular/core';
import {TableModule} from 'primeng/table';
import {Button} from 'primeng/button';
import {CarpoolingService} from '../../../../../core/services/carpooling.service';
import {takeUntilDestroyed, toSignal} from '@angular/core/rxjs-interop';
import {catchError, map, of} from 'rxjs';
import {Carpooling} from '../../../models/Carpooling.model';
import {DatePipe} from '@angular/common';
import {CapitalizePipe} from '../../../../../shared/pipes/string/capitalize.pipe';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-carpooling-booking-list-table',
  imports: [
    TableModule,
    Button,
    DatePipe,
    CapitalizePipe
  ],
  templateUrl: './carpooling-booking-list-table.component.html',
})
export class CarpoolingBookingListTableComponent{

  isArchived = input<boolean>(false);
  private readonly destroyRef = inject(DestroyRef);

  private readonly carpoolingService = inject(CarpoolingService);

  protected readonly carpoolingResponseList = signal<{ value: Carpooling[] | undefined, error: any } | undefined>(undefined);

  readonly loading = computed(() => !this.carpoolingResponseList());

  readonly carpoolingList = linkedSignal<Carpooling[] | undefined>(
    computed(() => this.carpoolingResponseList()?.value)
  );

  private readonly loadBookingsEffect = effect(() => {
    const archived = this.isArchived();
    this.carpoolingService.getUserBooking(archived).pipe(
      map((value) => ({ value, error: undefined })),
      catchError((error) => of({ value: undefined, error })),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((result) => this.carpoolingResponseList.set(result));
  });
}
