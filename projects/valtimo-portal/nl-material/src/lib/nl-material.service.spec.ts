import { TestBed } from '@angular/core/testing';

import { NlMaterialService } from './nl-material.service';

describe('NlMaterialService', () => {
  let service: NlMaterialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NlMaterialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
