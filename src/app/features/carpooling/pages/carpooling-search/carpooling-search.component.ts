import {Component, computed, DestroyRef, inject, linkedSignal, OnDestroy, OnInit, signal} from '@angular/core';
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
import {map, tap} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {ConfirmationService} from 'primeng/api';
import {ConfirmDialog} from 'primeng/confirmdialog';
import {ModalConfirmBookingComponent} from '../../components/modal-confirm-booking/modal-confirm-booking.component';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {Tooltip} from 'primeng/tooltip';

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
    ConfirmDialog,
    Tooltip,
  ],
  templateUrl: './carpooling-search.component.html',
  styleUrl: './carpooling-search.component.scss'
})
export class CarpoolingSearchComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  modalRef: DynamicDialogRef | undefined;
  private readonly fb = inject(FormBuilder);
  private readonly carpoolingService = inject(CarpoolingService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly dialogService = inject(DialogService);
  protected readonly Date = Date;
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

  ngOnDestroy() {
    if (this.modalRef) {
      this.modalRef.close();
    }
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

  openModalsaveBooking(event: Event, carpooling: Carpooling) {
    console.log(carpooling)
    if (carpooling.id === null) {
      return;
    }
    this.modalRef = this.dialogService.open(ModalConfirmBookingComponent, {
      data: {
        carpooling
      }
    })

    this.modalRef.onClose.subscribe((result) => {
      if (result) {
        console.log('Modal fermée avec résultat:', result);
      }
    });
  }

  cancelBooking(event: Event, carpooling: Carpooling) {
    if (!carpooling.id) {
      return;
    }
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Confirmez vous l\'annulation de votre réservation pour ce covoiturage?',
      header: 'Annulation',
      closable: true,
      closeOnEscape: true,
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
        this.carpoolingService.cancelUserBooking(carpooling.id!)
          .pipe(
            takeUntilDestroyed(this.destroyRef),
            tap(() => {
              carpooling.hasBooked = false;
            })
          ).subscribe();
      },
    });
  }
}
