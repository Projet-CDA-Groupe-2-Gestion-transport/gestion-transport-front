import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceVehicleBookingDetailComponent } from './service-vehicle-booking-detail.component';

describe('ServiceVehicleBookingDetailComponent', () => {
  let component: ServiceVehicleBookingDetailComponent;
  let fixture: ComponentFixture<ServiceVehicleBookingDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceVehicleBookingDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceVehicleBookingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
