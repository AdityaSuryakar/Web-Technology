import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HostelService {

  rooms = [
    { number: 101, occupied: false },
    { number: 102, occupied: false },
    { number: 103, occupied: false }
  ];

  students: any[] = [];

  allocateRoom(name: string, roomNumber: number) {
    const room = this.rooms.find(r => r.number == roomNumber && !r.occupied);

    if (room) {
      room.occupied = true;
      this.students.push({ name, room: roomNumber });
      return true;
    }
    return false;
  }

  getRooms() {
    return this.rooms;
  }

  getStudents() {
    return this.students;
  }
}