import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IrBankAccountComponent } from './ir-bank-account.component';

describe('IrBankAccountComponent', () => {
  let component: IrBankAccountComponent;
  let fixture: ComponentFixture<IrBankAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IrBankAccountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IrBankAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
