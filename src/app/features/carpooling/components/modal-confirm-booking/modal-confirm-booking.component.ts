import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {Button} from 'primeng/button';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {Carpooling} from '../../models/carpooling';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Observable, tap} from 'rxjs';
import {CarpoolingService} from '../../../../core/services/carpooling.service';
import {AsyncPipe, DatePipe} from '@angular/common';
import {User} from '../../models/user';

@Component({
  selector: 'app-modal-confirm-booking',
  imports: [
    Button,
    DatePipe,
    AsyncPipe
  ],
  templateUrl: './modal-confirm-booking.component.html'
})
export class ModalConfirmBookingComponent implements OnInit {

  modalRef = inject(DynamicDialogRef);
  config = inject(DynamicDialogConfig);
  carpoolingService = inject(CarpoolingService);
  private readonly destroyRef = inject(DestroyRef);
  carpooling!: Carpooling;
  participants$!: Observable<User[]>;

  ngOnInit() {
    this.carpooling = this.config.data.carpooling;
    this.participants$ = this.carpoolingService.getCarpoolingParticipantList(this.carpooling.id!);
  }

  confirm() {
    this.carpoolingService.saveUserBooking(this.carpooling.id!)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap(() => {
          this.close();
          this.carpooling.hasBooked = true;
        })
      ).subscribe();
  }

  protected close(): void {
    this.modalRef.close();
  };
}
