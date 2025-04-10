import { TestBed } from '@angular/core/testing';

import { SalesPerosnsService } from './sales-perosns.service';

describe('SalesPerosnsService', () => {
  let service: SalesPerosnsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalesPerosnsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
