import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin.html'
})
export class Admin {
  fname: string = '';
  lname: string = '';
  email: string = '';
  age: number = 0;
  number: string = '';

  submitted: boolean = false;
  message: string = '';

  showData() {
    this.submitted = true;
    this.message = `
      ${this.fname} ${this.lname}, Email: ${this.email}, Age: ${this.age}, Phone: ${this.number}
    `;
  }
}