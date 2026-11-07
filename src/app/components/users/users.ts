import { Component, inject, signal } from '@angular/core';
import { User } from '../../models/user';
import { UsersService } from '../../services/users-service';

@Component({
  selector: 'app-users',
  styleUrl: './users.scss',
  templateUrl: './users.html',
})
export class Users {
  private readonly usersService = inject(UsersService);
  private nextId = 7;

  protected readonly users = signal<User[]>(this.usersService.getUsers());

  /**
   * Reloads the same users as new objects, like a refresh from an API.
   */
  protected refresh(): void {
    this.users.set(this.usersService.getUsers());
  }

  /**
   * Adds a new user at the top of the list. The other users keep their objects.
   */
  protected addFirst(): void {
    this.users.update((users) => [{ id: this.nextId++, name: 'Rosa Quill' }, ...users]);
  }

  protected clear(): void {
    this.users.set([]);
  }
}
