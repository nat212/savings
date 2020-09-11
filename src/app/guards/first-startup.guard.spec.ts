import { TestBed } from '@angular/core/testing';

import { FirstStartupGuard } from './first-startup.guard';

describe('FirstStartupGuard', () => {
  let guard: FirstStartupGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(FirstStartupGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
