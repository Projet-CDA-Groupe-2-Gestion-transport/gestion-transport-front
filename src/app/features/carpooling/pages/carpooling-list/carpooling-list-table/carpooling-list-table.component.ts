import {Component, computed, DestroyRef, inject, input, linkedSignal} from '@angular/core';
import {Button} from "primeng/button";
import {CapitalizePipe} from "../../../../../shared/pipes/string/capitalize.pipe";
import {DatePipe} from "@angular/common";
import {TableModule} from "primeng/table";
import {CarpoolingService} from '../../../../../core/services/carpooling.service';
import {takeUntilDestroyed, toSignal} from '@angular/core/rxjs-interop';
import {catchError, map, of} from 'rxjs';
import {Carpooling} from '../../../models/carpooling';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-carpooling-list-table',
    imports: [
        Button,
        CapitalizePipe,
        DatePipe,
        TableModule
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

  private readonly carpoolingResponseList = toSignal(this.#carpoolingSvc.getAllOrganisatorCarpooling(this.isArchived())
    .pipe(map((value) => ({
        value,
        error: undefined
      })),
      catchError((error) => of({value: undefined, error}))
    )
  );

  readonly loading = computed(() => !this.carpoolingResponseList());

  readonly carpoolingList = linkedSignal<Carpooling[] | undefined>(
    computed(() => this.carpoolingResponseList()?.value)
  );

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


  edit(id: number): void {
    this.#router.navigate(['/carpooling/edit', id]);
  }
}
