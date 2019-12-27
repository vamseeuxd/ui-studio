import { TestBed } from '@angular/core/testing';

import { ManageUifGroupsService } from './manage-uif-groups.service';

describe('ManageUifComponentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManageUifGroupsService = TestBed.get(ManageUifGroupsService);
    expect(service).toBeTruthy();
  });
});
