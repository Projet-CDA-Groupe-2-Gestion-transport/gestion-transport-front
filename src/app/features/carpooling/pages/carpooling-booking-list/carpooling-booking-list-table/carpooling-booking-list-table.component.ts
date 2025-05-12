import {Component, computed, DestroyRef, effect, inject, input, linkedSignal, signal} from '@angular/core';
import {TableModule} from 'primeng/table';
import {Button} from 'primeng/button';
import {CarpoolingService} from '../../../../../core/services/carpooling.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {catchError, map, of} from 'rxjs';
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

    private readonly destroyRef = inject(DestroyRef);
    private readonly carpoolingService = inject(CarpoolingService);
    private readonly confirmationService = inject(ConfirmationService);

    protected readonly carpoolingResponseList = signal<{
        value: CarpoolingBooking[] | undefined,
        error: string | undefined
    } | undefined>(undefined);

    readonly loading = computed(() => !this.carpoolingResponseList());

    readonly carpoolingList = linkedSignal<CarpoolingBooking[] | undefined>(
        computed(() => this.carpoolingResponseList()?.value)
    );

    private readonly loadBookingsEffect = effect(() => {
        const archived = this.isArchived();
        this.carpoolingService.getUserBooking(archived).pipe(
            map((value) => ({value, error: undefined})),
            catchError((error) => of({value: undefined, error})),
            takeUntilDestroyed(this.destroyRef)
        ).subscribe((result) => this.carpoolingResponseList.set(result));
    });

    confirm(event: Event, carpoolingId: number) {
        this.confirmationService.confirm({
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
                this.carpoolingService.cancelUserBooking(carpoolingId).subscribe();
            },
        });
    }
}
