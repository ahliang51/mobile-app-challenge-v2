import { TestBed } from '@angular/core/testing';

import { EParadeService } from './e-parade.service';

describe('EParadeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EParadeService = TestBed.get(EParadeService);
    expect(service).toBeTruthy();
  });
});
