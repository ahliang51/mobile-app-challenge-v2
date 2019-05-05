import { TestBed } from '@angular/core/testing';

import { ERationService } from './e-ration.service';

describe('ERationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ERationService = TestBed.get(ERationService);
    expect(service).toBeTruthy();
  });
});
