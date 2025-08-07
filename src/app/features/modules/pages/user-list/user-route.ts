import { Routes } from '@angular/router';
import { UserListComponent } from './user-list.component';
import { UserFormComponent } from './user-form/user-form.component';

export const userRoutes: Routes = [
  { path: '', component: UserListComponent },
  { path: 'create', component: UserFormComponent },
  { path: 'edit/:id', component: UserFormComponent }
];
