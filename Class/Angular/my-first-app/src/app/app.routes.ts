import { Routes } from '@angular/router';
import { Admin } from '../admin/admin';
import { StudentList } from '../Components/student-list/student-list';

export const routes: Routes = [
    { path :'student-list' , component : StudentList},
    { path : 'admin' , component : Admin}
];
