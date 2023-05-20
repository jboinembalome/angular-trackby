import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSelectionList } from '@angular/material/list';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  @ViewChild('matUsers') matUsers?: MatSelectionList;
  
  users: User[] = [];

  constructor(private _usersService: UsersService) {}

  ngOnInit(): void {
    this.users = this._usersService.getUsers();
  }

  /**
   * Reset the user list.
   */
  resetUsers(): void {
    this.users = this._usersService.getUsers();
  }

  /**
   * Track by function for ngFor loops.
   * @param index
   * @param item
   */
  trackByFn(index: number, item: User): number {
    return item.id ?? index;
  }
}
