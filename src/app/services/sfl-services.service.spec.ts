import { TestBed } from '@angular/core/testing';

import { SflServicesService } from './sfl-services.service';

describe('SflServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SflServicesService = TestBed.get(SflServicesService);
    expect(service).toBeTruthy();
  });
});
