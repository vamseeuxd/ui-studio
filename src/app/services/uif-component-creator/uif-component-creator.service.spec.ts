import { TestBed } from '@angular/core/testing';

import { UifComponentCreatorService } from './uif-component-creator.service';

describe('UifComponentCreatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UifComponentCreatorService = TestBed.get(UifComponentCreatorService);
    expect(service).toBeTruthy();
  });
});
