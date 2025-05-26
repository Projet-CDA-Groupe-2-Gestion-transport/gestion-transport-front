import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarpoolingSearchComponent } from './carpooling-search.component';

describe('CarpoolingSearchComponent', () => {
  let component: CarpoolingSearchComponent;
  let fixture: ComponentFixture<CarpoolingSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarpoolingSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarpoolingSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
