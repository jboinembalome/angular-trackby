import { TestBed } from '@angular/core/testing';
import { UsersService } from './users-service';

describe('UsersService', () => {
  it('should return new objects on every call', () => {
    const service = TestBed.inject(UsersService);

    const first = service.getUsers();
    const second = service.getUsers();

    expect(second).toEqual(first);
    expect(second[0]).not.toBe(first[0]);
  });
});
