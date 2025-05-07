import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarpoolingBookingListTableComponent } from './carpooling-booking-list-table.component';

describe('CarpoolingBookingListTableComponent', () => {
  let component: CarpoolingBookingListTableComponent;
  let fixture: ComponentFixture<CarpoolingBookingListTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarpoolingBookingListTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarpoolingBookingListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
