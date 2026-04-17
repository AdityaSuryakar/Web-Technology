import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  standalone: true,                 
  imports: [FormsModule],           
  templateUrl: './admin.html',
  styleUrls: ['./admin.css'],       
})
export class Admin {
  fname = 'Admin';
  name = '';                       
  age: number = 0;

  changeName() {
    this.fname = this.name;        
  }
}

