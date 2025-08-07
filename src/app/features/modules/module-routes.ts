import { Routes } from '@angular/router';
import { MainLayoutComponent } from '../../layout/main-layout/main-layout.component';

export const MODULE_ROUTES: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'user',
        loadComponent: () =>
          import('./pages/user-list/user-list.component').then(
            (m) => m.UserListComponent
          ),
      },
      {
        path: 'role',
        loadComponent: () =>
          import('./pages/role/role.component').then((m) => m.RoleComponent),
      },
      {
        path: 'permission',
        loadComponent: () =>
          import('./pages/permission/permission.component').then(
            (m) => m.PermissionComponent
          ),
      },
      {
        path: 'team',
        loadComponent: () =>
          import('./pages/team/team.component').then((m) => m.TeamComponent),
      },
    ],
  },
];
