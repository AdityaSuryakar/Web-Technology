import { Admin } from './../admin/admin';

import { Component, signal } from '@angular/core';
import { RouterEvent, RouterLink, RouterOutlet } from '@angular/router';
import { StudentList } from '../Components/student-list/student-list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet , RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('my-first-app');
  
}
