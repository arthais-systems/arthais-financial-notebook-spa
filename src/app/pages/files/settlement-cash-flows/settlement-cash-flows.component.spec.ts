import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettlementCashFlowsComponent } from './settlement-cash-flows.component';

describe('SettlementCashFlowsComponent', () => {
  let component: SettlementCashFlowsComponent;
  let fixture: ComponentFixture<SettlementCashFlowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettlementCashFlowsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettlementCashFlowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
