import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Admin } from './admin/admin';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Admin],
  templateUrl: './app.html',
  styleUrl: './app.css'
})


export class App {
  protected readonly title = signal('MyFirstApp');

}

