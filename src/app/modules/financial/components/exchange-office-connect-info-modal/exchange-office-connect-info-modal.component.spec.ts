import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeOfficeConnectInfoModalComponent } from './exchange-office-connect-info-modal.component';

describe('ExchangeOfficeConnectInfoModalComponent', () => {
  let component: ExchangeOfficeConnectInfoModalComponent;
  let fixture: ComponentFixture<ExchangeOfficeConnectInfoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExchangeOfficeConnectInfoModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExchangeOfficeConnectInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
