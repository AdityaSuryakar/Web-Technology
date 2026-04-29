import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-student',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-student.html',
  styleUrl: './list-student.css'
})
export class ListStudent {
  students = ['Priyanka', 'Pravin', 'Ayush', 'Akshay'];
}