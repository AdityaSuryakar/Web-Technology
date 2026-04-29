import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-student-binding',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './student-binding.html',
  styleUrls: ['./student-binding.css']
})
export class StudentBindingComponent {

  studentName: string = "Sanika";
  studentAge: number = 20;
  course: string = "BCA";

  imageUrl: string = "https://cdn-icons-png.flaticon.com/512/2922/2922561.png";

  newStudent: string = "";
  students: string[] = [];

  showList: boolean = true;

  message: string = "";

  updateDetails() {
    this.studentName = "Priya";
    this.studentAge = 22;
    this.course = "MCA";

    this.message = "Student details updated successfully!";
  }

  addStudent() {
    if (this.newStudent.trim() !== "") {
      this.students.push(this.newStudent);
      this.newStudent = "";
    }
  }

  toggleList() {
    this.showList = !this.showList;
  }
}