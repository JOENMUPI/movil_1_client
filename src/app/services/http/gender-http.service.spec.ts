import { TestBed } from '@angular/core/testing';

import { GenderHttpService } from './gender-http.service';

describe('GenderHttpService', () => {
  let service: GenderHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenderHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
