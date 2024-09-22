import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialNotebooksComponent } from './financial-notebooks.component';

describe('FinancialNotebooksComponent', () => {
  let component: FinancialNotebooksComponent;
  let fixture: ComponentFixture<FinancialNotebooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinancialNotebooksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinancialNotebooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
