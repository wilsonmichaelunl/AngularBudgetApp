import { TestBed } from '@angular/core/testing';

import { BudgetapiService } from './budgetapi.service';

describe('BudgetapiService', () => {
  let service: BudgetapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BudgetapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
