import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // Interpolation example
  courseName: string = 'Angular Web Technology';

  // Property Binding example
  isButtonDisabled: boolean = true;
  imageUrl: string = 'https://angular.io/assets/images/logos/angular/angular.svg';

  // Event Binding example
  clickCount: number = 0;

  onButtonClick(): void {
    this.clickCount++;
  }

  // Two-way Binding example
  userName: string = 'John Doe';
}
