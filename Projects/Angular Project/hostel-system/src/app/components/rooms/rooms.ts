import { Component } from '@angular/core';
import { HostelService } from '../../services/hostel';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rooms.html'
})
export class Rooms {

  rooms: any[] = [];

  constructor(private hostel: HostelService) {
    this.rooms = this.hostel.getRooms();
  }
}