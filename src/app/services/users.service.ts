import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  /**
   * Get fake users.
   */
  getUsers(): User[] {
    return [
      {
        id: 1,
        name: 'Amelina Grindley',
      },
      {
        id: 2,
        name: 'Marlo Bains',
      },
      {
        id: 3,
        name: 'Astra Crampin',
      },
      {
        id: 4,
        name: 'Donavon Lismer',
      },
      {
        id: 5,
        name: 'Rennie Petri',
      },
      {
        id: 6,
        name: 'Stan Jacquet',
      },
    ];
  }
}
