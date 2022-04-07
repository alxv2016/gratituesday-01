import {TestBed} from '@angular/core/testing';

import {SchemeServiceService} from './scheme-service.service';

describe('SchemeServiceService', () => {
  let service: SchemeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchemeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
