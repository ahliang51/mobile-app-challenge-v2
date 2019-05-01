import { TestBed } from '@angular/core/testing';

import { EApplicationService } from './e-application.service';

describe('EApplicationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EApplicationService = TestBed.get(EApplicationService);
    expect(service).toBeTruthy();
  });
});
