import { TestBed } from '@angular/core/testing';

import { RoleManagementService } from './role-management.service';

describe('RoleManagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoleManagementService = TestBed.get(RoleManagementService);
    expect(service).toBeTruthy();
  });
});
