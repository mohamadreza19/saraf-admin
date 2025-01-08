import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeMutateComponent } from './employee-mutate.component';

describe('EmployeeMutateComponent', () => {
  let component: EmployeeMutateComponent;
  let fixture: ComponentFixture<EmployeeMutateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeMutateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeMutateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
