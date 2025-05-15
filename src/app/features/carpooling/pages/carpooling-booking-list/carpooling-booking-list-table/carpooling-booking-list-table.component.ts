import {Component, computed, DestroyRef, inject, input, linkedSignal} from '@angular/core';
import {TableModule} from 'primeng/table';
import {Button} from 'primeng/button';
import {CarpoolingService} from '../../../../../core/services/carpooling.service';
import {takeUntilDestroyed, toObservable, toSignal} from '@angular/core/rxjs-interop';
import {catchError, distinctUntilChanged, map, of, switchMap} from 'rxjs';
import {DatePipe} from '@angular/common';
import {CapitalizePipe} from '../../../../../shared/pipes/string/capitalize.pipe';
import {ConfirmationService} from 'primeng/api';
import {ConfirmDialog} from 'primeng/confirmdialog';
import {CarpoolingBooking} from "../../../models/carpooling-booking.model";

@Component({
    selector: 'app-carpooling-booking-list-table',
    imports: [
        TableModule,
        Button,
        DatePipe,
        CapitalizePipe,
        ConfirmDialog
    ],
    providers: [ConfirmationService],
    templateUrl: './carpooling-booking-list-table.component.html',
})
export class CarpoolingBookingListTableComponent {

    isArchived = input<boolean>(false);

    readonly #destroyRef = inject(DestroyRef);
    readonly #carpoolingService = inject(CarpoolingService);
    readonly #confirmationService = inject(ConfirmationService);


  private readonly carpoolingResponseList = toSignal(
    toObservable(this.isArchived).pipe(
      distinctUntilChanged(),
      switchMap((archived) =>
        this.#carpoolingService.getUserBooking(archived).pipe(
          map((value : CarpoolingBooking[] | undefined) => ({ value, error: undefined })),
          catchError((error:  string | undefined) => of({ value: undefined, error }))
        )
      )
    )
  );

    readonly loading = computed(() => !this.carpoolingResponseList());

    readonly carpoolingList = linkedSignal<CarpoolingBooking[] | undefined>(
        computed(() => this.carpoolingResponseList()?.value)
    );


    confirm(event: Event, carpoolingId: number) {
        this.#confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Etes-vous sûr de vouloir annuler votre participation à ce covoiturage?',
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
                this.#carpoolingService.cancelUserBooking(carpoolingId).pipe(takeUntilDestroyed(this.#destroyRef)).subscribe(() => {
                    this.carpoolingList.set(this.carpoolingList()!.filter(carpoolingBooking => carpoolingBooking.id !== carpoolingId));
                });
            },
        });
    }
}
