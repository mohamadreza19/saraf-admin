/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PanelRevivalService } from './panel-revival-api.service';

describe('Service: PanelRevival', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PanelRevivalService],
    });
  });

  it('should ...', inject([PanelRevivalService], (service: PanelRevivalService) => {
    expect(service).toBeTruthy();
  }));
});
