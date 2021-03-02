import { TestBed } from '@angular/core/testing';

import { TypeInputHttpService } from './type-input-http.service';

describe('TypeInputHttpService', () => {
  let service: TypeInputHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeInputHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
