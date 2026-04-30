import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HostelService } from '../../services/hostel';

@Component({
  selector: 'app-allocate',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './allocate.html'
})
export class Allocate {

  name = '';
  roomNumber: number = 0;

  constructor(private hostel: HostelService) {}

  allocate() {
    const success = this.hostel.allocateRoom(this.name, this.roomNumber);

    if (success) {
      alert("Room Allocated");
    } else {
      alert("Room Not Available");
    }

    this.name = '';
    this.roomNumber = 0;
  }
}