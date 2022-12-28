import { TestBed } from '@angular/core/testing';

import { NumeroutileService } from './numeroutile.service';

describe('NumeroutileService', () => {
  let service: NumeroutileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NumeroutileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
