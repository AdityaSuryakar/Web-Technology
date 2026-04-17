import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Home } from './home/home';
import { Student } from './student/student';
import { StudentList } from './student-list/student-list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Home , Student , StudentList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('student_management');
}
