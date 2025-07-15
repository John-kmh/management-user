import { Routes } from '@angular/router';
import { AddUserComponent } from './features/user/components/add-user/add-user.component';
import { EditUserComponent } from './features/user/components/edit-user/edit-user.component';

export const routes: Routes = [
  {
    path: 'add-user',
    component: AddUserComponent,
  },
  {
    path: 'edit-user',
    component: EditUserComponent,
  }
];
