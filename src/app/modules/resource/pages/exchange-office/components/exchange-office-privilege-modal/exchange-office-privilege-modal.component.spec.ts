import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeOfficePrivilegeModalComponent } from './exchange-office-privilege-modal.component';

describe('ExchangeOfficePrivilegeModalComponent', () => {
  let component: ExchangeOfficePrivilegeModalComponent;
  let fixture: ComponentFixture<ExchangeOfficePrivilegeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExchangeOfficePrivilegeModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExchangeOfficePrivilegeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
