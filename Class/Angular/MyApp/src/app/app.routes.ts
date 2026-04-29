import { Routes } from '@angular/router';
import { Home } from '../home/home';
import { ListStudent } from '../list-student/list-student';
import { AddStudent } from '../add-student/add-student';

export const routes: Routes = [
  { path: 'home', component: Home },
  { path: 'list-student', component: ListStudent },
  { path: 'add-student', component: AddStudent }
];