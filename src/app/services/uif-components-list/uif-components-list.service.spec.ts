import { TestBed } from '@angular/core/testing';

import { UifComponentsListService } from './uif-components-list.service';

describe('UifComponentsListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UifComponentsListService = TestBed.get(UifComponentsListService);
    expect(service).toBeTruthy();
  });
});
