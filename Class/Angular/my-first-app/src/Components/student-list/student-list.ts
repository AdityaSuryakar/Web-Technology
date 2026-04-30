import { StudentServices } from '../../Services/student-services';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-list',
  imports: [],
  templateUrl: './student-list.html',
  styleUrl: './student-list.css',
})
export class StudentList implements OnInit {
Students : any[] = [];
// any :- means it can store any type of data , later this will hold student data from the services 

/**
 *
 */
constructor(private studentService : StudentServices  ) {
  //  lifecycle hook :- it is a method which is called when the component is created and destroyed
  // ngOnInit :- it is a lifecycle hook which is called when the component is created
}

ngOnInit() {
  this.Students = this.studentService.students;
  console.log(this.Students);
}
}


