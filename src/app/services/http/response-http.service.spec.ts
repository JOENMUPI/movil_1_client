import { TestBed } from '@angular/core/testing';

import { ResponseHttpService } from './response-http.service';

describe('ResponseHttpService', () => {
  let service: ResponseHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResponseHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
