import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitmentSchedulesComponent } from './commitment-schedules.component';

describe('CommitmentSchedulesComponent', () => {
  let component: CommitmentSchedulesComponent;
  let fixture: ComponentFixture<CommitmentSchedulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommitmentSchedulesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommitmentSchedulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
