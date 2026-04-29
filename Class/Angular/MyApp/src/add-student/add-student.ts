import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-student.html',
  styleUrls: ['./add-student.css']
})
export class AddStudent {
  student = { name: '', age: '', course: '' };
  students: any[] = [];

  addStudent() {
    if (this.student.name && this.student.age && this.student.course) {
      this.students.push({ ...this.student });
      this.student = { name: '', age: '', course: '' };
    }
  }
}