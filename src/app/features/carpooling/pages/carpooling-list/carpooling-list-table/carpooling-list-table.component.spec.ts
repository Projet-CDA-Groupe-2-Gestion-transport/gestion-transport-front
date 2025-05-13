import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarpoolingListTableComponent } from './carpooling-list-table.component';

describe('CarpoolingListTableComponent', () => {
  let component: CarpoolingListTableComponent;
  let fixture: ComponentFixture<CarpoolingListTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarpoolingListTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarpoolingListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
