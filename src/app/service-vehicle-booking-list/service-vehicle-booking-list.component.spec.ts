import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceVehicleBookingListComponent } from './service-vehicle-booking-list.component';

describe('ServiceVehicleBookingListComponent', () => {
  let component: ServiceVehicleBookingListComponent;
  let fixture: ComponentFixture<ServiceVehicleBookingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceVehicleBookingListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceVehicleBookingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
