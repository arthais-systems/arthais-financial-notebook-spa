import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitmentCashFlowsComponent } from './commitment-cash-flows.component';

describe('CommitmentCashFlowsComponent', () => {
  let component: CommitmentCashFlowsComponent;
  let fixture: ComponentFixture<CommitmentCashFlowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommitmentCashFlowsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommitmentCashFlowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
