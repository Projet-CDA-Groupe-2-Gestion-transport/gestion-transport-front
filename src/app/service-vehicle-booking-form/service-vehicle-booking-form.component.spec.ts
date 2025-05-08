import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceVehicleBookingFormComponent } from './service-vehicle-booking-form.component';

describe('ServiceVehicleBookingFormComponent', () => {
  let component: ServiceVehicleBookingFormComponent;
  let fixture: ComponentFixture<ServiceVehicleBookingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceVehicleBookingFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceVehicleBookingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
