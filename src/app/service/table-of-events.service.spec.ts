import { TestBed } from '@angular/core/testing';

import { TableOfEventsService } from './table-of-events.service';

describe('TableOfEventsService', () => {
  let service: TableOfEventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableOfEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
