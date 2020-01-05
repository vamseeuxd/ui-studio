import { TestBed } from '@angular/core/testing';

import { ManageUifComponentsService } from './manage-uif-components.service';

describe('ManageUifComponentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManageUifComponentsService = TestBed.get(ManageUifComponentsService);
    expect(service).toBeTruthy();
  });
});
