import {Component, computed, DestroyRef, inject, linkedSignal, OnInit, signal} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {DatePickerModule} from 'primeng/datepicker';
import {Button} from 'primeng/button';
import {CarpoolingService} from '../../../../core/services/carpooling.service';
import {minNumberFieldsRequired} from '../../../../core/validators/minNumberFieldsRequired';
import {TitleComponent} from '../../../../shared/components/title/title.component';
import {CapitalizePipe} from '../../../../shared/pipes/string/capitalize.pipe';
import {DatePipe, NgClass} from '@angular/common';
import {TableModule} from 'primeng/table';
import {Carpooling} from '../../models/carpooling';
import {map} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {ConfirmationService} from 'primeng/api';
import {ConfirmDialog} from 'primeng/confirmdialog';

@Component({
    selector: 'app-carpooling-search',
    imports: [
        InputTextModule,
        ReactiveFormsModule,
        DatePickerModule,
        Button,
        TitleComponent,
        CapitalizePipe,
        DatePipe,
        TableModule,
        NgClass,
        ConfirmDialog
    ],
    providers: [ConfirmationService],
    templateUrl: './carpooling-search.component.html',
    styleUrl: './carpooling-search.component.scss'
})
export class CarpoolingSearchComponent implements OnInit {

    form!: FormGroup;
    private readonly fb = inject(FormBuilder);
    private readonly carpoolingService = inject(CarpoolingService);
    private readonly destroyRef = inject(DestroyRef);
    private readonly confirmationService = inject(ConfirmationService);
    isSubmitted = signal<boolean>(false);

    protected readonly carpoolingResponseList = signal<{
        value: Carpooling[],
        error: string | undefined
    } | undefined>(undefined);

    readonly loading = signal<boolean>(false);

    readonly carpoolingList = linkedSignal<Carpooling[] | undefined>(
        computed(() => this.carpoolingResponseList()?.value)
    );

    ngOnInit() {
        this.initForm();
    }

    private initForm() {
        this.form = this.fb.group({
            departureAddress: [],
            arrivalAddress: [],
            dateTimeStart: []
        }, {validators: [minNumberFieldsRequired(['departureAddress', 'arrivalAddress', 'dateTimeStart'], 1)]});
    }

    search() {
        if (this.form.valid) {
            this.loading.set(true);
            this.isSubmitted.set(true);
            const params = this.form.getRawValue();
            if (params.dateTimeStart !== null) {
                params.dateTimeStart = params.dateTimeStart.toISOString().split('T')[0];
            } // A modifier avec le composant DatePicker encapsulé
            this.carpoolingService.search(params).pipe(
                map((value) => ({value, error: undefined})),
                takeUntilDestroyed(this.destroyRef)
            ).subscribe(
                {
                    next: (result) => {
                        this.carpoolingResponseList.set(result);
                        this.loading.set(false);
                    },
                    error: err => {
                        this.carpoolingResponseList.set({value: [], error: err.message});
                        this.loading.set(false);
                    }
                }
            )
            ;
        }
    }

    confirm(event: Event, carpoolingId: number) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Confirmez vous votre réservation pour ce covoiturage?',
            header: 'Confirmation',
            closable: true,
            closeOnEscape: true,
            icon: 'pi pi-check',
            rejectButtonProps: {
                label: 'Non',
                severity: 'secondary',
                outlined: true,
            },
            acceptButtonProps: {
                label: 'Oui',
                severity: 'primary'
            },
            accept: () => {
                this.carpoolingService.cancelUserBooking(carpoolingId).subscribe();
            },
        });
    }

}
