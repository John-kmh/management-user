import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MainLayoutComponent } from '../../layout/main-layout/main-layout.component';

export const MODULE_ROUTES: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'user-create',
        loadComponent: () =>
          import('./pages/user-create/user-create.component').then(
            (m) => m.UserCreateComponent
          ),
      },
      {
        path: 'user-edit',
        loadComponent: () =>
          import('./pages/user-edit/user-edit.component').then(
            (m) => m.UserEditComponent
          ),
      },
    ],
  },
];
