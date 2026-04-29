import { Component } from '@angular/core';
import { StudentBindingComponent } from './pages/student-binding/student-binding';
import { StudentDirectivesComponent } from './pages/student-directives/student-directives';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [StudentBindingComponent, StudentDirectivesComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {}