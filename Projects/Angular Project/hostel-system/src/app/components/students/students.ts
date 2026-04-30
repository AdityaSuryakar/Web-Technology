import { Component } from '@angular/core';
import { HostelService } from '../../services/hostel';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './students.html'
})
export class Students {

  students: any[] = [];

  constructor(private hostel: HostelService) {
    this.students = this.hostel.getStudents();
  }
}