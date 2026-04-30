import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { Rooms } from './components/rooms/rooms';
import { Allocate } from './components/allocate/allocate';
import { Students } from './components/students/students';

export const routes: Routes = [
  { path: '', component: Dashboard },
  { path: 'rooms', component: Rooms },
  { path: 'allocate', component: Allocate },
  { path: 'students', component: Students }
];