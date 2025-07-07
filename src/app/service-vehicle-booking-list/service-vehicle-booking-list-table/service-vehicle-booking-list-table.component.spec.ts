import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceVehicleBookingListTableComponent } from './service-vehicle-booking-list-table.component';

describe('ServiceVehicleBookingListTableComponent', () => {
  let component: ServiceVehicleBookingListTableComponent;
  let fixture: ComponentFixture<ServiceVehicleBookingListTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceVehicleBookingListTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceVehicleBookingListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
