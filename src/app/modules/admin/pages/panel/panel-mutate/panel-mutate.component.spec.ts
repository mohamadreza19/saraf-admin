import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelMutateComponent } from './panel-mutate.component';

describe('PanelMutateComponent', () => {
  let component: PanelMutateComponent;
  let fixture: ComponentFixture<PanelMutateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelMutateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelMutateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
