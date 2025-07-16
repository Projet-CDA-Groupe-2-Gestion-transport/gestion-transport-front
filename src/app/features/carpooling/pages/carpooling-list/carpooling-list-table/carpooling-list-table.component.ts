import {Component, computed, DestroyRef, effect, inject, input, linkedSignal, signal} from '@angular/core';
import {Button} from "primeng/button";
import {CapitalizePipe} from "../../../../../shared/pipes/string/capitalize.pipe";
import {DatePipe} from "@angular/common";
import {TableModule} from "primeng/table";
import {CarpoolingService} from '../../../../../core/services/carpooling.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {catchError, map, of} from 'rxjs';
import {Carpooling} from '../../../models/carpooling';
import {Router} from '@angular/router';
import {ConfirmationService, MessageService} from 'primeng/api';
import {ConfirmDialog} from 'primeng/confirmdialog';

@Component({
  selector: 'app-carpooling-list-table',
  imports: [
    Button,
    CapitalizePipe,
    DatePipe,
    TableModule,
    ConfirmDialog
  ],
  templateUrl: './carpooling-list-table.component.html',
  styleUrl: './carpooling-list-table.component.scss'
})
export class CarpoolingListTableComponent {

  isArchived = input<boolean>(false);
  readonly #carpoolingSvc = inject(CarpoolingService);
  readonly #router = inject(Router);
  readonly #destroyRef = inject(DestroyRef);
  readonly #messageSvc = inject(MessageService);
  readonly #confirmationService = inject(ConfirmationService);

  protected readonly carpoolingResponseList = signal<{
    value: Carpooling[] | undefined,
    error: string | undefined
  } | undefined>(undefined);

  readonly loading = computed(() => !this.carpoolingResponseList());

  readonly carpoolingList = linkedSignal<Carpooling[] | undefined>(
    computed(() => this.carpoolingResponseList()?.value)
  );

  constructor() {
    effect(() => {
      const archived = this.isArchived();
      this.#carpoolingSvc.getAllOrganisatorCarpooling(archived).pipe(
        map((value) => ({value, error: undefined})),
        catchError((error) => of({value: undefined, error})),
        takeUntilDestroyed(this.#destroyRef)
      ).subscribe((result) => this.carpoolingResponseList.set(result));
    });
  }

  confirmCancel(event: Event, idCarpooling: number) {
    this.#confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Etes-vous sûr de vouloir annuler ce covoiturage?',
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
        this.cancel(idCarpooling);
      },
    });
  }




  cancel(idCarpooling: number): void {
    this.#carpoolingSvc.deleteCarpooling(idCarpooling).pipe(takeUntilDestroyed(this.#destroyRef)).subscribe((): void => {
      const updatedCarpoolingList: Carpooling[] = this.carpoolingList()!.filter(carpooling => carpooling.id !== idCarpooling);
      this.carpoolingList.set(updatedCarpoolingList);
      this.#messageSvc.add({
        severity: 'success',
        summary: 'Annulation du covoiturage',
        icon: 'fa-solid fa-check'
      });
    });
  }

  goTo(id: number): void {
    this.#router.navigate(['/carpooling/', id]);
  }
}
