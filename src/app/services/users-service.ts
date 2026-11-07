import { Service } from '@angular/core';
import { User } from '../models/user';

@Service()
export class UsersService {
  /**
   * Gets fake users. Every call returns new objects, as an HTTP call would.
   */
  getUsers(): User[] {
    return [
      { id: 1, name: 'Amelina Grindley' },
      { id: 2, name: 'Marlo Bains' },
      { id: 3, name: 'Astra Crampin' },
      { id: 4, name: 'Donavon Lismer' },
      { id: 5, name: 'Rennie Petri' },
      { id: 6, name: 'Stan Jacquet' },
    ];
  }
}
