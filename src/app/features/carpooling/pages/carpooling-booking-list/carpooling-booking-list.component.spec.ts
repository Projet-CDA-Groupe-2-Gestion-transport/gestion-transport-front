import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarpoolingBookingListComponent } from './carpooling-booking-list.component';

describe('CarpoolingBookingListComponent', () => {
  let component: CarpoolingBookingListComponent;
  let fixture: ComponentFixture<CarpoolingBookingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarpoolingBookingListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarpoolingBookingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
