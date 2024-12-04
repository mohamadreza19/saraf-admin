import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactCustomerComponent } from './contact-customer.component';

describe('ContactCustomerComponent', () => {
  let component: ContactCustomerComponent;
  let fixture: ComponentFixture<ContactCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactCustomerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
