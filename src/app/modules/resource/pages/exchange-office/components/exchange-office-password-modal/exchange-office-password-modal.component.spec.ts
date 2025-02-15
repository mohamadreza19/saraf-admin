import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeOfficePasswordModalComponent } from './exchange-office-password-modal.component';

describe('ExchangeOfficePasswordModalComponent', () => {
  let component: ExchangeOfficePasswordModalComponent;
  let fixture: ComponentFixture<ExchangeOfficePasswordModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExchangeOfficePasswordModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExchangeOfficePasswordModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
