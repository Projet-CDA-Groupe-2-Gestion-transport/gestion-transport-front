import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceVehicleComponent } from './service-vehicle.component';

describe('ServiceVehicleComponent', () => {
  let component: ServiceVehicleComponent;
  let fixture: ComponentFixture<ServiceVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceVehicleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
