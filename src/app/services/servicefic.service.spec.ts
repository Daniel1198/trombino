import { TestBed } from '@angular/core/testing';

import { ServiceficService } from './servicefic.service';

describe('ServiceficService', () => {
  let service: ServiceficService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceficService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
