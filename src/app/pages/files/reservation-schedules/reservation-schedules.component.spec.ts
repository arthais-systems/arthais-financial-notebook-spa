import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationSchedulesComponent } from './reservation-schedules.component';

describe('ReservationSchedulesComponent', () => {
  let component: ReservationSchedulesComponent;
  let fixture: ComponentFixture<ReservationSchedulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationSchedulesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationSchedulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
