import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapInputComponent } from './map-input.component';

describe('MapInputComponent', () => {
  let component: MapInputComponent;
  let fixture: ComponentFixture<MapInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
