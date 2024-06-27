import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { guardServiceGuard } from '../guard.service.guard';

describe('guardServiceGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => guardServiceGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
