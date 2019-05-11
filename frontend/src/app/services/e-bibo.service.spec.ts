import { TestBed } from '@angular/core/testing';

import { EBiboService } from './e-bibo.service';

describe('EBiboService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EBiboService = TestBed.get(EBiboService);
    expect(service).toBeTruthy();
  });
});
