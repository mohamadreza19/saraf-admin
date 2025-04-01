import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoMutateComponent } from './crypto-mutate.component';

describe('CryptoMutateComponent', () => {
  let component: CryptoMutateComponent;
  let fixture: ComponentFixture<CryptoMutateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CryptoMutateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CryptoMutateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
