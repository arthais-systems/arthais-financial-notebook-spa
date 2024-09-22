import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmimissionsComponent } from './submimissions.component';

describe('SubmimissionComponent', () => {
  let component: SubmimissionsComponent;
  let fixture: ComponentFixture<SubmimissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmimissionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmimissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
