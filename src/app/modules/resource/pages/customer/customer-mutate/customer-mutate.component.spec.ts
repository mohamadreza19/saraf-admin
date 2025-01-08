import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerMutateComponent } from './customer-mutate.component';

describe('CustomerMutateComponent', () => {
  let component: CustomerMutateComponent;
  let fixture: ComponentFixture<CustomerMutateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerMutateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerMutateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
