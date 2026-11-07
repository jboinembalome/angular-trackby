import { Component } from '@angular/core';
import { Users } from './components/users/users';

@Component({
  imports: [Users],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {}
