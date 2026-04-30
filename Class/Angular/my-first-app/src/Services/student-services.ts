import { Injectable } from '@angular/core';
import { get } from 'node:http';

@Injectable({
  providedIn: 'root',
})
export class StudentServices {
  students = [
    { id: 1, name: 'John Doe', age: 20 },
    { id: 2, name: 'Jane Smith', age: 22 },
    { id: 3, name: 'Michael Johnson', age: 19 },
  ];
 
  getStudents() {
    return this.students;
  }
}
